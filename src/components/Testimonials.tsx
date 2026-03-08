import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Investidor individual',
    text: 'O investInfo mudou completamente minha forma de analisar ações. Os dados em tempo real são incríveis.',
  },
  {
    name: 'Ana P.',
    role: 'Day trader',
    text: 'Os alertas inteligentes me ajudam a nunca perder oportunidades. Ferramenta essencial no meu dia a dia.',
  },
  {
    name: 'Roberto S.',
    role: 'Analista financeiro',
    text: 'Interface limpa e dados confiáveis. Recomendo para qualquer pessoa que investe na bolsa.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            O que nossos <span className="text-gradient">usuários dizem</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
