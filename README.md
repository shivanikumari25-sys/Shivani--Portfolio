# Portfolio contact form: Firebase setup

The contact form saves messages in the Cloud Firestore `contactMessages`
collection. It does not send an email notification; check the collection in
Firebase Console to read submissions.

## Setup

1. Firebase Console me project banayein ya apna existing project kholein.
2. **Build > Firestore Database > Create database** se Firestore enable karein.
3. **Project settings > General > Your apps** me web app (`</>`) register karein.
   Firebase config values ko `assets/js/firebase-config.js` me copy karein.
   `YOUR_...` placeholders ko actual values se replace karna zaroori hai.
4. Firestore ke **Rules** tab me neeche diye rules paste karke **Publish** karein.
   In rules se public visitor sirf valid naya contact message add kar sakta hai;
   message padhna, edit ya delete karna public ke liye band hai.
5. Site ko HTTPS par host karein (jaise GitHub Pages) ya local HTTP server se
   chalayein. `index.html` ko `file://` se directly kholne par JavaScript
   modules aur Firebase imports kaam nahi karte.
6. Contact form se test message bhejein. Firebase Console me
   **Firestore Database > Data > contactMessages** kholkar verify karein.

Firebase web config browser me dikhai deta hai; isme private key nahi hoti.
Security Firestore Rules se aati hai. Public form spam ke liye exposed hota hai,
isliye production me Firebase App Check enable karein; stronger rate limiting
ke liye backend/Cloud Function use karein. Firebase me message save hona email
notification bhejne ke barabar nahi hai.

## Firestore Security Rules

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactMessages/{messageId} {
      allow create: if request.resource.data.keys().hasAll([
            'name', 'email', 'subject', 'message', 'status', 'createdAt'
          ])
          && request.resource.data.keys().hasOnly([
            'name', 'email', 'subject', 'message', 'status', 'createdAt'
          ])
          && request.resource.data.name is string
          && request.resource.data.name.size() >= 2
          && request.resource.data.name.size() <= 100
          && request.resource.data.email is string
          && request.resource.data.email.size() <= 254
          && request.resource.data.subject is string
          && request.resource.data.subject.size() >= 1
          && request.resource.data.subject.size() <= 150
          && request.resource.data.message is string
          && request.resource.data.message.size() >= 10
          && request.resource.data.message.size() <= 5000
          && request.resource.data.status == 'new'
          && request.resource.data.createdAt == request.time;

      allow read, update, delete: if false;
    }
  }
}
```