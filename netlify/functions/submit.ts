import { supabase } from "../../server/supabaseClient";

export const handler = async (event: any) => {
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
      address = "",
      postalCode = "",
      projectTypes = [],
      message = "",
      source = "landing-econova",
      utm_source = null,
      utm_campaign = null,
    } = data;

    // 1️⃣ Store lead in Supabase
    const { error } = await supabase.from("leads").insert([
      {
        name,
        email,
        phone,
        address,
        postal_code: postalCode,
        project_types: projectTypes,
        message,
        source,
        utm_source,
        utm_campaign,
        status: "new",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Submit error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lead not saved" }),
    };
  }
};
