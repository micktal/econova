import React from "react";
import { Link } from "react-router-dom";

export default function Header({ logoSrc }: { logoSrc?: string }) {
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="EcoNova Solutions"
              className="h-23 w-auto"
            />
          ) : (
            <div className="h-30 w-30 rounded-full bg-primary" />
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm text-slate-700 hover:text-primary">
            Services
          </a>
          <a href="#aides" className="text-sm text-slate-700 hover:text-primary">
            Aides & financements
          </a>
          <a href="#faq" className="text-sm text-slate-700 hover:text-primary">
            FAQ
          </a>
          <button
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-md hover:opacity-95"
          >
            Recevoir mon étude
          </button>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-semibold bg-primary text-white px-3 py-2 rounded-md hover:opacity-95"
          >
            Étude
          </button>
        </div>
      </div>
    </header>
  );
}
