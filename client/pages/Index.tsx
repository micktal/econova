import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F95c0b0043b41421392e858a0557beec4?format=webp&width=800";

export default function Index() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "EcoNova Solutions — Solutions énergétiques durables & expertise certifiée";

    const description =
      "Solutions énergétiques durables adaptées à votre projet. Pompes à chaleur, panneaux solaires, isolation. Experts certifiés. Aides financières incluses.";

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
              Solutions énergétiques durables — Évaluation d'expert gratuite
            </h1>

            <h2 className="mt-6 text-xl text-slate-700 leading-relaxed">
              Réduisez vos factures énergétiques avec des solutions sur-mesure.
              Pompes à chaleur, panneaux solaires, isolation et bornes de recharge — soutenus par des professionnels certifiés.
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              ✓ Partenaires certifiés  •  ✓ Aides financières disponibles  •  ✓ Sans engagement
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
              >
                Être contacté par un conseiller énergétique
              </button>
            </div>
          </div>
        </section>

        {/* ========== VALUE PROPOSITION ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Pourquoi choisir EcoNova Solutions ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Évaluation gratuite et sans engagement</h3>
              <p className="text-slate-600 text-sm">
                Un expert vous évalue rapidement et sans frais.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Installations certifiées et conformes</h3>
              <p className="text-slate-600 text-sm">
                Nous travaillons exclusivement avec des partenaires certifiés respectant les normes nationales.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">✓ Aides financières et subventions incluses</h3>
              <p className="text-slate-600 text-sm">
                Nous vous guidons pour accéder aux aides disponibles et réduire votre coût.
              </p>
            </div>
          </div>
        </section>

        {/* ========== PROJECT TYPES ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Solutions adaptées à votre projet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {[
              { title: "Pompes à chaleur", desc: "Réduisez les coûts de chauffage et améliorez le confort" },
              { title: "Panneaux solaires", desc: "Produisez votre propre électricité propre" },
              { title: "Isolation", desc: "Améliorez l'efficacité et réduisez les pertes énergétiques" },
              { title: "Chauffe-eau solaire", desc: "Eau chaude avec énergie renouvelable" },
              { title: "Bornes de recharge", desc: "Rechargez votre véhicule à la maison" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-border rounded-lg p-4">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-slate-600 max-w-2xl">
            Vous ne savez pas quelle solution convient à votre habitation ? Notre conseiller vous guidera.
          </p>
        </section>

        {/* ========== FORM SECTION INTRO ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Être contacté par un conseiller énergétique</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Remplissez le formulaire ci-dessous.
            Un conseiller vous contactera pour discuter de votre projet et de votre éligibilité.
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

                  <div>
                    <span className="text-sm font-medium text-slate-700">Type de projet (sélectionnez tout ce qui s'applique)</span>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {[
                        "Pompe à chaleur",
                        "Panneaux solaires",
                        "Isolation",
                        "Chauffe-eau solaire",
                        "Borne de recharge",
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
                    <span className="text-sm font-medium text-slate-700">Message (optionnel)</span>
                    <textarea
                      name="message"
                      rows={3}
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </label>

                  <div className="bg-slate-50 p-4 rounded-md">
                    <p className="text-xs text-slate-600">
                      Vos informations sont confidentielles et conformes au RGPD
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      📞 Pas de spam — un seul conseiller vous contactera
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-primary px-4 py-3 text-white font-semibold hover:opacity-95"
                  >
                    {submitting ? "Envoi…" : "Être contacté"}
                  </button>

                  {error && <div className="text-sm text-destructive">{error}</div>}
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-slate-900">Merci !</h3>
                  <p className="mt-3 text-slate-700">
                    Votre demande a bien été envoyée. Un conseiller vous contactera sous 48 heures ouvrables.
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    Vos données restent strictement confidentielles (RGPD).
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== TRUST & BADGES ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Partenaires certifiés et de confiance</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            EcoNova Solutions travaille avec des professionnels certifiés et des partenaires reconnus pour garantir la qualité, la conformité et la fiabilité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Partenaire certifié RGE</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Programmes de transition énergétique</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Partenaires d'installation de confiance</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="font-semibold text-slate-900">Conforme aux normes nationales</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            Les certifications peuvent varier selon le type de projet et la région.
          </p>
        </section>

        {/* ========== FAQ ========== */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Questions fréquemment posées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                q: "Comment fonctionne l'évaluation gratuite ?",
                a: "Un conseiller vous contacte pour comprendre vos besoins, puis évalue les meilleures solutions pour votre habitation.",
              },
              {
                q: "L'évaluation est-elle vraiment gratuite ?",
                a: "Oui. Elle est 100 % gratuite et sans engagement.",
              },
              {
                q: "Suis-je éligible aux aides financières ?",
                a: "L'éligibilité dépend de votre situation. Nous vous aidons à identifier les aides disponibles.",
              },
              {
                q: "Que se passe-t-il après avoir soumis le formulaire ?",
                a: "Un conseiller vous contacte pour confirmer les détails et vous guider à travers les prochaines étapes.",
              },
              {
                q: "Les installations sont-elles effectuées par EcoNova ?",
                a: "Les installations sont réalisées par des professionnels partenaires certifiés.",
              },
              {
                q: "Quels types d'équipements utilisez-vous ?",
                a: "Nous utilisons des équipements de marques reconnues adaptés à chaque projet (pompes à chaleur, panneaux solaires, systèmes de stockage, etc.).",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-border rounded-lg p-5">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-12 md:py-16 border-t">
          <div className="max-w-3xl bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Prêt à réduire vos coûts énergétiques ?
            </h2>
            <button
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-white font-semibold shadow hover:opacity-95"
            >
              Être contacté maintenant
            </button>
          </div>
        </section>
      </main>

      <Footer logoSrc={LOGO_URL} />
    </div>
  );
}
