import { jsPDF } from 'jspdf';
import { Dossier, AnalysisResult } from '@/types/pharmax';

export function generatePharmaXReport(data: AnalysisResult): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  // Header
  doc.setFillColor(20, 184, 166); // Teal
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PharmaX.ai', margin, 18);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Drug Repurposing Report', margin, 28);
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, 28);

  yPos = 55;

  // Drug Name Section
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Target Drug', margin, yPos);
  
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(20);
  doc.text(data.target_drug, margin, yPos + 10);
  yPos += 25;

  // Opportunity Score Badge
  doc.setFillColor(240, 253, 250);
  doc.roundedRect(margin, yPos, 80, 25, 3, 3, 'F');
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(10);
  doc.text('Opportunity Score', margin + 5, yPos + 8);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.dossier.opportunity_score}/100`, margin + 5, yPos + 20);
  yPos += 35;

  // New Indication
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Proposed New Indication', margin, yPos);
  
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(data.dossier.new_indication, margin, yPos + 8);
  yPos += 20;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Mechanism of Action
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Mechanism of Action', margin, yPos);
  yPos += 8;
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(data.dossier.mechanism_of_action, margin, yPos, contentWidth);
  yPos += 10;

  // Evidence Summary
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Evidence Summary', margin, yPos);
  yPos += 10;

  // Evidence table header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos - 5, contentWidth, 10, 'F');
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Evidence Type', margin + 5, yPos);
  doc.text('Count', margin + 80, yPos);
  doc.text('Relevance', margin + 110, yPos);
  yPos += 8;

  // Evidence rows
  doc.setFont('helvetica', 'normal');
  data.dossier.evidence_summary.forEach((evidence) => {
    doc.setTextColor(30, 30, 30);
    doc.text(evidence.type, margin + 5, yPos);
    doc.text(String(evidence.count), margin + 80, yPos);
    
    // Color code relevance
    if (evidence.relevance === 'High') {
      doc.setTextColor(16, 185, 129);
    } else {
      doc.setTextColor(59, 130, 246);
    }
    doc.text(evidence.relevance, margin + 110, yPos);
    yPos += 7;
  });
  yPos += 10;

  // Risk Assessment
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Assessment', margin, yPos);
  yPos += 10;

  const risks = [
    { label: 'Regulatory Risk', text: data.dossier.risk_assessment.regulatory },
    { label: 'Manufacturing Risk', text: data.dossier.risk_assessment.manufacturing },
    { label: 'Market Risk', text: data.dossier.risk_assessment.market },
  ];

  risks.forEach((risk) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, yPos - 3, contentWidth, 25, 2, 2, 'F');
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(risk.label, margin + 5, yPos + 3);
    
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const riskLines = doc.splitTextToSize(risk.text, contentWidth - 10);
    doc.text(riskLines.slice(0, 2), margin + 5, yPos + 12);
    yPos += 30;
  });

  // Market Insights Section (new page if needed)
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Market Insights', margin, yPos);
  yPos += 10;

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Market Size: ${data.market_insights.market_size}`, margin, yPos);
  yPos += 7;
  doc.text(`Growth Rate (CAGR): ${data.market_insights.cagr}`, margin, yPos);
  yPos += 15;

  // Clinical Trials Summary
  doc.setTextColor(20, 184, 166);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Clinical Trials Summary', margin, yPos);
  yPos += 10;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const trialSummary = {
    total: data.clinical_trials.length,
    recruiting: data.clinical_trials.filter(t => t.status === 'Recruiting').length,
    completed: data.clinical_trials.filter(t => t.status === 'Completed').length,
  };
  
  doc.text(`Total Trials: ${trialSummary.total}`, margin, yPos);
  yPos += 6;
  doc.text(`Recruiting: ${trialSummary.recruiting} | Completed: ${trialSummary.completed}`, margin, yPos);
  yPos += 15;

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text('Generated by PharmaX.ai — Accelerating Drug Discovery Through AI', margin, footerY);
  doc.text('Confidential', pageWidth - margin - 25, footerY);

  // Save the PDF
  doc.save(`PharmaX_Report_${data.target_drug.replace(/\s+/g, '_')}.pdf`);
}
