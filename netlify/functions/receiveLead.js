import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ===============================
   ROUTING PAR TYPE DE PROJET
================================ */

const ROUTING_BY_PROJECT = {
  "Pompe à chaleur": "pac@econova.fr",
  "Panneaux solaires": "solar@econova.fr",
  "Chauffe-eau solaire": "solar@econova.fr",
  "Isolation": "isolation@econova.fr",
  "Borne de recharge": "ev@econova.fr",
};

const DEFAULT_EMAIL = "leads@econova.fr";

function getRecipientEmail(projectTypes = []) {
  for (const type of projectTypes) {
    if (ROUTING_BY_PROJECT[type]) {
      return ROUTING_BY_PROJECT[type];
    }
  }
  return DEFAULT_EMAIL;
}

/* ===============================
   HANDLER
================================ */

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const data = JSON.parse(event.body || "{}");

    const {
      name = "",
      email = "",
      phone = "",
      postalCode = "",
      projectType = [],
      message = "",
    } = data;

    const projectTypes = Array.isArray(projectType)
      ? projectType
      : [projectType];

    const recipient = getRecipientEmail(projectTypes);

    const timestamp = new Date().toLocaleString("fr-FR");

    /* ===============================
       1️⃣ EMAIL INTERNE (ÉQUIPE)
    =============================== */

    const internalEmailContent = `
NOUVEAU LEAD — EcoNova Solutions

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Code Postal : ${postalCode}
Projet : ${projectTypes.join(", ") || "Non précisé"}

Message :
${message || "—"}

Reçu le : ${timestamp}
IP : ${event.headers["x-forwarded-for"] || "Non détectée"}
`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: recipient,
      reply_to: email || undefined,
      subject: `🔥 Nouveau lead – ${projectTypes.join(", ") || "Projet énergétique"}`,
      text: internalEmailContent,
    });

    /* ===============================
       2️⃣ AUTO-REPLY VISITEUR
    =============================== */

    if (email) {
      const autoReplyContent = `
Bonjour ${name || ""},

Merci pour votre demande d’étude gratuite auprès d’EcoNova Solutions.

📌 Récapitulatif de votre demande :
- Projet : ${projectTypes.join(", ") || "—"}
- Téléphone : ${phone || "—"}

👉 Prochaine étape
Un conseiller EcoNova Solutions vous contactera sous 48h ouvrées
afin de préciser votre projet et vérifier votre éligibilité aux aides.

🔒 Vos données restent strictement confidentielles (RGPD).
Elles ne sont jamais revendues.

À très bientôt,

EcoNova Solutions
Solutions énergétiques durables
https://econovasolutions.fr
`;

      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "✅ Demande reçue — EcoNova Solutions",
        text: autoReplyContent,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error("Lead processing error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lead processing failed" }),
    };
  }
}
