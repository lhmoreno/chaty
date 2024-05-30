import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <Badge variant="destructive" className="text-sm tracking-widest">
        Erro 404
      </Badge>
      <h2 className="text-4xl font-medium">Página não encontrada</h2>
      <p className="text-slate-600">
        Desculpe, a página que você está procurando não existe.
      </p>
    </div>
  );
}
