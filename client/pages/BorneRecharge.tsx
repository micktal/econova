import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function BorneRecharge() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title =
      "Borne de recharge à domicile — Rechargez votre véhicule électrique";

    const description =
      "Borne de recharge électrique à domicile. Installation rapide et conforme aux normes. Étude gratuite, installateurs certifiés IRVE, accompagnement personnalisé.";

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
      projectTypes: ["Borne de recharge"],
      source: "borne-recharge-landing",
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
              Borne de recharge à domicile : rechargez votre véhicule en toute
              simplicité
            </h1>

            <h2 className="mt-6 text-xl text-slate-700 leading-relaxed">
              Installation rapide, sécurisée et conforme aux normes. Étude
              gratuite & accompagnement personnalisé.
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              ✓ Étude gratuite • ✓ Sans engagement • ✓ Installateurs certifiés
              IRVE
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("lead-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Être contacté pour ma borne de recharge
              </button>
            </div>
          </div>
        </section>

        {/* ========== VALUE PROPOSITION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Pourquoi installer une borne de recharge chez vous ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✓ Recharge plus rapide qu'une prise classique
              </h3>
              <p className="text-slate-600 text-sm">
                Jusqu'à 10 fois plus rapide et parfaitement sécurisée.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✓ Confort au quotidien
              </h3>
              <p className="text-slate-600 text-sm">
                Rechargez votre véhicule à domicile, quand vous le souhaitez.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✓ Sécurité et conformité
              </h3>
              <p className="text-slate-600 text-sm">
                Installation conforme aux normes électriques et aux exigences
                constructeur.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✓ Valorisation de votre logement
              </h3>
              <p className="text-slate-600 text-sm">
                Un équipement recherché pour les logements équipés pour la
                mobilité électrique.
              </p>
            </div>
          </div>
        </section>

        {/* ========== TYPES OF INSTALLATIONS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Quelle borne de recharge pour votre usage ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">
                Borne de recharge résidentielle (maison individuelle)
              </h3>
              <p className="text-slate-600 text-sm">
                Recharge simple, rapide et sécurisée à domicile.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">
                Borne de recharge en copropriété
              </h3>
              <p className="text-slate-600 text-sm">
                Solution adaptée avec démarches administratives accompagnées.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">
                Borne pour entreprise ou parking privé
              </h3>
              <p className="text-slate-600 text-sm">
                Recharge pour flotte de véhicules ou salariés.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">
                Puissance 7 kW / 11 kW / 22 kW
              </h3>
              <p className="text-slate-600 text-sm">
                Choix selon votre véhicule et votre installation électrique.
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-600 max-w-2xl">
            Un conseiller vous aide à choisir la borne la plus adaptée à votre
            véhicule et à votre installation.
          </p>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Comment se déroule votre projet de borne de recharge ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">
                Vous laissez vos coordonnées
              </p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">
                Analyse de votre installation électrique
              </p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">
                Étude gratuite et recommandations
              </p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">
                Mise en relation avec installateur IRVE
              </p>
            </div>
          </div>
        </section>

        {/* ========== FORM SECTION INTRO ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Être rappelé pour une étude gratuite de borne de recharge
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Un conseiller vous contacte pour définir la solution la plus simple
            et la plus adaptée à votre usage.
          </p>

          {/* FORM */}
          <div className="max-w-2xl">
            <div className="bg-white border border-border rounded-lg p-8 shadow">
              {!sent ? (
                <form
                  id="lead-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Nom complet *
                      </span>
                      <input
                        name="name"
                        required
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Email *
                      </span>
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
                      <span className="text-sm font-medium text-slate-700">
                        Téléphone
                      </span>
                      <input
                        name="phone"
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">
                        Adresse
                      </span>
                      <input
                        name="address"
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                      Message (optionnel)
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </label>

                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-xs text-slate-600">
                      Données confidentielles – Aucun démarchage abusif
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-3 text-white font-semibold hover:opacity-95"
                  >
                    {submitting
                      ? "Envoi…"
                      : "Être contacté pour ma borne de recharge"}
                  </button>

                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    Merci !
                  </h3>
                  <p className="mt-3 text-slate-700">
                    Votre demande a bien été envoyée. Un expert en bornes de
                    recharge vous contactera sous 48 heures ouvrables.
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    Vos données restent strictement confidentielles (RGPD).
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== TRUST & SOCIAL PROOF ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Une installation réalisée par des professionnels certifiés
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            EcoNova Solutions collabore avec des installateurs spécialisés dans
            les bornes de recharge, certifiés IRVE et conformes aux normes en
            vigueur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">
                Installateurs certifiés IRVE
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">
                Conformité normes électriques
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">
                Matériel compatible VE & hybrides
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">
                Installation sécurisée et durable
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            Certifications selon projet et zone géographique.
          </p>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Questions fréquentes sur les bornes de recharge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                q: "Puis-je installer une borne chez moi ?",
                a: "Oui, la majorité des maisons et parkings privés sont éligibles.",
              },
              {
                q: "Faut-il modifier mon installation électrique ?",
                a: "Une vérification est réalisée lors de l'étude gratuite.",
              },
              {
                q: "Combien de temps dure l'installation ?",
                a: "Généralement entre une demi-journée et une journée.",
              },
              {
                q: "La borne est-elle compatible avec mon véhicule ?",
                a: "Oui, les bornes proposées sont compatibles avec la plupart des modèles.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-border rounded-lg p-5"
              >
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
