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
      name,
      email,
      phone,
      postalCode,
      projectType,
      message
    } = data;

    // Format email content
    const leadContent = `
NOUVEAU LEAD — EcoNova Solutions

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Code Postal : ${postalCode}
Projet : ${Array.isArray(projectType) ? projectType.join(", ") : projectType}
Message :
${message}

Horodatage : ${new Date().toLocaleString("fr-FR")}
IP : ${event.headers["client-ip"] || event.headers["x-forwarded-for"] || "Non détectée"}
`;

    console.log("Lead reçu :", leadContent);

    // Pour le moment, on n'envoie pas encore l'email
    // Le webhook fonctionne et renvoie l'info
    // On activera l'envoi de mails après configuration des adresses

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Erreur webhook:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
