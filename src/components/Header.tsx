import { TrendingUp, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <TrendingUp className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            invest<span className="text-gradient">Info</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Entrar
          </Button>
          <Button className="rounded-full bg-gradient-primary font-semibold text-accent-foreground hover:opacity-90">
            Criar Conta
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">Entrar</Button>
            <Button className="w-full rounded-full bg-gradient-primary font-semibold text-accent-foreground">Criar Conta</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
