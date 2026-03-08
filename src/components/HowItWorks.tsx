import { UserPlus, Search, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastre-se gratuitamente em menos de 1 minuto com email ou Google.',
  },
  {
    icon: Search,
    title: 'Pesquise ações',
    description: 'Busque qualquer ação da bolsa e acesse dados detalhados em tempo real.',
  },
  {
    icon: TrendingUp,
    title: 'Tome decisões',
    description: 'Use nossos insights e análises para investir com mais confiança.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Três passos simples para começar a analisar suas ações.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="group relative flex flex-col items-center text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border md:block" />
              )}

              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-card border border-border shadow-glow transition-transform group-hover:scale-105">
                <step.icon className="h-9 w-9 text-primary" />
              </div>

              <span className="mb-2 font-heading text-sm font-semibold text-primary">Passo {i + 1}</span>
              <h3 className="mb-2 font-heading text-xl font-bold text-foreground">{step.title}</h3>
              <p className="max-w-xs text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
