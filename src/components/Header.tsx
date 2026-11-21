import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "../assets/margaridaramospinto.png";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Trabalho", hash: "projetos" },
  { to: "/about", label: "Sobre" },
  { to: "/contact", label: "Contacto" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/" || location.pathname.startsWith("/projects")
      : location.pathname === path;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled || menuOpen
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <Link to="/" className="flex items-center" aria-label="Margarida Ramos Pinto — início">
          <img
            src={logoUrl}
            alt="Margarida Ramos Pinto"
            className={cn(
              "w-auto transition-all duration-500",
              scrolled ? "h-12 md:h-14" : "h-16 md:h-20",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              hash={"hash" in link ? link.hash : undefined}
              data-active={isActive(link.to)}
              className="link-underline text-sm text-foreground/70 transition-colors hover:text-foreground data-[active=true]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border/50 px-6 pb-8 md:hidden">
          <nav className="flex flex-col gap-2 pt-6" aria-label="Principal (móvel)">
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                hash={"hash" in link ? link.hash : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 py-1 font-serif text-4xl text-foreground"
              >
                <span className="font-sans text-xs tabular-nums text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
