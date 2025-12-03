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
              className="h-12 w-auto"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary" />
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="#" className="text-sm text-slate-700 hover:text-primary">
            Services
          </Link>
          <Link to="#" className="text-sm text-slate-700 hover:text-primary">
            Aides & financements
          </Link>
          <Link to="#" className="text-sm text-slate-700 hover:text-primary">
            FAQ
          </Link>
          <Link
            to="#lead-form"
            className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-md"
          >
            Recevoir mon étude
          </Link>
        </nav>

        <div className="md:hidden">
          <Link
            to="#lead-form"
            className="text-sm font-semibold bg-primary text-white px-3 py-2 rounded-md"
          >
            Étude
          </Link>
        </div>
      </div>
    </header>
  );
}
