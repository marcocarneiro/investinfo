import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'O investInfo é gratuito?', a: 'Sim! Oferecemos um plano gratuito com funcionalidades essenciais. Para recursos avançados, temos planos premium acessíveis.' },
  { q: 'Quais ações posso analisar?', a: 'Você pode analisar todas as ações listadas na B3 (bolsa de valores brasileira), incluindo ações, FIIs e ETFs.' },
  { q: 'Os dados são em tempo real?', a: 'Sim, nossos dados são atualizados em tempo real durante o pregão, com delay máximo de 15 minutos no plano gratuito.' },
  { q: 'Posso usar no celular?', a: 'Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em qualquer dispositivo.' },
  { q: 'Como cancelo minha assinatura?', a: 'Você pode cancelar a qualquer momento diretamente nas configurações da sua conta, sem burocracia.' },
];

const FAQ = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border bg-gradient-card px-6"
              >
                <AccordionTrigger className="font-heading text-left font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
