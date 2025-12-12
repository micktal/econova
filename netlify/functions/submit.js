import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

/* ===== Lead routing ===== */
const ROUTING_BY_PROJECT = {
  "Pompe à chaleur": "pac@econova.fr",
  "Panneaux solaires": "solar@econova.fr",
  "Chauffe-eau solaire": "solar@econova.fr",
  Isolation: "isolation@econova.fr",
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

/* ===== Netlify function ===== */
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

    /* ===== SAVE TO SUPABASE ===== */
    const { error: supabaseError } = await supabase.from("leads").insert([
      {
        name,
        email,
        phone,
        address,
        project_types: projectTypes,
        message,
        source,
        created_at: new Date().toISOString(),
      },
    ]);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erreur lors de l'enregistrement" }),
      };
    }

    /* ===== INTERNAL LEAD EMAIL ===== */
    const internalContent = `
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
      text: internalContent,
    });

    /* ===== AUTO-REPLY TO VISITOR ===== */
    if (email) {
      const visitorContent = `
Hello ${name || ""},

Thank you for contacting EcoNova Solutions.

We have successfully received your request regarding:
${projectTypes.length ? "- " + projectTypes.join("\n- ") : "- Energy project"}

One of our advisors will contact you shortly to discuss your project and
provide you with tailored solutions and available financial incentives.

✔ No obligation
✔ No spam
✔ GDPR compliant

If you have additional information to share, simply reply to this email.

Kind regards,

EcoNova Solutions
Sustainable Energy Experts
`;

      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "✅ We received your request – EcoNova Solutions",
        text: visitorContent,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Submit error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur" }),
    };
  }
}
