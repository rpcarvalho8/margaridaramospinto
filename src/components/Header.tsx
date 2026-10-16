import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import logoUrl from "../assets/logo-margarida-transparent.png";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Início" },
    { to: "/about", label: "Sobre" },
    { to: "/contact", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border bg-card/70 px-6 py-3 backdrop-blur-md">
        <Link to="/" className="flex items-center">
          <img
            src={logoUrl}
            alt="Margarida Ramos Pinto"
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border/50 px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
