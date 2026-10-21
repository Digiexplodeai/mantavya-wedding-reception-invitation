// Netlify Serverless Function for Blessings API
export interface BlessingEntry {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

const INITIAL_BLESSINGS: BlessingEntry[] = [
  {
    id: 'blessing-1',
    name: 'Goyal & Singla Parivar',
    relationship: 'Family Elders',
    message: 'May Lord Ganesha shower His choicest blessings upon Mantavya and Nitika as you embark on this sacred journey of togetherness, love, and lifelong harmony.',
    createdAt: '2026-10-15T10:30:00.000Z',
    approved: true,
  },
  {
    id: 'blessing-2',
    name: 'Kirna & Bhushan Goyal',
    relationship: 'Goyal Family',
    message: 'Wishing both of you a lifetime filled with endless laughter, warm festivities, and royal memories. Our hearts are overflowing with joy for the Grand Reception on November 14th!',
    createdAt: '2026-10-16T14:20:00.000Z',
    approved: true,
  },
  {
    id: 'blessing-3',
    name: 'Sarla & Dev Raj Garg',
    relationship: 'Extended Family',
    message: 'Two wonderful souls and two loving families uniting as one. May your home always glow with warmth, prosperity, and unwavering devotion.',
    createdAt: '2026-10-18T09:15:00.000Z',
    approved: true,
  },
];

// In-memory store across warm function invocations
let blessingsStore: BlessingEntry[] = [...INITIAL_BLESSINGS];

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
  queryStringParameters: Record<string, string> | null;
}) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'ok' }),
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        backendConfigured: true,
        blessings: blessingsStore,
      }),
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = event.body ? JSON.parse(event.body) : {};
      const name = String(data.name || '').trim().slice(0, 80);
      const message = String(data.message || '').trim().slice(0, 600);
      const relationship = String(data.relationship || '').trim().slice(0, 60);

      if (!name || message.length < 3) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Please enter both your name and a heartfelt blessing message.',
          }),
        };
      }

      const newEntry: BlessingEntry = {
        id: `blessing-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        relationship: relationship || undefined,
        message,
        createdAt: new Date().toISOString(),
        approved: true,
      };

      blessingsStore = [newEntry, ...blessingsStore];

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          status: 'saved',
          blessing: newEntry,
          approved: true,
        }),
      };
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON payload' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
