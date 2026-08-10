import type { Messages } from './index';

export const screenshots = {
  director: '/screenshots/web-state-compliance.png',
  teacher: '/screenshots/app-teacher-voice-log.png',
  heroPhone: '/screenshots/app-teacher-log-menu.png',
  parent: '/screenshots/app-parent-home.png',
  portal: '/screenshots/web-director-dashboard.png',
  lessonPlans: '/screenshots/web-lesson-planner.png',
  mealPlans: '/screenshots/web-meal-plans.png',
  learningManager: '/screenshots/web-learning-manager.png',
  aiAssistant: '/screenshots/web-ai-lesson-assistant.png',
  teacherReview: '/screenshots/app-teacher-review-draft.png',
  parentStory: '/screenshots/app-parent-daily-story.png',
  teacherLogMenu: '/screenshots/app-teacher-log-menu.png',
  parentInsights: '/screenshots/app-parent-updates.png',
  parentAsk: '/screenshots/app-parent-ask-caira.png',
  newsletter: '/screenshots/web-newsletter.png',
  kiosk: '/screenshots/web-check-in-kiosk.png',
  teacherMessages: '/screenshots/app-teacher-messages.png',
};

const heroSlideMeta = [
  { type: 'phone' as const, src: screenshots.heroPhone },
  { type: 'phone' as const, src: screenshots.teacher },
  { type: 'phone' as const, src: screenshots.teacherReview },
  { type: 'browser' as const, src: screenshots.portal },
  { type: 'browser' as const, src: screenshots.director },
  { type: 'phone' as const, src: screenshots.parent },
  { type: 'phone' as const, src: screenshots.parentStory },
  { type: 'phone' as const, src: screenshots.parentAsk },
  { type: 'browser' as const, src: screenshots.newsletter },
  { type: 'browser' as const, src: screenshots.aiAssistant },
  { type: 'browser' as const, src: screenshots.lessonPlans },
  { type: 'browser' as const, src: screenshots.mealPlans },
];

const workflowIcons = [
  'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
];

const workflowColors = [
  'from-caira-teal to-caira-cyan',
  'from-caira-navy to-caira-teal',
  'from-caira-cyan to-caira-mint',
  'from-caira-coral to-caira-teal',
];

const classroomIcons = [
  'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
];

const classroomScreenshots = [
  screenshots.teacherLogMenu,
  screenshots.parentInsights,
  screenshots.parentAsk,
  screenshots.parentStory,
];

const communicationsIcons = [
  'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
];

const communicationsScreenshots = [
  screenshots.newsletter,
  screenshots.teacherMessages,
  screenshots.parent,
];

const safetyIcons = [
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
];

const operationsIcons = [
  'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
];

const securityIcons = [
  'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
];

const statValues = [
  { value: 12, suffix: '' },
  { value: 4, suffix: '' },
  { value: 100, suffix: '%' },
  { value: 2, suffix: '' },
];

const pilotSteps = ['01', '02', '03'];

export function buildHomePageData(m: Messages) {
  return {
    heroSlides: m.heroSlides.map((slide, i) => ({
      ...slide,
      ...heroSlideMeta[i],
    })),
    stats: m.stats.items.map((item, i) => ({
      ...item,
      ...statValues[i],
    })),
    workflowSteps: m.workflow.steps.map((step, i) => ({
      ...step,
      icon: workflowIcons[i],
      color: workflowColors[i],
    })),
    roleCards: [
      {
        id: 'directors',
        accent: 'role-card-director',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        screenshot: screenshots.portal,
        frame: 'browser' as const,
        ...m.roles.cards.directors,
      },
      {
        id: 'teachers',
        accent: 'role-card-teacher',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        screenshot: screenshots.teacher,
        frame: 'device' as const,
        ...m.roles.cards.teachers,
      },
      {
        id: 'parents',
        accent: 'role-card-parent',
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        screenshot: screenshots.parentAsk,
        frame: 'device' as const,
        ...m.roles.cards.parents,
      },
    ],
    classroomFeatures: m.classroom.features.map((feature, i) => ({
      ...feature,
      icon: classroomIcons[i],
      screenshot: classroomScreenshots[i],
    })),
    communicationsFeatures: m.communications.features.map((feature, i) => ({
      ...feature,
      icon: communicationsIcons[i],
      screenshot: communicationsScreenshots[i],
    })),
    safetyFeatures: m.safety.features.map((feature, i) => ({
      ...feature,
      icon: safetyIcons[i],
    })),
    operationsFeatures: m.operations.features.map((feature, i) => ({
      ...feature,
      icon: operationsIcons[i],
    })),
    securityInfra: m.security.infraItems.map((item, i) => ({
      ...item,
      icon: securityIcons[i],
    })),
    pilotSteps: m.pilotProgram.steps.map((step, i) => ({
      ...step,
      step: pilotSteps[i],
    })),
  };
}
