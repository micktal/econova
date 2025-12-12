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
    document.title = "EcoNova Solutions — Étude gratuite & solutions énergétiques";

    const description =
      "EcoNova Solutions — Étude gratuite pour solutions énergétiques durables : pompes à chaleur, panneaux solaires, isolation, bornes de recharge. Recevez une étude personnalisée.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
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
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      message: String(formData.get("message") || ""),
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
        throw new Error("Submission failed. Please try again.");
      }

      setSent(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <Header logoSrc={LOGO_URL} />

      <main className="container mx-auto flex-1 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              EcoNova Solutions
            </h1>

            <p className="mt-4 text-lg text-slate-700 max-w-xl">
              Solutions énergétiques durables, installations sur-mesure et aides disponibles. Recevez une étude gratuite et personnalisée pour optimiser votre consommation et réduire vos factures.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </span>
                <span className="text-slate-700">
                  Audit gratuit et sans engagement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </span>
                <span className="text-slate-700">
                  Financement et aides disponibles
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
                Recevoir mon étude gratuite maintenant
              </button>
            </div>
          </div>

          {/* FORM */}
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
                        Nom complet
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
                        Téléphone
                      </span>
                      <input
                        name="phone"
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Adresse
                      </span>
                      <input
                        name="address"
                        className="mt-1 w-full rounded-md border px-3 py-2"
                      />
                    </label>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-700">
                      Type de projet (sélectionnez tous les applicables)
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[
                        "Pompe à chaleur",
                        "Panneaux solaires",
                        "Isolation",
                        "Chauffe-eau solaire",
                        "Borne de recharge",
                        "Autre",
                      ].map((t) => (
                        <label
                          key={t}
                          className="flex items-center gap-2 text-sm"
                        >
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
                      Message (optionnel)
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-1 w-full rounded-md border px-3 py-2"
                    />
                  </label>

                  <p className="text-sm text-slate-600">
                    Vos données restent strictement confidentielles (RGPD).
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold"
                  >
                    {submitting ? "Envoi…" : "Recevoir mon étude gratuite maintenant"}
                  </button>

                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                </form>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Merci !</h3>
                  <p className="mt-2 text-slate-700">
                    Votre demande a bien été envoyée. Nous reviendrons vers vous sous 48h ouvrés.
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Vos données restent strictement confidentielles (RGPD).
                  </p>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Nous vous accompagnons pour les aides et financement disponibles.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Foire aux questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Comment se déroule l'étude gratuite ?",
                a: "Un conseiller vous contacte pour préciser votre projet, puis nous réalisons un diagnostic complet et vous envoyons une proposition détaillée.",
              },
              {
                q: "Quels sont les délais d'installation ?",
                a: "Les délais varient selon le projet et les autorisations nécessaires, généralement entre 2 et 8 semaines après validation du devis.",
              },
              {
                q: "Est-ce que je suis éligible aux aides ?",
                a: "Nous évaluons votre éligibilité lors de l'étude et vous accompagnons dans les démarches pour obtenir les aides disponibles.",
              },
              {
                q: "Que se passe-t-il après l'envoi du formulaire ?",
                a: "Un conseiller vous contacte dans les 48h pour fixer un rendez-vous et préciser les informations nécessaires pour l'étude.",
              },
              {
                q: "L'entreprise est-elle certifiée ?",
                a: "Oui, EcoNova Solutions travaille avec des partenaires certifiés RGE et des installateurs qualifiés pour garantir la qualité.",
              },
              {
                q: "Quels produits sont utilisés ?",
                a: "Nous utilisons des équipements de marques reconnues et adaptés à chaque projet (pompes à chaleur, panneaux solaires, systèmes de stockage, etc.).",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-border rounded-md p-5">
                <h3 className="font-semibold text-slate-800">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer logoSrc={LOGO_URL} />
    </div>
  );
}
