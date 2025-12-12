import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Routing rules
const ROUTING_BY_PROJECT = {
  "Heat pump": "pac@econova.fr",
  "Solar panels": "solar@econova.fr",
  "Solar water heater": "solar@econova.fr",
  "Insulation": "isolation@econova.fr",
  "EV charging station": "ev@econova.fr",
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
      address = "",
      projectTypes = [],
      message = "",
      source = "landing-econova",
    } = data;

    const recipient = getRecipientEmail(projectTypes);

    const content = `
NEW LEAD — EcoNova Solutions

Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}
Project(s): ${projectTypes.join(", ") || "Not specified"}

Message:
${message || "-"}

Source: ${source}
Received: ${new Date().toLocaleString("en-GB")}
`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: recipient,
      reply_to: email || undefined,
      subject: `🔥 New lead – ${projectTypes[0] || "Energy project"}`,
      text: content,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Submit error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}
