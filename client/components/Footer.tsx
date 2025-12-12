import React from "react";

export default function Footer({ logoSrc }: { logoSrc?: string }) {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="EcoNova Solutions"
              className="h-20 object-cover object-center mb-4"
              style={{ aspectRatio: "4/1" }}
            />
          ) : (
            <div className="h-16 w-16 bg-primary rounded-full mb-4" />
          )}
          <p className="text-sm text-slate-700">
            EcoNova Solutions — Connecter les propriétaires avec des
            professionnels énergétiques certifiés
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Vos données sont protégées et jamais vendues.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Liens</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Mentions légales</li>
            <li>Politique RGPD</li>
            <li>Contact: contact@econova.example</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Adresse</h4>
          <p className="text-sm text-slate-600">Paris, France</p>
          <p className="text-sm text-slate-600 mt-3">
            © {new Date().getFullYear()} EcoNova Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
