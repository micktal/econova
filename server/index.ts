import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Webhook proxy endpoint: forwards payload to external webhook if WEBHOOK_URL is set.
  app.post("/api/submit", async (req, res) => {
    const webhook = process.env.WEBHOOK_URL;
    const payload = req.body;

    // Basic validation
    if (!payload || !payload.email) {
      return res.status(400).send("Missing required fields");
    }

    // If webhook is configured, forward the request
    if (webhook) {
      try {
        const forwarded = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!forwarded.ok) {
          const text = await forwarded.text();
          console.error("Webhook error:", text);
          return res.status(502).send("Webhook forwarding failed");
        }

        return res.status(200).json({ message: "Forwarded to webhook" });
      } catch (err) {
        console.error(err);
        return res.status(502).send("Webhook forwarding failed");
      }
    }

    // No webhook configured — for now, accept the data and respond with success.
    console.log("Received lead:", payload);
    return res.status(200).json({ message: "Received (no webhook configured)" });
  });

  return app;
}
