
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const configIsReady = Object.values(firebaseConfig).every(
    value => value && !value.startsWith("YOUR_")
);
const db = configIsReady
    ? getFirestore(initializeApp(firebaseConfig))
    : null;

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");

    if (!contactForm || !submitBtn || !formStatus) return;

    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message")
    };

    const showStatus = (message, type) => {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
    };

    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const data = Object.fromEntries(
            Object.entries(fields).map(([key, field]) => [key, field.value.trim()])
        );

        if (data.name.length < 2 || data.message.length < 10) {
            showStatus(
                "Name must be at least 2 characters and message at least 10 characters.",
                "error"
            );
            return;
        }

        if (!fields.email.validity.valid) {
            showStatus("Please enter a valid email address.", "error");
            fields.email.focus();
            return;
        }

        if (!db) {
            showStatus(
                "Firebase is not configured yet. Please add your Firebase config and try again.",
                "error"
            );
            return;
        }

        submitBtn.disabled = true;
        showStatus("Sending your message...", "success");

        try {
            await addDoc(collection(db, "contactMessages"), {
                ...data,
                status: "new",
                createdAt: serverTimestamp()
            });

            contactForm.reset();
            showStatus("Your message was sent successfully. Thank you!", "success");
        } catch (error) {
            console.error("Could not save contact message to Firestore:", error);
            showStatus(
                "We couldn't send your message. Please try again later or email me directly.",
                "error"
            );
        } finally {
            submitBtn.disabled = false;
        }
    });

    Object.values(fields).forEach(field => {
        field.addEventListener("input", () => {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        });
    });
});
