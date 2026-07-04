import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
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

const emptyForm: FormState = {
  title: "",
  category: "",
  image: "",
  link: "",
  description: "",
  sort_order: 0,
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
        link: values.link,
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
      link: p.link,
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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Administração</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {userEmail} · Gestão dos cards do portfolio
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={openCreate}>
            <Plus className="mr-1 h-4 w-4" /> Novo card
          </Button>
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
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">A carregar...</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
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
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-xs text-muted-foreground hover:underline"
                >
                  {p.link}
                </a>
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
              <Label htmlFor="link">Link do Behance</Label>
              <Input
                id="link"
                type="url"
                required
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
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
    </div>
  );
}
