import { WeddingEventConfig } from '../config/weddingConfig';

/**
 * Formats an ISO date string with offset into UTC YYYYMMDDTHHMMSSZ format for Google Calendar & ICS
 */
function toUtcCalendarTimestamp(isoWithOffset: string): string {
  const date = new Date(isoWithOffset);
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Builds a working Google Calendar template URL with accurate IST event details
 */
export function getGoogleCalendarUrl(event: WeddingEventConfig): string {
  const startUtc = toUtcCalendarTimestamp(event.isoStart);
  const endUtc = toUtcCalendarTimestamp(event.isoEnd);

  const detailsLines = [
    `Mantavya & Nitika — ${event.title}`,
    '',
    ...event.subEvents.map((se) => `• ${se.title}: ${se.time}`),
    '',
    `Venue: ${event.venue.name}, ${event.venue.addressLine}, ${event.venue.cityState}`,
    event.venue.landmark ? `Landmark: ${event.venue.landmark}` : '',
    `Google Maps: ${event.venue.googleMapsUrl}`,
    '',
    'With Love & Warm Regards, Goyal Family (9417154380, 9876118860)',
  ].filter(Boolean);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Mantavya & Nitika — ${event.title}`,
    dates: `${startUtc}/${endUtc}`,
    details: detailsLines.join('\n'),
    location: `${event.venue.name}, ${event.venue.addressLine}, ${event.venue.cityState}`,
    ctz: 'Asia/Kolkata',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates and triggers a download for an .ics calendar file compatible with Apple Calendar, Outlook, and Android
 */
export function downloadEventIcs(event: WeddingEventConfig): void {
  const startUtc = toUtcCalendarTimestamp(event.isoStart);
  const endUtc = toUtcCalendarTimestamp(event.isoEnd);
  const nowUtc = toUtcCalendarTimestamp(new Date().toISOString());

  const summary = `Mantavya & Nitika — ${event.title}`;
  const location = `${event.venue.name}, ${event.venue.addressLine}, ${event.venue.cityState}`;
  const description = [
    `You are cordially invited to the ${event.title} of Mantavya & Nitika.`,
    ...event.subEvents.map((s) => `${s.title}: ${s.time}`),
    event.venue.landmark ? `Landmark: ${event.venue.landmark}` : '',
    `With Love & Warm Regards, Goyal Family.`,
  ]
    .filter(Boolean)
    .join('\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mantavya & Nitika Royal Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:mantavya-nitika-${event.id}-2026@royalwedding.in`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `URL:${event.venue.googleMapsUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Mantavya-Nitika-${event.id}-2026.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
