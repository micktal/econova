Configuration:

- To forward form submissions to an external webhook, set the environment variable WEBHOOK_URL to your target endpoint.
- The server will proxy POST /api/submit to the configured WEBHOOK_URL. If not set, the server will accept submissions and respond with a success message (useful for testing).

Example (in .env):
WEBHOOK_URL=https://hooks.example.com/your-webhook

Security:
- Do not commit secrets. Use the platform to set environment variables when deploying.
