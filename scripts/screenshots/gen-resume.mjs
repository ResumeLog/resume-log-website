// Generates a fictional demo résumé as DOCX (for the editor) and PDF (for the library previews).
import fs from 'node:fs';
import { chromium } from 'playwright';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

const R = {
  name: 'Jordan Ellis',
  contact: 'Colombo, Sri Lanka  ·  jordan.ellis@example.com  ·  +94 77 000 0000  ·  linkedin.com/in/jordan-ellis-demo',
  summary:
    'Frontend engineer with 5 years of experience building React and TypeScript products. I care about fast, accessible interfaces and I like owning a feature from the design review to the production dashboard.',
  experience: [
    {
      role: 'Senior Frontend Engineer', org: 'Brightlane Logistics', when: '2023 – Present',
      bullets: [
        'Rebuilt the shipment tracking dashboard in React 18 and TypeScript, cutting load time from 4.2s to 1.3s.',
        'Introduced a shared component library used by 4 product teams, with Storybook docs and visual tests.',
        'Mentored 3 junior engineers and ran the weekly frontend review.',
      ],
    },
    {
      role: 'Frontend Engineer', org: 'Pinecrest Health', when: '2020 – 2023',
      bullets: [
        'Built the patient booking flow used by 120k people a month, with WCAG 2.1 AA accessibility.',
        'Moved the web app from REST polling to GraphQL subscriptions for live appointment updates.',
        'Wrote end-to-end tests in Playwright that caught 30+ regressions before release.',
      ],
    },
  ],
  skills: 'React, TypeScript, Next.js, Node.js, GraphQL, REST APIs, Tailwind CSS, Jest, Playwright, CI/CD, Figma',
  education: 'B.Sc. (Hons) in Computer Science — University of Moratuwa, 2019',
};

// ---- DOCX
const sectionHead = (t) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 2 } },
    children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 22, color: '222222' })],
  });
const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 21 } } } },
  sections: [{
    children: [
      new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: R.name, bold: true, size: 40 })] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: R.contact, size: 18, color: '555555' })] }),
      sectionHead('Summary'),
      new Paragraph({ children: [new TextRun(R.summary)] }),
      sectionHead('Experience'),
      ...R.experience.flatMap((e) => [
        new Paragraph({ spacing: { before: 120 }, children: [
          new TextRun({ text: `${e.role}, ${e.org}`, bold: true }),
          new TextRun({ text: `    ${e.when}`, color: '666666' }),
        ] }),
        ...e.bullets.map((b) => new Paragraph({ bullet: { level: 0 }, children: [new TextRun(b)] })),
      ]),
      sectionHead('Skills'),
      new Paragraph({ children: [new TextRun(R.skills)] }),
      sectionHead('Education'),
      new Paragraph({ children: [new TextRun(R.education)] }),
    ],
  }],
});
fs.writeFileSync('fixtures/jordan-ellis-resume.docx', await Packer.toBuffer(doc));

// ---- PDF (same content, via Chrome print)
const html = `<!doctype html><meta charset="utf-8"><style>
body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;color:#111;margin:0}
h1{font-size:22pt;margin:0} .c{color:#555;font-size:9pt;margin:2pt 0 10pt}
h2{font-size:11pt;letter-spacing:.06em;border-bottom:1px solid #999;margin:14pt 0 6pt;padding-bottom:2pt}
.r{display:flex;justify-content:space-between;font-weight:700;margin-top:8pt}.r span{font-weight:400;color:#666}
ul{margin:4pt 0 0 14pt;padding:0} li{margin:2pt 0}</style>
<h1>${R.name}</h1><div class="c">${R.contact}</div>
<h2>SUMMARY</h2><div>${R.summary}</div><h2>EXPERIENCE</h2>
${R.experience.map((e) => `<div class="r">${e.role}, ${e.org}<span>${e.when}</span></div><ul>${e.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`).join('')}
<h2>SKILLS</h2><div>${R.skills}</div><h2>EDUCATION</h2><div>${R.education}</div>`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome' });
const page = await browser.newPage();
await page.setContent(html);
await page.pdf({ path: 'fixtures/jordan-ellis-resume.pdf', format: 'A4', margin: { top: '18mm', bottom: '18mm', left: '18mm', right: '18mm' } });
await browser.close();
console.log('ok');
