export interface Competitor {
  name: string;
  region: string;
  description: string;
}

export interface MarketInsights {
  market_size: string;
  cagr: string;
  competitors: Competitor[];
}

export interface ClinicalTrial {
  nct_id: string;
  status: 'Recruiting' | 'Completed' | 'Terminated';
  phase: string;
  summary: string;
}

export interface Patent {
  title: string;
  inventor: string;
  assignee: string;
  filing_date: string;
}

export interface Literature {
  title: string;
  relevance_score: number;
  source: string;
}

export interface EvidenceSummary {
  type: string;
  count: number;
  relevance: string;
}

export interface RiskAssessment {
  regulatory: string;
  manufacturing: string;
  market: string;
}

export interface Dossier {
  opportunity_score: number;
  new_indication: string;
  mechanism_of_action: string;
  evidence_summary: EvidenceSummary[];
  risk_assessment: RiskAssessment;
}

export interface AnalysisResult {
  target_drug: string;
  market_insights: MarketInsights;
  clinical_trials: ClinicalTrial[];
  patents: Patent[];
  literature: Literature[];
  dossier: Dossier;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface Agent {
  icon: string;
  title: string;
  description: string;
}
