import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function Isolation() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Isolation thermique — Réduisez vos factures et améliorez votre confort";

    const description =
      "Isolation thermique performante pour réduire vos factures jusqu'à 30%. Étude gratuite, aides financières, partenaires certifiés RGE.";

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
      projectTypes: ["Isolation"],
      source: "isolation-landing",
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
              Isolation thermique : réduisez vos factures et améliorez votre confort
            </h1>

            <h2 className="mt-6 text-xl text-slate-700 leading-relaxed">
              Jusqu'à 30 % d'économies d'énergie grâce à une isolation performante.
              Étude gratuite & vérification des aides disponibles.
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              ✓ Étude gratuite  •  ✓ Sans engagement  •  ✓ Travaux réalisés par partenaires certifiés
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Être contacté pour mon projet d'isolation
              </button>
            </div>
          </div>
        </section>

        {/* ========== VALUE PROPOSITION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Pourquoi améliorer l'isolation de votre logement ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Réduction immédiate des pertes de chaleur</h3>
              <p className="text-slate-600 text-sm">
                Moins de chauffage en hiver, plus de fraîcheur en été.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Baisse durable de vos factures énergétiques</h3>
              <p className="text-slate-600 text-sm">
                Une bonne isolation réduit fortement la consommation énergétique.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Amélioration du confort thermique et acoustique</h3>
              <p className="text-slate-600 text-sm">
                Température stable, moins d'humidité, plus de silence.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Accès à des aides financières importantes</h3>
              <p className="text-slate-600 text-sm">
                MaPrimeRénov', CEE, aides locales selon votre situation.
              </p>
            </div>
          </div>
        </section>

        {/* ========== TYPES OF INSULATION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Quelles solutions d'isolation existent ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Isolation des combles (perdus ou aménagés)</h3>
              <p className="text-slate-600 text-sm">
                La solution la plus rentable et la plus rapide à mettre en place.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Isolation des murs (intérieure ou extérieure)</h3>
              <p className="text-slate-600 text-sm">
                Réduction majeure des déperditions thermiques.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Isolation des planchers bas</h3>
              <p className="text-slate-600 text-sm">
                Améliore le confort et limite les remontées de froid.
              </p>
            </div>
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">Isolation globale du logement</h3>
              <p className="text-slate-600 text-sm">
                Solution complète pour maximiser les économies d'énergie.
              </p>
            </div>
          </div>
          <p className="mt-8 text-slate-600 max-w-2xl">
            Un conseiller identifie la solution la plus adaptée à votre logement.
          </p>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Comment se déroule votre projet d'isolation ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">Vous laissez vos coordonnées</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">Analyse de votre logement</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">Étude gratuite + aides</p>
            </div>
            <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-6 text-center">
              <p className="font-semibold text-white">Mise en relation professionnel</p>
            </div>
          </div>
        </section>

        {/* ========== FORM SECTION INTRO ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Être rappelé pour une étude d'isolation gratuite</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Un conseiller vous contacte pour analyser votre logement et vous proposer la solution la plus efficace.
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
                      Données confidentielles – Aucun démarchage abusif
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-3 text-white font-semibold hover:opacity-95"
                  >
                    {submitting ? "Envoi…" : "Être contacté pour mon isolation"}
                  </button>

                  {error && <div className="text-sm text-destructive">{error}</div>}
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-slate-900">Merci !</h3>
                  <p className="mt-3 text-slate-700">
                    Votre demande a bien été envoyée. Un expert en isolation vous contactera sous 48 heures ouvrables.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Des travaux réalisés par des professionnels certifiés</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            EcoNova Solutions travaille avec des partenaires spécialisés dans l'isolation thermique, sélectionnés pour leur expertise et leur conformité aux normes en vigueur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Entreprises certifiées RGE</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Matériaux isolants haute performance</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Conformité aux normes thermiques</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Accompagnement aides & démarches</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            Certifications selon projet et zone géographique.
          </p>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Questions fréquentes sur l'isolation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                q: "Quels travaux sont les plus rentables ?",
                a: "L'isolation des combles est généralement la plus efficace en premier lieu.",
              },
              {
                q: "Puis-je bénéficier d'aides financières ?",
                a: "Oui, selon votre logement et vos revenus, plusieurs aides sont cumulables.",
              },
              {
                q: "Les travaux sont-ils longs ?",
                a: "La plupart des travaux d'isolation sont réalisés en quelques jours.",
              },
              {
                q: "Dois-je avancer des frais ?",
                a: "Certaines aides peuvent être déduites directement du devis.",
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
