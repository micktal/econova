const ROUTING_BY_PROJECT = {
  "Pompe à chaleur": "pac@econova.fr",
  "Panneaux solaires": "solar@econova.fr",
  "Chauffe-eau solaire": "solar@econova.fr",
  "Isolation": "isolation@econova.fr",
  "Borne de recharge": "ev@econova.fr",
};

const DEFAULT_EMAIL = "leads@econova.fr";

function getRecipientEmail(projectTypes = []) {
  if (!Array.isArray(projectTypes)) {
    projectTypes = [projectTypes];
  }

  for (const type of projectTypes) {
    if (ROUTING_BY_PROJECT[type]) {
      return ROUTING_BY_PROJECT[type];
    }
  }

  return DEFAULT_EMAIL;
}

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const data = JSON.parse(event.body || "{}");

    // Extract fields
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

    // Determine recipient
    const recipientEmail = getRecipientEmail(projectTypes);

    // Format email content
    const leadContent = `
NOUVEAU LEAD — EcoNova Solutions

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Code Postal : ${postalCode}
Projet : ${projectTypes.join(", ") || "Non précisé"}

Message :
${message}

Horodatage : ${new Date().toLocaleString("fr-FR")}
IP : ${event.headers["client-ip"] ||
      event.headers["x-forwarded-for"] ||
      "Non détectée"
      }

ROUTÉ VERS : ${recipientEmail}
`;

    console.log("Lead reçu :");
    console.log(leadContent);

    // 🔜 Envoi email à activer plus tard
    // sendEmail({ to: recipientEmail, subject: "...", body: leadContent })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        routedTo: recipientEmail,
      }),
    };

  } catch (err) {
    console.error("Erreur webhook:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
