import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const replySchema = z.object({
  messageId: z.string().uuid(),
  replyBody: z.string().min(1, "A resposta não pode estar vazia."),
});

export const replyToContactMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(replySchema)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Acesso negado.");

    const { data: message, error: fetchError } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", data.messageId)
      .single();

    if (fetchError || !message) {
      throw new Error(fetchError?.message ?? "Mensagem não encontrada.");
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Email não configurado. Define a variável de ambiente RESEND_API_KEY.",
      );
    }

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "geral@margaridaramospinto.com";
    const fromName = process.env.CONTACT_FROM_NAME ?? "Margarida Ramos Pinto";

    const subject = message.subject.startsWith("Re:")
      ? message.subject
      : `Re: ${message.subject}`;

    const textBody = [
      data.replyBody,
      "",
      "—",
      `Em resposta à sua mensagem de ${message.name}:`,
      message.message,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [message.email],
        reply_to: fromEmail,
        subject,
        text: textBody,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Falha ao enviar email (${res.status}): ${body}`);
    }

    const { error: updateError } = await supabase
      .from("contact_messages")
      .update({
        status: "replied",
        reply_body: data.replyBody,
        replied_at: new Date().toISOString(),
      })
      .eq("id", data.messageId);

    if (updateError) throw new Error(updateError.message);

    return { success: true as const };
  });
