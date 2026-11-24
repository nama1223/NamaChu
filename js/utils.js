/* NamaChu — shared utilities */

// ---- Music / pitch math ----

export const NOTE_NAMES_ABC = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
export const NOTE_NAMES_DO  = ['ド','レ♭','レ','ミ♭','ミ','ファ','ソ♭','ソ','ラ♭','ラ','シ♭','シ'];

export function freqToMidi(freq, concertPitchA4 = 440) {
  return 69 + 12 * Math.log2(freq / concertPitchA4);
}

export function midiToNoteInfo(midi) {
  const rounded = Math.round(midi);
  const cents = Math.round((midi - rounded) * 100);
  const note = ((rounded % 12) + 12) % 12;
  const octave = Math.floor(rounded / 12) - 1;
  return { note, octave, cents };
}

export function noteName(noteIndex, octave, style = 'abc', showOctave = false) {
  const names = style === 'do' ? NOTE_NAMES_DO : NOTE_NAMES_ABC;
  return showOctave ? `${names[noteIndex]}${octave}` : names[noteIndex];
}

export function midiToFreq(midi, concertPitchA4 = 440) {
  return concertPitchA4 * Math.pow(2, (midi - 69) / 12);
}

// ---- Display transposition options ----
// trans: semitones to subtract from concert MIDI to get displayed (written) MIDI
export const DISPLAY_TRANSPOSITIONS = [
  { id: 'C',       nameJa: 'C (実音)',        nameEn: 'C (concert)',    trans: 0   },
  { id: 'Bb',      nameJa: 'B♭ (Bb管)',      nameEn: 'B♭ (Bb)',       trans: -2  },
  { id: 'Eb',      nameJa: 'E♭ (Eb管/Alto)', nameEn: 'E♭ (Eb/Alto)',  trans: -9  },
  { id: 'F',       nameJa: 'F (F管)',         nameEn: 'F (F)',          trans: -7  },
  { id: 'Eb_high', nameJa: 'E♭ (高音Eb)',    nameEn: 'E♭ (high Eb)',  trans: 3   },
  { id: 'Bb_low',  nameJa: 'B♭ (低音Bb)',    nameEn: 'B♭ (low Bb)',   trans: -14 },
  { id: 'Eb_low',  nameJa: 'E♭ (低音Eb)',    nameEn: 'E♭ (low Eb)',   trans: -21 },
];

// ---- Instrument families ----
export const INSTRUMENT_FAMILIES = [
  { id: 'double_reed', nameJa: 'ダブルリード',   nameEn: 'Double Reed' },
  { id: 'single_reed', nameJa: 'シングルリード', nameEn: 'Single Reed' },
  { id: 'air_reed',    nameJa: 'エアリード',     nameEn: 'Air Reed / Flute' },
  { id: 'brass_high',  nameJa: '金管高音',       nameEn: 'High Brass' },
  { id: 'brass_mid',   nameJa: '金管中音',       nameEn: 'Mid Brass' },
  { id: 'brass_low',   nameJa: '金管低音',       nameEn: 'Low Brass' },
  { id: 'other',       nameJa: 'その他',         nameEn: 'Other' },
];

// ---- Instrument definitions ----
// trans: written vs concert semitone difference
// ranges: [[loMidi,hiMidi], ...] × 4 levels — index 0=初級 1=中級 2=上級 3=プロ
// ★ 音域を手動調整したい場合はこのファイルの ranges 配列の数値を直接書き換えてください。
//   MIDIノート番号: C4=60, A4=69。半音ごとに±1。
export const INSTRUMENTS = [
  // Double Reed
  { id: 'ob',           family: 'double_reed', nameJa: 'オーボエ',                   nameEn: 'Oboe',                trans: 0,   ranges: [[60,79],[58,84],[58,88],[58,91]] },
  { id: 'cor_anglais',  family: 'double_reed', nameJa: 'コールアングレ',             nameEn: 'Cor Anglais (F)',     trans: -7,  ranges: [[55,72],[53,77],[51,79],[51,82]] },
  { id: 'fg',           family: 'double_reed', nameJa: 'ファゴット',                 nameEn: 'Bassoon',             trans: 0,   ranges: [[41,62],[38,67],[36,72],[34,76]] },
  { id: 'contrafg',     family: 'double_reed', nameJa: 'コントラファゴット',         nameEn: 'Contrabassoon',       trans: 12,  ranges: [[29,48],[26,55],[24,60],[22,64]] },

  // Single Reed — Saxophone
  { id: 'sopranino_sax',family: 'single_reed', nameJa: 'ソプラニーノサックス (Eb)', nameEn: 'Sopranino Sax (Eb)',  trans: 3,   ranges: [[63,81],[61,96],[61,99],[61,102]] },
  { id: 'sop_sax',      family: 'single_reed', nameJa: 'ソプラノサックス (Bb)',     nameEn: 'Soprano Sax (Bb)',    trans: -2,  ranges: [[58,76],[56,91],[56,94],[56,97]] },
  { id: 'eb_alto',      family: 'single_reed', nameJa: 'アルトサックス (Eb)',       nameEn: 'Alto Sax (Eb)',       trans: -9,  ranges: [[51,69],[49,84],[49,87],[49,90]] },
  { id: 'bb_tenor',     family: 'single_reed', nameJa: 'テナーサックス (Bb)',       nameEn: 'Tenor Sax (Bb)',      trans: -14, ranges: [[46,64],[44,79],[44,82],[44,85]] },
  { id: 'eb_bari',      family: 'single_reed', nameJa: 'バリトンサックス (Eb)',     nameEn: 'Bari Sax (Eb)',       trans: -21, ranges: [[39,57],[37,69],[37,72],[37,75]] },
  { id: 'bass_sax',     family: 'single_reed', nameJa: 'バスサックス (Bb)',         nameEn: 'Bass Sax (Bb)',       trans: -26, ranges: [[34,50],[32,64],[32,67],[32,70]] },
  // Single Reed — Clarinet
  { id: 'eb_clar',      family: 'single_reed', nameJa: 'クラリネット (Eb)',         nameEn: 'Clarinet (Eb)',       trans: 3,   ranges: [[57,77],[55,86],[55,92],[55,96]] },
  { id: 'bb_clar',      family: 'single_reed', nameJa: 'クラリネット (Bb)',         nameEn: 'Clarinet (Bb)',       trans: -2,  ranges: [[50,76],[50,84],[50,90],[50,95]] },
  { id: 'a_clar',       family: 'single_reed', nameJa: 'クラリネット (A)',          nameEn: 'Clarinet (A)',        trans: -3,  ranges: [[49,75],[49,83],[49,89],[49,94]] },
  { id: 'bassclar',     family: 'single_reed', nameJa: 'バスクラリネット (Bb)',     nameEn: 'Bass Clarinet (Bb)', trans: -14, ranges: [[43,62],[40,72],[38,77],[38,81]] },
  { id: 'contraclar',   family: 'single_reed', nameJa: 'コントラバスクラリネット',  nameEn: 'Contrabass Clarinet', trans: -26, ranges: [[34,50],[31,60],[28,65],[26,69]] },

  // Air Reed
  { id: 'piccolo',      family: 'air_reed',    nameJa: 'ピッコロ',                  nameEn: 'Piccolo',             trans: 12,  ranges: [[89,103],[87,110],[86,116],[86,120]] },
  { id: 'fl',           family: 'air_reed',    nameJa: 'フルート',                  nameEn: 'Flute',               trans: 0,   ranges: [[60,81],[60,88],[60,93],[60,97]] },
  { id: 'alt_fl',       family: 'air_reed',    nameJa: 'アルトフルート (G)',         nameEn: 'Alto Flute (G)',      trans: -7,  ranges: [[57,76],[55,83],[55,88],[55,92]] },
  { id: 'bass_fl',      family: 'air_reed',    nameJa: 'バスフルート',              nameEn: 'Bass Flute',          trans: -12, ranges: [[53,67],[50,76],[48,81],[48,85]] },

  // High Brass
  { id: 'eb_trumpet',   family: 'brass_high',  nameJa: 'トランペット (Eb)',          nameEn: 'Trumpet (Eb)',        trans: 3,   ranges: [[57,76],[57,81],[57,85],[57,88]] },
  { id: 'bb_trumpet',   family: 'brass_high',  nameJa: 'トランペット (Bb)',          nameEn: 'Trumpet (Bb)',        trans: -2,  ranges: [[53,74],[52,79],[52,83],[52,86]] },
  { id: 'c_trumpet',    family: 'brass_high',  nameJa: 'トランペット (C)',           nameEn: 'Trumpet (C)',         trans: 0,   ranges: [[54,74],[54,79],[54,83],[54,86]] },
  { id: 'cornet',       family: 'brass_high',  nameJa: 'コルネット (Bb)',            nameEn: 'Cornet (Bb)',         trans: -2,  ranges: [[53,73],[52,78],[52,82],[52,85]] },
  { id: 'flugelhorn',   family: 'brass_high',  nameJa: 'フリューゲルホルン (Bb)',   nameEn: 'Flugelhorn (Bb)',     trans: -2,  ranges: [[53,71],[52,76],[52,80],[52,83]] },

  // Mid Brass
  { id: 'f_horn',       family: 'brass_mid',   nameJa: 'ホルン (F)',                 nameEn: 'Horn (F)',            trans: -7,  ranges: [[46,64],[41,70],[37,74],[34,78]] },
  { id: 'tenor_horn',   family: 'brass_mid',   nameJa: 'テナーホーン (Eb)',          nameEn: 'Tenor Horn (Eb)',     trans: 3,   ranges: [[47,66],[45,71],[45,75],[45,78]] },
  { id: 'bb_trombone',  family: 'brass_mid',   nameJa: 'テナートロンボーン',         nameEn: 'Trombone (Bb)',       trans: 0,   ranges: [[43,67],[38,70],[34,72],[29,77]] },
  { id: 'bass_trombone',family: 'brass_mid',   nameJa: 'バストロンボーン',           nameEn: 'Bass Trombone',       trans: 0,   ranges: [[41,60],[38,65],[36,69],[34,74]] },
  { id: 'bb_euph',      family: 'brass_mid',   nameJa: 'ユーフォニアム (Bb)',        nameEn: 'Euphonium (Bb)',      trans: -2,  ranges: [[43,67],[38,70],[34,72],[29,77]] },

  // Low Brass
  { id: 'bb_tuba',      family: 'brass_low',   nameJa: 'テューバ (Bb)',              nameEn: 'Tuba (Bb)',           trans: -2,  ranges: [[36,53],[33,58],[31,62],[29,65]] },
  { id: 'c_tuba',       family: 'brass_low',   nameJa: 'テューバ (C)',               nameEn: 'Tuba (C)',            trans: 0,   ranges: [[36,54],[33,59],[31,63],[29,66]] },
  { id: 'eb_tuba',      family: 'brass_low',   nameJa: 'テューバ (Eb)',              nameEn: 'Tuba (Eb)',           trans: 3,   ranges: [[38,56],[35,61],[33,65],[31,68]] },
  { id: 'f_tuba',       family: 'brass_low',   nameJa: 'テューバ (F)',               nameEn: 'Tuba (F)',            trans: -7,  ranges: [[41,58],[38,63],[36,67],[34,70]] },

  // Other
  { id: 'concert',      family: 'other',       nameJa: 'Concert (C)',               nameEn: 'Concert (C)',         trans: 0,   ranges: [[53,74],[50,79],[49,82],[48,85]] },
];

// rangeLevel: 0=初級 1=中級 2=上級 3=プロ（デフォルト1）
export function getInstrument(id, rangeLevel = 1) {
  const inst = INSTRUMENTS.find(i => i.id === id) || INSTRUMENTS.find(i => i.id === 'concert') || INSTRUMENTS[0];
  const lvl = Math.max(0, Math.min(3, rangeLevel ?? 1));
  const [loMidi, hiMidi] = inst.ranges[lvl];
  return { ...inst, loMidi, hiMidi };
}

// ---- Misc UI utils ----

let toastTimer = null;
export function showToast(msg, durationMs = 2000) {
  const el = document.getElementById('toastMsg');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), durationMs);
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
}

export function openModal(id) {
  document.getElementById(id)?.classList.add('active');
}

export function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function defaultSaveName() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}

export function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
export function lerp(a, b, t) { return a + (b - a) * t; }
export function mapRange(v, inLo, inHi, outLo, outHi) {
  return outLo + (outHi - outLo) * ((v - inLo) / (inHi - inLo));
}

// ---- LocalStorage helpers ----
const LS_PREFIX = 'namaChu_';

export function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}

export function lsSet(key, value) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(value)); } catch {}
}

export function lsDel(key) {
  try { localStorage.removeItem(LS_PREFIX + key); } catch {}
}

export function lsKeys(prefix = '') {
  const results = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(LS_PREFIX + prefix)) results.push(k.slice(LS_PREFIX.length));
  }
  return results;
}
