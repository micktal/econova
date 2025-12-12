import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function PompeAChaleur() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pompe à chaleur — Réduisez vos factures de chauffage jusqu'à 60 %";

    const description =
      "Pompe à chaleur performante pour réduire vos factures jusqu'à 60%. Chauffage économique et écologique. Étude gratuite, aides financières, installateurs certifiés.";

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

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      message: String(formData.get("message") || ""),
      projectTypes: ["Pompe à chaleur"],
      source: "pompe-a-chaleur-landing",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'envoi. Veuillez réessayer.");
      }

      setSent(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header logoSrc={LOGO_URL} />

      <main className="container mx-auto flex-1 py-12 px-4">
        {/* ========== HERO SECTION ========== */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Pompe à chaleur : réduisez vos factures de chauffage jusqu'à 60 %
            </h1>

            <h2 className="mt-6 text-xl text-slate-700 leading-relaxed">
              Chauffage économique, écologique et durable.
              Étude gratuite & vérification immédiate des aides disponibles.
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              ✓ Étude gratuite  •  ✓ Sans engagement  •  ✓ Installateurs partenaires certifiés
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Être contacté pour mon projet de pompe à chaleur
              </button>
            </div>
          </div>
        </section>

        {/* ========== VALUE PROPOSITION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Pourquoi choisir une pompe à chaleur ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Jusqu'à 60 % d'économies sur votre chauffage</h3>
              <p className="text-slate-600 text-sm">
                Une PAC consomme très peu d'électricité pour produire de la chaleur.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Confort thermique toute l'année</h3>
              <p className="text-slate-600 text-sm">
                Chauffage performant en hiver, rafraîchissement possible en été (selon modèle).
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Solution écologique et durable</h3>
              <p className="text-slate-600 text-sm">
                Utilise les calories naturelles de l'air, de l'eau ou du sol.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Aides financières importantes disponibles</h3>
              <p className="text-slate-600 text-sm">
                MaPrimeRénov', CEE, aides locales selon votre situation.
              </p>
            </div>
          </div>
        </section>

        {/* ========== TYPES OF HEAT PUMPS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Quel type de pompe à chaleur pour votre logement ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Pompe à chaleur air / air</h3>
              <p className="text-slate-600 text-sm">
                Chauffage + climatisation, installation rapide.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Pompe à chaleur air / eau</h3>
              <p className="text-slate-600 text-sm">
                Alimente radiateurs ou plancher chauffant, très répandue.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Pompe à chaleur géothermique</h3>
              <p className="text-slate-600 text-sm">
                Performance maximale, idéale pour projets globaux.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Pompe à chaleur hybride</h3>
              <p className="text-slate-600 text-sm">
                Combine PAC + chaudière existante pour plus de flexibilité.
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-600 max-w-2xl">
            Un conseiller vous aide à identifier la solution la plus adaptée à votre logement.
          </p>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Comment se déroule votre projet de pompe à chaleur ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">1️⃣</p>
              <p className="font-semibold text-slate-900">Vous laissez vos coordonnées</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">2️⃣</p>
              <p className="font-semibold text-slate-900">Analyse de votre système de chauffage</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">3️⃣</p>
              <p className="font-semibold text-slate-900">Étude gratuite + aides financières</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">4️⃣</p>
              <p className="font-semibold text-slate-900">Mise en relation avec installateur certifié</p>
            </div>
          </div>
        </section>

        {/* ========== FORM SECTION INTRO ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Être rappelé pour une étude gratuite de pompe à chaleur</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Un conseiller vous contacte pour évaluer votre projet et vos économies potentielles.
          </p>

          {/* FORM */}
          <div className="max-w-2xl">
            <div className="bg-white border border-border rounded-lg p-8 shadow">
              {!sent ? (
                <form id="lead-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">Nom complet *</span>
                      <input
                        name="name"
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">Email *</span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">Téléphone</span>
                      <input
                        name="phone"
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">Adresse</span>
                      <input
                        name="address"
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Message (optionnel)</span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </label>

                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-xs text-slate-600">
                      🔒 Données confidentielles – Aucun démarchage abusif
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-3 text-white font-semibold hover:opacity-95"
                  >
                    {submitting ? "Envoi…" : "Être contacté pour ma pompe à chaleur"}
                  </button>

                  {error && <div className="text-sm text-destructive">{error}</div>}
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-slate-900">Merci !</h3>
                  <p className="mt-3 text-slate-700">
                    Votre demande a bien été envoyée. Un expert en pompes à chaleur vous contactera sous 48 heures ouvrables.
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    🔒 Vos données restent strictement confidentielles (RGPD).
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== TRUST & SOCIAL PROOF ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Une installation réalisée par des professionnels certifiés</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            EcoNova Solutions travaille avec des installateurs spécialisés dans les pompes à chaleur, sélectionnés pour leur sérieux et leur conformité aux normes en vigueur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Installateurs certifiés RGE</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Équipements performants et reconnus</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Conformité normes énergétiques</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Accompagnement administratif aides</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            Certifications selon projet et zone géographique.
          </p>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Questions fréquentes sur les pompes à chaleur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                q: "Suis-je éligible à une pompe à chaleur ?",
                a: "La majorité des maisons individuelles sont éligibles après étude.",
              },
              {
                q: "Les aides sont-elles vraiment accessibles ?",
                a: "Oui, plusieurs aides sont cumulables selon votre situation.",
              },
              {
                q: "Les travaux sont-ils longs ?",
                a: "L'installation dure généralement entre 1 et 3 jours.",
              },
              {
                q: "La pompe à chaleur remplace-t-elle ma chaudière ?",
                a: "Oui, dans la plupart des cas.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-border rounded-lg p-5">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
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
