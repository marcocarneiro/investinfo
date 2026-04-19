import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TrendingUp, BarChart3, PieChart, Activity, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

interface Evaluation {
  company: string;
  ticker: string;
  date: string;
  raw: Record<string, unknown>;
}

const N8N_WEBHOOK_URL = 'https://n8n.io4all.com/webhook-test/ee74b52b-a855-4dc4-adfa-480862a49603';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      else setUser(session.user);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/auth');
      else setUser(session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEvaluate = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      toast.error('Digite o nome ou ticker da empresa.');
      return;
    }

    setEvaluating(true);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ empresa: trimmed }),
      });

      if (!res.ok) throw new Error(`Erro ${res.status}`);

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error('A resposta do n8n não é um JSON válido. Verifique se o nó de Webhook está configurado para "Respond with Data".');
      }

      const payload = Array.isArray(data) ? data[0] : data;

      let companyName = trimmed;
      let companyTicker = '-';

      if (payload?.dados_acao) {
        companyName = payload.dados_acao.nome || companyName;
        companyTicker = payload.dados_acao.ticker || companyTicker;
      } else {
        companyName = payload?.nome || payload?.name || payload?.empresa || trimmed;
        companyTicker = payload?.ticker || payload?.symbol || payload?.codigo || '-';
      }

      const evaluation: Evaluation = {
        company: companyName,
        ticker: companyTicker,
        date: new Date().toLocaleDateString('pt-BR'),
        raw: payload || {},
      };

      setEvaluations(prev => [evaluation, ...prev]);
      setQuery('');
      toast.success(`Avaliação de ${evaluation.company} concluída!`);
    } catch (err) {
      console.error(err);
      toast.error('Falha ao avaliar empresa. Tente novamente.');
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Investidor';

  const renderValue = (value: unknown, depth = 0): JSX.Element => {
    if (value === null || value === undefined) return <span className="text-muted-foreground">-</span>;
    if (typeof value === 'boolean') return <span>{value ? 'Sim' : 'Não'}</span>;
    if (typeof value === 'number' || typeof value === 'string') return <span>{String(value)}</span>;
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-4 space-y-1">
          {value.map((item, i) => (
            <li key={i}>{renderValue(item, depth + 1)}</li>
          ))}
        </ul>
      );
    }
    if (typeof value === 'object') {
      return (
        <div className={depth > 0 ? 'pl-4 border-l border-border ml-1' : ''}>
          {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
            <div key={k} className="py-1">
              <span className="font-semibold text-primary capitalize">{k.replace(/_/g, ' ')}: </span>
              {renderValue(v, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Olá, <span className="text-gradient">{firstName}</span> 👋
          </h1>
          <p className="text-muted-foreground mb-10">
            Bem-vindo ao seu painel de análises.
          </p>

          {/* Stats cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
            {[
              { icon: TrendingUp, label: 'Ações monitoradas', value: String(evaluations.length) },
              { icon: BarChart3, label: 'Análises realizadas', value: String(evaluations.length) },
              { icon: PieChart, label: 'Carteiras', value: '0' },
              { icon: Activity, label: 'Alertas ativos', value: '0' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shrink-0">
                  <Icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Evaluate company */}
          <div className="rounded-2xl border border-border bg-card p-6 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Avaliar Empresa</h2>
            <div className="flex gap-3">
              <Input
                placeholder="Digite o nome ou ticker da empresa (ex: PETR4)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEvaluate()}
                className="flex-1"
                disabled={evaluating}
              />
              <Button onClick={handleEvaluate} disabled={evaluating} className="shrink-0 rounded-xl gap-2">
                {evaluating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Avaliar Empresa
              </Button>
            </div>
          </div>

          {/* Results table */}
          {evaluations.length > 0 && (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Data de Avaliação</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluations.map((ev, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{ev.company}</TableCell>
                      <TableCell>{ev.ticker}</TableCell>
                      <TableCell>{ev.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setSelectedEval(ev)}>
                          Análise completa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Empty state */}
          {evaluations.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                Nenhuma avaliação ainda
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Use o campo acima para avaliar uma empresa e ver os resultados aqui.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Full analysis modal */}
      <Dialog open={!!selectedEval} onOpenChange={open => !open && setSelectedEval(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedEval?.company} ({selectedEval?.ticker})
            </DialogTitle>
            <DialogDescription>Avaliação realizada em {selectedEval?.date}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="text-sm text-foreground space-y-8 pb-4">
              {selectedEval && (
                <>
                  {selectedEval.raw?.dados_acao ? (
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Dados da Ação</h3>
                      <div className="rounded-xl border border-border overflow-hidden">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableHead className="w-1/3 bg-muted/50 font-semibold text-foreground">Ticker</TableHead>
                              <TableCell className="font-medium">{(selectedEval.raw.dados_acao as Record<string, any>).ticker || '-'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-1/3 bg-muted/50 font-semibold text-foreground">Nome</TableHead>
                              <TableCell>{(selectedEval.raw.dados_acao as Record<string, any>).nome || '-'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-1/3 bg-muted/50 font-semibold text-foreground">Preço</TableHead>
                              <TableCell>{(selectedEval.raw.dados_acao as Record<string, any>).preco || '-'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-1/3 bg-muted/50 font-semibold text-foreground">Variação</TableHead>
                              <TableCell>
                                <span className={
                                  String((selectedEval.raw.dados_acao as Record<string, any>).variacao).startsWith('-') 
                                    ? 'text-destructive font-semibold' 
                                    : 'text-green-500 font-semibold'
                                }>
                                  {(selectedEval.raw.dados_acao as Record<string, any>).variacao || '-'}
                                </span>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-1/3 bg-muted/50 font-semibold text-foreground">Setor</TableHead>
                              <TableCell>{(selectedEval.raw.dados_acao as Record<string, any>).setor || '-'}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : null}

                  {selectedEval.raw?.wikipedia ? (
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Resumo (Wikipedia)</h3>
                      <div className="rounded-xl border border-border overflow-hidden">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableHead className="w-1/3 align-top bg-muted/50 font-semibold text-foreground">Título</TableHead>
                              <TableCell className="font-medium">{(selectedEval.raw.wikipedia as Record<string, any>).titulo || '-'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="align-top bg-muted/50 font-semibold text-foreground">Descrição</TableHead>
                              <TableCell className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                                {(selectedEval.raw.wikipedia as Record<string, any>).descricao || '-'}
                              </TableCell>
                            </TableRow>
                            {(selectedEval.raw.wikipedia as Record<string, any>).url && (
                              <TableRow>
                                <TableHead className="bg-muted/50 font-semibold text-foreground">URL</TableHead>
                                <TableCell>
                                  <a href={(selectedEval.raw.wikipedia as Record<string, any>).url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                                    Acessar artigo completo na Wikipedia
                                  </a>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : null}

                  {/* Fallback caso chegue algum outro dado não esperado ou antigo */}
                  {!selectedEval.raw?.dados_acao && !selectedEval.raw?.wikipedia && renderValue(selectedEval.raw)}
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
