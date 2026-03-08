import { BarChart3, Bell, LineChart, Lock, Smartphone, Zap } from 'lucide-react';

const benefits = [
  { icon: LineChart, title: 'Análise técnica', desc: 'Gráficos interativos com indicadores técnicos avançados.' },
  { icon: Zap, title: 'Dados em tempo real', desc: 'Cotações atualizadas instantaneamente para decisões rápidas.' },
  { icon: Bell, title: 'Alertas inteligentes', desc: 'Notificações personalizadas quando suas ações atingirem metas.' },
  { icon: BarChart3, title: 'Relatórios detalhados', desc: 'Relatórios completos sobre desempenho e fundamentos.' },
  { icon: Lock, title: 'Segurança total', desc: 'Seus dados protegidos com criptografia de ponta.' },
  { icon: Smartphone, title: 'Acesse de qualquer lugar', desc: 'Plataforma responsiva para desktop, tablet e celular.' },
];

const Benefits = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Por que escolher o <span className="text-gradient">investInfo</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Tudo o que você precisa para analisar ações em um só lugar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/30 hover:shadow-glow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
