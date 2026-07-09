import { jsPDF } from 'jspdf';
import { personalInfo, skills, experienceTimeline, education, statistics, projects } from '../data';

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 40;
  const contentWidth = pageWidth - (marginX * 2);
  let y = 45;

  // Premium Business Color Palette
  const primaryColor = '#1e3a8a'; // Royal blue / corporate navy
  const secondaryColor = '#0f766e'; // Deep teal accent
  const bodyColor = '#1e293b'; // Slate-800 charcoal for crisp readable text
  const lightGrey = '#94a3b8'; // Slate-400 border grey

  // Page tracking for drawing footer page numbers at the end
  let totalPages = 1;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 55) {
      doc.addPage();
      y = 45;
      totalPages++;
    }
  };

  const drawHeader = () => {
    // 1. Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(primaryColor);
    doc.text(personalInfo.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
    y += 20;

    // 2. Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(bodyColor);
    const subtitle = `${personalInfo.title} | ${personalInfo.focus} | 3+ Years Experience`;
    doc.text(subtitle, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // 3. Contact Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(bodyColor);
    const contactLine = `${personalInfo.location}, India | ${personalInfo.phone} | ${personalInfo.email} | ${personalInfo.availability}`;
    doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
    y += 12;

    // 4. Horizontal Separator Rule
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1.5);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 18;
  };

  const drawSectionHeader = (title: string) => {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text(title.toUpperCase(), marginX, y);
    
    y += 4;
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.75);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 12;
  };

  // Render Header
  drawHeader();

  // SECTION 1: PROFESSIONAL SUMMARY
  drawSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(bodyColor);
  
  const summaryLines: string[] = doc.splitTextToSize(personalInfo.summary, contentWidth);
  const summaryHeight = summaryLines.length * 13;
  checkPageBreak(summaryHeight);
  
  summaryLines.forEach((line) => {
    doc.text(line, marginX, y);
    y += 13;
  });
  y += 8;

  // SECTION 2: TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  doc.setFontSize(9);
  
  // Group skills by category to render them in beautiful "Category: Skill1, Skill2" lines
  const categoriesMap: { [key: string]: string[] } = {};
  skills.forEach(skill => {
    if (!categoriesMap[skill.category]) {
      categoriesMap[skill.category] = [];
    }
    categoriesMap[skill.category].push(skill.name);
  });

  Object.entries(categoriesMap).forEach(([category, list]) => {
    const skillLinePrefix = `${category}: `;
    const skillListText = list.join(', ');
    
    doc.setFont('helvetica', 'bold');
    const prefixWidth = doc.getTextWidth(skillLinePrefix);
    
    const fullText = skillLinePrefix + skillListText;
    const wrappedLines: string[] = doc.splitTextToSize(fullText, contentWidth);
    
    checkPageBreak(wrappedLines.length * 12.5 + 4);
    
    wrappedLines.forEach((line, lineIndex) => {
      if (lineIndex === 0) {
        // Draw bold prefix
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(skillLinePrefix, marginX, y);
        
        // Draw the rest of first line
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(bodyColor);
        const restOfLine = line.substring(skillLinePrefix.length);
        doc.text(restOfLine, marginX + prefixWidth, y);
      } else {
        // Draw continuing lines
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(bodyColor);
        doc.text(line, marginX, y);
      }
      y += 12.5;
    });
    y += 1;
  });
  y += 8;

  // SECTION 3: PROFESSIONAL EXPERIENCE
  drawSectionHeader('Professional Experience');

  experienceTimeline.forEach((exp, expIndex) => {
    const roleCompany = `${exp.role} | ${exp.company}`;
    const period = exp.period;
    
    checkPageBreak(35);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor);
    doc.text(roleCompany, marginX, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(bodyColor);
    doc.text(period, pageWidth - marginX, y, { align: 'right' });
    y += 14;

    // Map projects correctly by company
    const companyProjects = exp.company === 'Sigma Solve' 
      ? ['blendx', 'tms', 'alpha-city', 'value-collaborator']
      : exp.company === 'iFlair Web Technologies'
        ? ['minbank-ai', 'sirius-ai', 'gotourit', 'ecommerce-platform']
        : ['link-publisher'];

    companyProjects.forEach((projId) => {
      const proj = requireProject(projId);
      if (!proj) return;

      checkPageBreak(30);
      
      // Project Title: Draw a beautiful crisp vector arrow/triangle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryColor);

      // Draw vector triangle (triangle coordinates: x1, y1, x2, y2, x3, y3, style)
      // Perfectly aligned with current line's text baseline (vertical center around y - 3.5)
      const triX = marginX + 6;
      const triY = y - 3.5;
      doc.setFillColor(primaryColor);
      doc.triangle(triX, triY - 3, triX + 4.5, triY, triX, triY + 3, 'F');
      
      // Draw text with appropriate padding to the right of vector triangle
      doc.text(proj.title, marginX + 16, y);
      y += 12;

      // Tech Stack
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryColor);
      doc.text(`     Tech Stack: `, marginX, y);
      const techStackPrefixWidth = doc.getTextWidth(`     Tech Stack: `);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(bodyColor);
      doc.text(proj.tags.join(', '), marginX + techStackPrefixWidth, y);
      y += 13;

      // Project Bullet Points
      proj.features.forEach((feature) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(bodyColor);
        
        // Wrap bullet point text safely
        const wrappedBulletLines: string[] = doc.splitTextToSize(feature, contentWidth - 25);
        
        checkPageBreak(wrappedBulletLines.length * 11 + 2);
        
        wrappedBulletLines.forEach((line, lineIdx) => {
          if (lineIdx === 0) {
            // Draw a neat solid circular dot for the bullet on first line
            doc.setFillColor(bodyColor);
            doc.circle(marginX + 18, y - 3, 1.5, 'F');
          }
          const drawX = marginX + 26;
          doc.text(lineIdx === 0 ? line : line.trim(), drawX, y);
          y += 11;
        });
        y += 2;
      });
      y += 4;
    });

    y += 8;
  });

  // SECTION 4: KEY ACHIEVEMENTS & IMPACT
  drawSectionHeader('Key Achievements & Impact');
  const keyAchievements = [
    "Shipped 6+ production applications across fintech, logistics, AI, enterprise SaaS, and e-Commerce domains as a full stack MERN developer within 3 years.",
    "Implemented real-time features using Socket.IO for a live crypto trading platform, achieving sub-second price feed and order book synchronization.",
    "Improved frontend performance across multiple projects by optimizing API call patterns and eliminating unnecessary component re-renders.",
    "Built reusable UI component libraries at two companies, adopted by cross-functional teams to accelerate feature delivery.",
    "Integrated Stripe payment gateways with Webhooks on two separate platforms, enabling fully automated billing and reconciliation workflows.",
    "Implemented secure multi-tenant authentication (Google OAuth, JWT, RBAC) for an enterprise SaaS platform serving multiple user roles."
  ];

  keyAchievements.forEach((ach) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(bodyColor);

    const wrappedLines: string[] = doc.splitTextToSize(ach, contentWidth - 15);
    
    checkPageBreak(wrappedLines.length * 11 + 2);

    wrappedLines.forEach((line, lineIdx) => {
      if (lineIdx === 0) {
        // Draw a neat solid dot for bullet
        doc.setFillColor(bodyColor);
        doc.circle(marginX + 10, y - 3, 1.5, 'F');
      }
      const drawX = marginX + 18;
      doc.text(lineIdx === 0 ? line : line.trim(), drawX, y);
      y += 11;
    });
    y += 3;
  });
  y += 8;

  // SECTION 5: EDUCATION
  drawSectionHeader('Education');
  checkPageBreak(30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  const degreeText = `${education.degree} in ${education.major}`;
  doc.text(degreeText, marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(bodyColor);
  const periodText = education.period;
  doc.text(periodText, pageWidth - marginX, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.text(`${education.institution}, ${education.location} | ${education.gpa}`, marginX, y);
  y += 15;

  // Add footer to all pages (Page numbers and branding)
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(lightGrey);
    doc.setDrawColor(lightGrey);
    doc.setLineWidth(0.5);
    // Draw footer divider line
    doc.line(marginX, pageHeight - 35, pageWidth - marginX, pageHeight - 35);
    // Page indicators
    const pageString = `Page ${i} of ${totalPages}`;
    doc.text(pageString, pageWidth - marginX, pageHeight - 23, { align: 'right' });
    doc.text('Jaydeep Bodar - Full Stack Developer Portfolio', marginX, pageHeight - 23);
  }

  // Save/Download PDF
  doc.save('Jaydeep_Bodar_Resume.pdf');
}

// Helper to look up project by id from data file to keep details synced and accurate
function requireProject(id: string) {
  return projects.find((p) => p.id === id);
}
