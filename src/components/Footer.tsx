import { TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              invest<span className="text-gradient">Info</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Termos de Uso</a>
            <a href="#" className="transition-colors hover:text-foreground">Política de Privacidade</a>
            <a href="#" className="transition-colors hover:text-foreground">Contato</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 investInfo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
