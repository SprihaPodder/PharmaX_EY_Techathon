import { AnalysisResult, TeamMember, Agent } from '@/types/pharmax';

const METFORMIN_DATA: AnalysisResult = {
  target_drug: "Metformin",
  market_insights: {
    market_size: "$4.8 Billion",
    cagr: "8.2%",
    competitors: [
      { name: "Glucophage XR", region: "North America", description: "Extended-release formulation by Bristol-Myers Squibb" },
      { name: "Fortamet", region: "North America", description: "Once-daily extended-release tablet" },
      { name: "Riomet", region: "Global", description: "Liquid formulation for pediatric use" },
      { name: "Glumetza", region: "North America", description: "Extended-release with proprietary AcuForm technology" },
    ]
  },
  clinical_trials: [
    { nct_id: "NCT04510194", status: "Recruiting", phase: "Phase III", summary: "Metformin in PCOS: Effects on metabolic and reproductive outcomes" },
    { nct_id: "NCT03889795", status: "Completed", phase: "Phase II", summary: "Metformin for cognitive improvement in elderly patients" },
    { nct_id: "NCT04114136", status: "Recruiting", phase: "Phase II", summary: "Anti-aging effects of metformin (TAME Trial)" },
    { nct_id: "NCT03685721", status: "Completed", phase: "Phase III", summary: "Metformin as adjuvant therapy in breast cancer" },
    { nct_id: "NCT04033107", status: "Terminated", phase: "Phase II", summary: "Metformin for COVID-19 prevention (discontinued)" },
  ],
  patents: [
    { title: "Extended-Release Metformin Formulation with Enhanced Bioavailability", inventor: "Dr. Sarah Chen", assignee: "PharmaTech Inc.", filing_date: "2022-03-15" },
    { title: "Metformin Combination Therapy for Polycystic Ovary Syndrome", inventor: "Dr. Michael Rodriguez", assignee: "EndoRx Therapeutics", filing_date: "2021-11-08" },
    { title: "Novel Metformin Delivery System for Reduced GI Side Effects", inventor: "Dr. Emily Watson", assignee: "NanoMed Solutions", filing_date: "2023-01-22" },
    { title: "Metformin-Based Anti-Aging Therapeutic Composition", inventor: "Dr. James Liu", assignee: "Longevity Pharma", filing_date: "2022-07-30" },
  ],
  literature: [
    { title: "Metformin in Polycystic Ovary Syndrome: Systematic Review and Meta-Analysis", relevance_score: 96, source: "The Lancet Diabetes & Endocrinology" },
    { title: "AMPK Activation by Metformin: Mechanisms and Clinical Implications", relevance_score: 92, source: "Nature Reviews Molecular Cell Biology" },
    { title: "Metformin and Cancer: From Epidemiology to Molecular Mechanisms", relevance_score: 88, source: "Cancer Research" },
    { title: "Repurposing Metformin for Cardiovascular Disease Prevention", relevance_score: 85, source: "JAMA Cardiology" },
    { title: "Metformin's Effects on Gut Microbiome and Metabolic Health", relevance_score: 82, source: "Cell Metabolism" },
    { title: "Anti-inflammatory Properties of Metformin: Potential for Autoimmune Diseases", relevance_score: 78, source: "Autoimmunity Reviews" },
  ],
  dossier: {
    opportunity_score: 88.5,
    new_indication: "Polycystic Ovary Syndrome (PCOS)",
    mechanism_of_action: "Metformin activates AMP-activated protein kinase (AMPK), leading to reduced hepatic glucose production, enhanced insulin sensitivity, and improved ovarian function. In PCOS, this translates to normalized androgen levels, restored ovulation, and improved metabolic parameters. The drug also modulates the gut-brain-gonad axis, influencing GnRH pulsatility and reducing hyperinsulinemia-driven ovarian androgen excess.",
    evidence_summary: [
      { type: "Clinical Studies", count: 47, relevance: "High" },
      { type: "Preclinical Data", count: 128, relevance: "Medium" },
      { type: "In Silico Analysis", count: 23, relevance: "High" },
      { type: "Real-World Evidence", count: 89, relevance: "High" },
    ],
    risk_assessment: {
      regulatory: "Low risk - Metformin has extensive safety data and is already approved for metabolic conditions. FDA guidance supports 505(b)(2) pathway for new indication.",
      manufacturing: "Minimal risk - Well-established manufacturing processes with multiple qualified suppliers. No specialized equipment or novel excipients required.",
      market: "Moderate risk - While PCOS represents a significant unmet need ($6.2B market), competition from GLP-1 agonists and emerging therapies requires differentiated positioning."
    }
  }
};

const INDICATIONS = [
  "Non-Alcoholic Fatty Liver Disease (NAFLD)",
  "Alzheimer's Disease Prevention",
  "Rheumatoid Arthritis",
  "Parkinson's Disease",
  "Chronic Kidney Disease",
  "Heart Failure with Preserved Ejection Fraction"
];

const STATUSES: Array<'Recruiting' | 'Completed' | 'Terminated'> = ['Recruiting', 'Completed', 'Terminated'];
const PHASES = ['Phase I', 'Phase II', 'Phase III', 'Phase IV'];

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNCT(): string {
  return `NCT${String(randomInRange(10000000, 99999999))}`;
}

function generateGenericData(drugName: string): AnalysisResult {
  const marketSize = `$${(randomInRange(100, 5000) / 100).toFixed(1)} Billion`;
  const cagr = `${randomInRange(3, 15)}%`;
  
  const numTrials = randomInRange(3, 6);
  const numPatents = randomInRange(2, 5);
  const numLiterature = randomInRange(3, 7);
  
  const trials = Array.from({ length: numTrials }, () => ({
    nct_id: generateRandomNCT(),
    status: STATUSES[randomInRange(0, 2)],
    phase: PHASES[randomInRange(0, 3)],
    summary: `Investigation of ${drugName} therapeutic potential in new indication`
  }));
  
  const patents = Array.from({ length: numPatents }, (_, i) => ({
    title: `Novel ${drugName} Formulation for Enhanced Therapeutic Effect #${i + 1}`,
    inventor: `Dr. Research Team ${i + 1}`,
    assignee: `Pharma Corp ${String.fromCharCode(65 + i)}`,
    filing_date: `202${randomInRange(1, 4)}-${String(randomInRange(1, 12)).padStart(2, '0')}-${String(randomInRange(1, 28)).padStart(2, '0')}`
  }));
  
  const literature = Array.from({ length: numLiterature }, (_, i) => ({
    title: `${drugName} Repurposing Study: Molecular Insights and Clinical Potential`,
    relevance_score: randomInRange(65, 98),
    source: ['Nature Medicine', 'NEJM', 'The Lancet', 'JAMA', 'Cell'][randomInRange(0, 4)]
  }));
  
  return {
    target_drug: drugName,
    market_insights: {
      market_size: marketSize,
      cagr: cagr,
      competitors: [
        { name: "Market Leader A", region: "Global", description: "Primary competitor in target indication" },
        { name: "Emerging Therapy B", region: "North America/EU", description: "Novel mechanism of action" },
        { name: "Generic Alternative C", region: "Emerging Markets", description: "Cost-effective option" },
      ]
    },
    clinical_trials: trials,
    patents: patents,
    literature: literature,
    dossier: {
      opportunity_score: randomInRange(70, 95),
      new_indication: INDICATIONS[randomInRange(0, INDICATIONS.length - 1)],
      mechanism_of_action: `${drugName} demonstrates multi-modal activity through target pathway modulation, leading to therapeutic effects in the proposed indication. Preclinical studies support the mechanism with favorable safety profile observed in historical clinical use.`,
      evidence_summary: [
        { type: "Clinical Studies", count: randomInRange(10, 60), relevance: "High" },
        { type: "Preclinical Data", count: randomInRange(50, 150), relevance: "Medium" },
        { type: "In Silico Analysis", count: randomInRange(10, 40), relevance: "High" },
      ],
      risk_assessment: {
        regulatory: "Moderate risk - Requires comprehensive clinical development program with Phase II/III studies.",
        manufacturing: "Low risk - Existing manufacturing capabilities can be leveraged with minimal modifications.",
        market: "Variable risk - Competitive landscape analysis required for optimal positioning strategy."
      }
    }
  };
}

export async function analyzeStub(drugName: string): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  if (drugName.toLowerCase() === 'metformin') {
    return METFORMIN_DATA;
  }
  
  return generateGenericData(drugName);
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Ms. Spriha Podder", role: "AI Research Lead", initials: "SP" },
  { name: "Ms. Aarushi Shreevastava", role: "System Architect", initials: "AS" },
  { name: "Ms. Namita Narang", role: "Clinical Strategy Lead", initials: "NN" },
  { name: "Ms. Aastha Kapoor", role: "Cloud Architect", initials: "AK" },
  { name: "Ms. Rakshita Singh", role: "Data Engineer", initials: "RK" },
];

export const AGENTS: Agent[] = [
  { icon: "Brain", title: "Master Agent", description: "Orchestrates all specialized agents and synthesizes findings into actionable insights." },
  { icon: "BookOpen", title: "BioLit Agent", description: "Scans biomedical literature for relevant research and mechanistic evidence." },
  { icon: "FlaskConical", title: "Clinical Trials Agent", description: "Monitors global clinical trial databases for relevant studies and outcomes." },
  { icon: "Shield", title: "Patent Agent", description: "Analyzes intellectual property landscape and freedom-to-operate considerations." },
  { icon: "TrendingUp", title: "Market Intelligence Agent", description: "Evaluates market dynamics, competitive positioning, and commercial viability." },
  { icon: "AlertTriangle", title: "Safety/Risk Agent", description: "Assesses regulatory pathways and identifies potential safety concerns." },
  { icon: "FileText", title: "Report Generator", description: "Compiles comprehensive dossiers with opportunity scores and recommendations." },
];
