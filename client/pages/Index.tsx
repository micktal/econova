import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function Index() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "EcoNova Solutions — Sustainable Energy Solutions";
    const meta = document.querySelector('meta[name="description"]');
    const description =
      "EcoNova Solutions provides tailored sustainable energy solutions. Get contacted by an advisor to discuss your project: heat pumps, solar panels, insulation, EV charging.";

    if (meta) {
      meta.setAttribute("content", description);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = description;
      document.head.appendChild(m);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const projectTypes: string[] = [];
    form.querySelectorAll('input[name="projectType"]:checked').forEach((el) => {
      projectTypes.push((el as HTMLInputElement).value);
    });

    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      address: formData.get("address") || "",
      message: formData.get("message") || "",
      projectTypes,
      source: "landing-econova",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Submission error");
      }

      setSent(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <Header logoSrc={LOGO_URL} />

      <main className="container mx-auto flex-1 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              EcoNova Solutions
            </h1>

            <p className="mt-4 text-lg text-slate-700 max-w-xl">
              Sustainable and tailor-made energy solutions. Leave your details
              and get contacted by one of our advisors to discuss your project.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </span>
                <span className="text-slate-700">
                  Free initial assessment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </span>
                <span className="text-slate-700">
                  Financial aid & incentives available
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById("lead-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Get contacted
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-lg p-6 shadow">
              {!sent ? (
                <form
                  id="lead-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Full name
                      </span>
                      <input
                        name="name"
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Phone
                      </span>
                      <input
                        name="phone"
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Address
                      </span>
                      <input
                        name="address"
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-700">
                      Project type (select all that apply)
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[
                        "Heat pump",
                        "Solar panels",
                        "Insulation",
                        "Solar water heater",
                        "EV charging station",
                        "Other",
                      ].map((t) => (
                        <label key={t} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            name="projectType"
                            value={t}
                            className="h-4 w-4"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                      Message (optional)
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    />
                  </label>

                  <p className="text-sm text-slate-600">
                    Your data is kept strictly confidential (GDPR compliant).
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold"
                  >
                    {submitting ? "Sending…" : "Get contacted"}
                  </button>

                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                </form>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Thank you</h3>
                  <p className="mt-2 text-slate-700">
                    Your request has been sent successfully. One of our advisors
                    will contact you shortly.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              We assist you with available financial incentives and funding.
            </p>
          </div>
        </section>
      </main>

      <Footer logoSrc={LOGO_URL} />
    </div>
  );
}
