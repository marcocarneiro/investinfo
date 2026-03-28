import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-dashboard.png';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              Análise inteligente de ações
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Decisões{' '}
              <span className="text-gradient">inteligentes</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Dados em tempo real, análises avançadas e insights acionáveis para você investir com confiança na bolsa de valores.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full bg-gradient-primary px-8 text-base font-semibold text-accent-foreground shadow-glow hover:opacity-90" asChild>
                <Link to="/auth?tab=signup">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-border px-8 text-base text-foreground hover:bg-muted">
                Ver Demo
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-primary" /> +500 ações</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Dados seguros</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl border border-border/50 shadow-glow overflow-hidden">
              <img src={heroImage} alt="Dashboard de análise de ações investInfo" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
