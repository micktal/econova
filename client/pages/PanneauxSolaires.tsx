import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function PanneauxSolaires() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Panneaux solaires — Produisez votre électricité et réduisez vos factures";

    const description =
      "Panneaux solaires performants pour réduire votre facture d'électricité. Aides financières, installations certifiées, étude gratuite, rentabilité immédiate.";

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
      projectTypes: ["Panneaux solaires"],
      source: "panneaux-solaires-landing",
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
              Panneaux solaires : produisez votre propre électricité et réduisez vos factures
            </h1>

            <h2 className="mt-6 text-xl text-slate-700 leading-relaxed">
              Passez à l'énergie solaire et valorisez votre logement.
              Recevez une étude gratuite et vérifiez votre éligibilité aux aides.
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              ✓ Étude gratuite  •  ✓ Sans engagement  •  ✓ Installateurs certifiés
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Être contacté pour mon projet solaire
              </button>
            </div>
          </div>
        </section>

        {/* ========== VALUE PROPOSITION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Pourquoi installer des panneaux solaires ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Réduction immédiate de votre facture d'électricité</h3>
              <p className="text-slate-600 text-sm">
                Produisez votre propre énergie et diminuez votre dépendance aux fournisseurs.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Valorisation de votre bien immobilier</h3>
              <p className="text-slate-600 text-sm">
                Un logement équipé en solaire est plus attractif et mieux classé énergétiquement.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Une énergie propre et durable</h3>
              <p className="text-slate-600 text-sm">
                Réduction de votre empreinte carbone et contribution à la transition énergétique.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Aides financières disponibles</h3>
              <p className="text-slate-600 text-sm">
                Prime à l'autoconsommation, revente du surplus, aides locales selon votre situation.
              </p>
            </div>
          </div>
        </section>

        {/* ========== SOLAR SOLUTIONS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Quelle solution solaire est faite pour vous ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Panneaux solaires en autoconsommation</h3>
              <p className="text-slate-600 text-sm">
                Consommez directement l'électricité produite pour réduire vos factures.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Autoconsommation avec revente du surplus</h3>
              <p className="text-slate-600 text-sm">
                Vendez l'électricité non utilisée et améliorez la rentabilité de votre installation.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Installation solaire avec batterie</h3>
              <p className="text-slate-600 text-sm">
                Stockez votre énergie pour l'utiliser quand vous en avez besoin.
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-600 max-w-2xl">
            Un conseiller vous aide à choisir la solution la plus rentable selon votre logement.
          </p>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Comment se déroule votre projet solaire ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">1️⃣</p>
              <p className="font-semibold text-slate-900">Vous laissez vos coordonnées</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">2️⃣</p>
              <p className="font-semibold text-slate-900">Un conseiller analyse votre consommation</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-primary mb-2">3️⃣</p>
              <p className="font-semibold text-slate-900">Étude gratuite de faisabilité</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-slate-900">Mise en relation avec installateur</p>
            </div>
          </div>
        </section>

        {/* ========== FORM SECTION INTRO ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Être rappelé pour une étude solaire gratuite</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Un expert vous contacte pour analyser votre projet et estimer votre production solaire.
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
                    {submitting ? "Envoi…" : "Être contacté pour mes panneaux solaires"}
                  </button>

                  {error && <div className="text-sm text-destructive">{error}</div>}
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-slate-900">Merci !</h3>
                  <p className="mt-3 text-slate-700">
                    Votre demande a bien été envoyée. Un expert en énergie solaire vous contactera sous 48 heures ouvrables.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Des installations solaires réalisées par des professionnels certifiés</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            EcoNova Solutions travaille exclusivement avec des partenaires qualifiés pour garantir performance, sécurité et conformité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Installateurs certifiés RGE</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Matériel conforme normes européennes</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Accompagnement administratif & aides</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Garantie & suivi de projet</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            Certifications selon projet et zone géographique.
          </p>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Questions fréquentes sur les panneaux solaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                q: "Mon toit est-il compatible ?",
                a: "Orientation, surface et inclinaison sont étudiées gratuitement par un conseiller.",
              },
              {
                q: "Les panneaux solaires sont-ils rentables ?",
                a: "Oui, la rentabilité dépend de votre consommation et des aides disponibles.",
              },
              {
                q: "Dois-je avancer des frais pour l'étude ?",
                a: "Non. L'étude est gratuite et sans engagement.",
              },
              {
                q: "Qui s'occupe des démarches administratives ?",
                a: "Les partenaires vous accompagnent pour les déclarations et aides.",
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
