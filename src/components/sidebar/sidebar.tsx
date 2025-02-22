import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { User2, Wallet2, Settings2 } from "lucide-react";

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tabelas
          </h2>

          {/* h-[300px] */}
          <ScrollArea className="h-auto px-1">
            <div className="space-y-1 p-2">
              {/* Tornar Dinamico */}
              <Button
                variant={pathname.includes("/users") ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link to="/users">
                  <User2 className="mr-2" size={18} /> Usuários
                </Link>
              </Button>
              <Button
                variant={pathname.includes("/payments") ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link to="/payments">
                  <Wallet2 className="mr-2" size={18} /> Pagamentos
                </Link>
              </Button>
            </div>
          </ScrollArea>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Configurações
          </h2>
          <div className="space-y-1 p-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings2 className="mr-2" size={18} /> Dados Pessoais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
