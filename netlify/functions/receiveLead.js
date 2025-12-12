import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405 };
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

    const emailContent = `
NOUVEAU LEAD — EcoNova Solutions

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Code Postal : ${postalCode}
Projet : ${projectTypes.join(", ")}

Message :
${message}

Reçu le : ${new Date().toLocaleString("fr-FR")}
`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: recipient,
      reply_to: email || undefined,
      subject: `🔥 Nouveau lead – ${projectTypes.join(", ") || "Projet énergie"}`,
      text: emailContent,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email failed" }),
    };
  }
}
