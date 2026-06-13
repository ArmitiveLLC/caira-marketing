/** Pilot form API — Firebase Hosting rewrite to Cloud Function in production. */
export function getPilotApiUrl() {
  return import.meta.env.PUBLIC_PILOT_API_URL || '/api/pilot';
}

export const classroomBands = [
  '1 classroom',
  '2–3 classrooms',
  '4–6 classrooms',
  '7+ classrooms',
] as const;

export const pilotContactEmail = 'info@caira.care';
