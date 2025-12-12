import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ logoSrc }: { logoSrc?: string }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { label: "Pompe à chaleur", path: "/pompe-a-chaleur" },
    { label: "Panneaux solaires", path: "/panneaux-solaires" },
    { label: "Isolation", path: "/isolation" },
    { label: "Borne de recharge", path: "/borne-recharge" },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="EcoNova Solutions"
              className="h-16 object-cover object-center"
              style={{ aspectRatio: "4/1" }}
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-primary" />
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* Services Dropdown */}
          <div className="relative group">
            <button
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              className="text-sm text-slate-700 hover:text-primary flex items-center gap-1"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {servicesOpen && (
              <div
                className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-md shadow-lg"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary first:rounded-t-md last:rounded-b-md"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
