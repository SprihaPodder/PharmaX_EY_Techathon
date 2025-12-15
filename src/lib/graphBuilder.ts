import type { AnalysisResult } from '@/types/pharmax';
import type { KnowledgeGraph as KnowledgeGraphType, GraphNode, NodeType } from '@shared/schema';

export function buildKnowledgeGraph(data: AnalysisResult): KnowledgeGraphType {
  const nodes: GraphNode[] = [];
  const edges: { source: string; target: string; weight: number }[] = [];

  const drugId = `drug:${data.target_drug}`;
  nodes.push({ id: drugId, label: data.target_drug, type: 'drug' as NodeType });

  (data.patents || []).forEach((p, i) => {
    const id = `patent:${i}`;
    nodes.push({
      id,
      label: (p.title || p.patent_number || `Patent ${i + 1}`).slice(0, 80),
      type: 'patent' as NodeType,
      url: p.url,
      // keep original object for later use in click handlers
      metadata: p as any,
    } as unknown as GraphNode);
    edges.push({ source: drugId, target: id, weight: 1 });
  });

  (data.literature || []).forEach((l, i) => {
    const id = `lit:${i}`;
    nodes.push({
      id,
      label: (l.title || l.pmid || `Paper ${i + 1}`).slice(0, 80),
      // map literature to 'protein' node type (visual) but include original type in metadata
      type: 'protein' as NodeType,
      url: l.url,
      metadata: l as any,
    } as unknown as GraphNode);
    edges.push({ source: drugId, target: id, weight: 0.8 });
  });

  (data.clinical_trials || []).forEach((t, i) => {
    const id = `trial:${i}`;
    nodes.push({
      id,
      label: (t.title || t.nct_id || `Trial ${i + 1}`).slice(0, 80),
      type: 'pathway' as NodeType,
      url: t.url,
      metadata: t as any,
    } as unknown as GraphNode);
    edges.push({ source: drugId, target: id, weight: 0.9 });
  });

  return { nodes, edges } as unknown as KnowledgeGraphType;
}
