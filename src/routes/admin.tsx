import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { replyToContactMessage } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, Mail, Reply } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string | null;
  description: string | null;
  sort_order: number;
};

type FormState = {
  id?: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  sort_order: number;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  reply_body: string | null;
  replied_at: string | null;
  created_at: string;
};

const emptyForm: FormState = {
  title: "",
  category: "",
  image: "",
  link: "",
  description: "",
  sort_order: 0,
};

const statusLabel: Record<string, string> = {
  new: "Nova",
  read: "Lida",
  replied: "Respondida",
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Portfolio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(data.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      if (!mounted) return;
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      setReady(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-sm text-muted-foreground">
        A carregar...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Acesso negado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A tua conta ({userEmail}) não tem permissões de administrador.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Sair
          </Button>
          <Button asChild>
            <Link to="/">Ir para o site</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <AdminPanel userEmail={userEmail} />;
}

function AdminPanel({ userEmail }: { userEmail: string | null }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("projects");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Administração</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {userEmail} · Portfolio e mensagens
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          <LogOut className="mr-1 h-4 w-4" /> Sair
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-6">
          <ProjectsSection />
        </TabsContent>
        <TabsContent value="messages" className="mt-6">
          <MessagesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectsSection() {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: FormState) => {
      const payload = {
        title: values.title,
        category: values.category,
        image: values.image,
        link: values.link.trim() || null,
        description: values.description || null,
        sort_order: values.sort_order,
      };
      if (values.id) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      setDialogOpen(false);
      toast.success(form.id ? "Card atualizado" : "Card criado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Card eliminado");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro"),
  });

  function openCreate() {
    const maxOrder = projects?.reduce((m, p) => Math.max(m, p.sort_order), 0) ?? 0;
    setForm({ ...emptyForm, sort_order: maxOrder + 10 });
    setDialogOpen(true);
  }

  function openEdit(p: Project) {
    setForm({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      link: p.link ?? "",
      description: p.description ?? "",
      sort_order: p.sort_order,
    });
    setDialogOpen(true);
  }

  async function onDelete(p: Project) {
    if (!confirm(`Eliminar "${p.title}"?`)) return;
    deleteMutation.mutate(p.id);
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="mr-1 h-4 w-4" /> Novo card
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : (
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {projects?.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Ainda não existem cards. Cria o primeiro.
            </p>
          )}
          {projects?.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <img
                src={p.image}
                alt={p.title}
                className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {p.category}
                </p>
                <h3 className="truncate text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-xs text-muted-foreground hover:underline"
                  >
                    {p.link}
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">Sem link externo</p>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  Ordem: {p.sort_order}
                </span>
                <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(p)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar card" : "Novo card"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate(form);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL da imagem</Label>
              <Input
                id="image"
                type="url"
                required
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link externo (Behance, opcional)</Label>
              <Input
                id="link"
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://www.behance.net/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">Ordem</Label>
              <Input
                id="sort_order"
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: Number(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                Valores mais baixos aparecem primeiro.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "A guardar..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MessagesSection() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ContactMessage[];
    },
  });

  const selected = messages?.find((m) => m.id === selectedId) ?? null;

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "read" })
        .eq("id", id)
        .eq("status", "new");
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact_messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact_messages"] });
      setSelectedId(null);
      toast.success("Mensagem eliminada");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro"),
  });

  const replyMutation = useMutation({
    mutationFn: async ({
      messageId,
      replyBody: body,
    }: {
      messageId: string;
      replyBody: string;
    }) => replyToContactMessage({ data: { messageId, replyBody: body } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact_messages"] });
      setReplyOpen(false);
      setReplyBody("");
      toast.success("Resposta enviada por email");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro"),
  });

  function openMessage(m: ContactMessage) {
    setSelectedId(m.id);
    if (m.status === "new") markReadMutation.mutate(m.id);
  }

  function openReply(m: ContactMessage) {
    setSelectedId(m.id);
    setReplyBody("");
    setReplyOpen(true);
  }

  return (
    <>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {messages?.length === 0 && (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Ainda não há mensagens de contacto.
              </p>
            )}
            {messages?.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => openMessage(m)}
                className={`flex w-full flex-col gap-1 p-4 text-left transition-colors hover:bg-muted/40 ${
                  selected?.id === m.id ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {m.subject}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                      m.status === "new"
                        ? "bg-primary/15 text-primary"
                        : m.status === "replied"
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {statusLabel[m.status] ?? m.status}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {m.name} · {m.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString("pt-PT")}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            {!selected ? (
              <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-sm text-muted-foreground">
                <Mail className="mb-3 h-8 w-8 opacity-40" />
                Seleciona uma mensagem para a consultar.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Assunto
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {selected.subject}
                  </h3>
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">De</p>
                    <p className="text-foreground">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-primary hover:underline"
                    >
                      {selected.email}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mensagem</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {selected.message}
                  </p>
                </div>
                {selected.reply_body && (
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                      Resposta enviada
                      {selected.replied_at
                        ? ` · ${new Date(selected.replied_at).toLocaleString("pt-PT")}`
                        : ""}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                      {selected.reply_body}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button onClick={() => openReply(selected)}>
                    <Reply className="mr-1 h-4 w-4" /> Responder por email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!confirm("Eliminar esta mensagem?")) return;
                      deleteMutation.mutate(selected.id);
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Eliminar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder por email</DialogTitle>
          </DialogHeader>
          {selected && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                replyMutation.mutate({
                  messageId: selected.id,
                  replyBody,
                });
              }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                A resposta será enviada para{" "}
                <span className="font-medium text-foreground">{selected.email}</span>.
              </p>
              <div className="space-y-2">
                <Label htmlFor="reply">Mensagem</Label>
                <Textarea
                  id="reply"
                  required
                  rows={6}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder="Escreve a tua resposta..."
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReplyOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={replyMutation.isPending}>
                  {replyMutation.isPending ? "A enviar..." : "Enviar email"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
