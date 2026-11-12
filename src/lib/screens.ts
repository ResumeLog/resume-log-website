/*
 * Product screenshots. Captured from the real dashboard and extension running on
 * fictional demo data ("Jordan Ellis", made-up companies) — see
 * resume-log-ai-kb/features/RES-24-website-overhaul.md for how to regenerate.
 */
import atsPanel from '../assets/screens/ats-panel.webp'
import dashboard from '../assets/screens/dashboard.webp'
import editorAts from '../assets/screens/editor-ats.webp'
import extensionDetected from '../assets/screens/extension-detected.webp'
import extensionSaved from '../assets/screens/extension-saved.webp'
import followUpsFunnel from '../assets/screens/follow-ups-funnel.webp'
import jobDetail from '../assets/screens/job-detail.webp'
import jobsTable from '../assets/screens/jobs-table.webp'
import recentActivity from '../assets/screens/recent-activity.webp'
import resumeLibrary from '../assets/screens/resume-library.webp'
import dashboardSmall from '../assets/screens/dashboard-800.webp'
import followUpsFunnelSmall from '../assets/screens/follow-ups-funnel-800.webp'
import recentActivitySmall from '../assets/screens/recent-activity-800.webp'
import jobsTableSmall from '../assets/screens/jobs-table-800.webp'
import jobDetailSmall from '../assets/screens/job-detail-800.webp'
import editorAtsSmall from '../assets/screens/editor-ats-800.webp'
import resumeLibrarySmall from '../assets/screens/resume-library-800.webp'

export type Screen = { src: string; srcSet?: string; width: number; height: number; alt: string }

export const screens = {
  dashboard: {
    src: dashboard, srcSet: `${dashboardSmall} 800w, ${dashboard} 1600w`, width: 1600, height: 1000,
    alt: 'ResumeLog dashboard: totals for jobs, people and companies, and a response-rate chart by week',
  },
  followUpsFunnel: {
    src: followUpsFunnel, srcSet: `${followUpsFunnelSmall} 800w, ${followUpsFunnel} 1400w`, width: 1400, height: 476,
    alt: 'Needs follow-up list with jobs applied 15 to 33 days ago, next to an outcome funnel from saved to accepted',
  },
  recentActivity: {
    src: recentActivity, srcSet: `${recentActivitySmall} 800w, ${recentActivity} 1400w`, width: 1400, height: 676,
    alt: 'Recent activity feed listing recently saved jobs and companies with their status',
  },
  jobsTable: {
    src: jobsTable, srcSet: `${jobsTableSmall} 800w, ${jobsTable} 1600w`, width: 1600, height: 867,
    alt: 'Jobs table with position, company, status, salary expectation, location and date applied',
  },
  jobDetail: {
    src: jobDetail, srcSet: `${jobDetailSmall} 800w, ${jobDetail} 1100w`, width: 1100, height: 1085,
    alt: 'Job details dialog with status, salary expectation, the attached résumé PDF and the full job description',
  },
  editorAts: {
    src: editorAts, srcSet: `${editorAtsSmall} 800w, ${editorAts} 1600w`, width: 1600, height: 1000,
    alt: 'Résumé editor with the ATS check open: a score of 83 out of 100, a breakdown, and missing and found keywords',
  },
  atsPanel: {
    src: atsPanel, width: 760, height: 1704,
    alt: 'ATS check panel showing a score of 83, a category breakdown and missing keywords',
  },
  resumeLibrary: {
    src: resumeLibrary, srcSet: `${resumeLibrarySmall} 800w, ${resumeLibrary} 1400w`, width: 1400, height: 766,
    alt: 'Résumé library with thumbnails of several tailored résumé PDFs',
  },
  extensionDetected: {
    src: extensionDetected, width: 800, height: 1720,
    alt: 'ResumeLog side panel on a LinkedIn job: "Job posting detected" with a Save button',
  },
  extensionSaved: {
    src: extensionSaved, width: 800, height: 1720,
    alt: 'ResumeLog side panel after saving: "Saved as Bookmarked" and a history of synced jobs',
  },
} satisfies Record<string, Screen>
