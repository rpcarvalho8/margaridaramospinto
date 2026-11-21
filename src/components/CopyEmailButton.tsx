import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SITE_EMAIL } from "@/lib/site";
import { cn } from "@/lib/utils";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para browsers sem Clipboard API (ou contexto não seguro)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

type CopyEmailButtonProps = {
  email?: string;
  className?: string;
  variant?: "solid" | "inline";
};

export function CopyEmailButton({
  email = SITE_EMAIL,
  className,
  variant = "solid",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function onClick() {
    const ok = await copyText(email);
    if (!ok) {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 transition-all",
        variant === "solid" &&
          "rounded-full bg-foreground px-6 py-3.5 text-sm text-background hover:bg-terracotta",
        variant === "inline" && "text-left text-foreground",
        copied && variant === "solid" && "bg-sage hover:bg-sage",
        className,
      )}
      aria-label={copied ? "Email copiado" : `Copiar email ${email}`}
    >
      <span className="relative h-4 w-4 shrink-0">
        <Copy
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>
      <span className={cn(variant === "inline" && "link-underline")}>
        {copied ? "Copiado!" : email}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copiado para a área de transferência" : ""}
      </span>
    </button>
  );
}
