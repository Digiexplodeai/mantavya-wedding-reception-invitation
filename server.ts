import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface BlessingEntry {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

const DATA_DIR = path.join(__dirname, 'data');
const BLESSINGS_FILE = path.join(DATA_DIR, 'blessings.json');

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

function ensureBlessingsFile(): BlessingEntry[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(BLESSINGS_FILE)) {
      fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(INITIAL_BLESSINGS, null, 2), 'utf-8');
      return INITIAL_BLESSINGS;
    }
    const raw = fs.readFileSync(BLESSINGS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_BLESSINGS;
  } catch {
    return INITIAL_BLESSINGS;
  }
}

function saveBlessings(list: BlessingEntry[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing blessings:', err);
  }
}

// Basic content check so warm wishes are automatically approved unless flagged
function isCleanBlessing(text: string): boolean {
  const blockedPatterns = /(http:\/\/|https:\/\/|<script|viagra|casino|spam)/i;
  return !blockedPatterns.test(text);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '64kb' }));

  // API: Get approved blessings (or all if host moderation view requested)
  app.get('/api/blessings', (req, res) => {
    const all = ensureBlessingsFile();
    const includePending = req.query.moderation === 'true';
    const results = includePending ? all : all.filter((b) => b.approved);
    res.json({
      status: 'ok',
      backendConfigured: true,
      blessings: results,
    });
  });

  // API: Submit a new blessing
  app.post('/api/blessings', (req, res) => {
    const { name, relationship, message } = req.body || {};
    const cleanName = String(name || '').trim().slice(0, 80);
    const cleanRel = String(relationship || '').trim().slice(0, 60);
    const cleanMessage = String(message || '').trim().slice(0, 600);

    if (!cleanName || cleanMessage.length < 3) {
      res.status(400).json({
        error: 'Please enter both your name and a heartfelt blessing message.',
      });
      return;
    }

    const all = ensureBlessingsFile();
    const autoApproved = isCleanBlessing(cleanName + ' ' + cleanMessage);

    const newEntry: BlessingEntry = {
      id: `blessing-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      relationship: cleanRel || undefined,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
      approved: autoApproved,
    };

    const updated = [newEntry, ...all];
    saveBlessings(updated);

    res.status(201).json({
      status: 'saved',
      blessing: newEntry,
      approved: autoApproved,
    });
  });

  // API: Toggle approval status (for family moderation)
  app.patch('/api/blessings/:id', (req, res) => {
    const { id } = req.params;
    const { approved } = req.body || {};
    const all = ensureBlessingsFile();
    const idx = all.findIndex((b) => b.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Blessing not found' });
      return;
    }
    all[idx].approved = Boolean(approved);
    saveBlessings(all);
    res.json({ status: 'updated', blessing: all[idx] });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Royal Wedding Invitation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
