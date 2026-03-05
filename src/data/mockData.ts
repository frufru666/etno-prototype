// Etno Explorer — Mock Data & Type Definitions
// Based on real data from etno-data-latest.csv + admin field structure
// Source of truth for field names: Filament admin (etno-admin-exampleDoc.mhtml)

// ─── Document Type Vocabulary ───────────────────────────────────────────────

export type DocumentType =
  | "výskumná správa"
  | "fotografia"
  | "videonahrávka"
  | "audionahrávka"
  | "diapozitív"
  | "kresba"
  | "dotazník";

// Derived display type — determines which viewer opens on detail page
export type MediaType = "image" | "video" | "audio" | "pdf" | "document";

export function getMediaType(docType: DocumentType): MediaType {
  switch (docType) {
    case "fotografia":
    case "diapozitív":
    case "kresba":
      return "image";
    case "videonahrávka":
      return "video";
    case "audionahrávka":
      return "audio";
    case "výskumná správa":
    case "dotazník":
      return "pdf";
    default:
      return "document";
  }
}

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface Participant {
  name: string;
  orcid?: string; // full URL: "https://orcid.org/0000-0001-..."
}

export interface EtnoDocument {
  id: string; // "AT00016", "AD017191", or "-" (unassigned)
  doi?: string;

  // Content (SK only for V1)
  title: string;
  subtitle?: string;
  abstract?: string;
  note?: string;
  keywords: string[];
  language?: string;

  // Participants
  authors: Participant[];
  researchers: Participant[];
  originators: Participant[];

  // Geography
  obec?: string;
  castObce?: string;
  okres?: string;
  kraj?: string;
  stat: string;
  lokalita?: string;

  // Approximate coordinates for map display (optional)
  lat?: number;
  lng?: number;

  // Dates
  studyPeriodStart?: string; // ISO date or year: "1950-05-01" or "1950"
  studyPeriodEnd?: string; // ISO date or year (if range)
  submissionDate?: string;

  // Classification
  documentType: DocumentType;
  mediaType: MediaType; // derived
  researchCollection: string;
  project?: string;

  // Collection & acquisition
  institution: string;
  institutionRor?: string;
  collectionMethod: string;
  acquisitionMethod: string;

  // Technical
  size?: string;
  sizeType?: string; // "strany", "čas"
  format?: string;
  notation?: string; // "strojopis", "rukopis, kresba", etc.

  // Access
  accessRight: string;
  license: string;

  // Display helpers
  hasTranscript: boolean;
  hasMap: boolean;
}

// ─── Filter Configuration ───────────────────────────────────────────────────

export interface FilterDef {
  key: string;
  label: string;
  type: "checkbox" | "range";
}

export interface FilterCategory {
  label: string;
  icon: "Tag" | "MapPin" | "FileText";
  filters: FilterDef[];
}

export const FILTER_CATEGORIES: Record<string, FilterCategory> = {
  thematic: {
    label: "Tematické a autorské údaje",
    icon: "Tag",
    filters: [
      { key: "keywords", label: "Kľúčové slová", type: "checkbox" },
      { key: "researchCollection", label: "Výskumná zbierka", type: "checkbox" },
      { key: "author", label: "Autor", type: "checkbox" },
    ],
  },
  geographic: {
    label: "Geografické údaje",
    icon: "MapPin",
    filters: [
      { key: "obec", label: "Obec", type: "checkbox" },
      { key: "okres", label: "Okres", type: "checkbox" },
      { key: "kraj", label: "Kraj", type: "checkbox" },
      { key: "stat", label: "Štát", type: "checkbox" },
    ],
  },
  formal: {
    label: "Formálne a technické údaje",
    icon: "FileText",
    filters: [
      { key: "documentType", label: "Typ dokumentu", type: "checkbox" },
      { key: "studyPeriod", label: "Čas realizácie (časový rozsah)", type: "range" },
      { key: "collectionMethod", label: "Spôsob zberu", type: "checkbox" },
      { key: "language", label: "Jazyk", type: "checkbox" },
    ],
  },
};

// ─── Helper: Get filterable value from document ─────────────────────────────

export function getFilterableValue(doc: EtnoDocument, key: string): string[] {
  switch (key) {
    case "keywords":
      return doc.keywords;
    case "researchCollection":
      return [doc.researchCollection];
    case "author":
      return doc.authors.map((a) => a.name);
    case "obec":
      return doc.obec ? [doc.obec] : [];
    case "okres":
      return doc.okres ? [doc.okres] : [];
    case "kraj":
      return doc.kraj ? [doc.kraj] : [];
    case "stat":
      return [doc.stat];
    case "documentType":
      return [doc.documentType];
    case "collectionMethod":
      return [doc.collectionMethod];
    case "language":
      return doc.language ? [doc.language] : [];
    case "studyPeriod":
      return doc.studyPeriodStart ? [doc.studyPeriodStart] : [];
    default:
      return [];
  }
}

// ─── Helper: Check if document matches active filters ───────────────────────

export function matchesFilters(
  doc: EtnoDocument,
  activeFilters: Record<string, string[]>
): boolean {
  const keys = Object.keys(activeFilters);
  if (keys.length === 0) return true;
  for (const key of keys) {
    const selected = activeFilters[key];
    if (!selected?.length) continue;
    const docValues = getFilterableValue(doc, key);
    const hasMatch = selected.some((v) => docValues.includes(v));
    if (!hasMatch) return false;
  }
  return true;
}

// ─── Helper: Get unique values for a filter key ─────────────────────────────

export function getUniqueValues(key: string): string[] {
  const set = new Set<string>();
  for (const doc of DOCUMENTS) {
    const values = getFilterableValue(doc, key);
    for (const v of values) {
      if (v) set.add(v);
    }
  }
  return Array.from(set).sort();
}

// ─── Helper: Get filter options with document counts ─────────────────────────
// When activeFilters is provided, counts are "cascading": documents are first
// narrowed by all OTHER active filter keys (AND), then counted per option value
// for the requested key.  This lets the user see how many results each option
// would yield given their current selections in other filters.

export function getOptionsWithCounts(
  key: string,
  activeFilters?: Record<string, string[]>
): { value: string; count: number }[] {
  const values = getUniqueValues(key);

  const otherFilters: Record<string, string[]> = {};
  if (activeFilters) {
    for (const [k, v] of Object.entries(activeFilters)) {
      if (k !== key && v?.length) {
        otherFilters[k] = v;
      }
    }
  }
  const baseDocs = DOCUMENTS.filter((doc) => matchesFilters(doc, otherFilters));

  return values.map((value) => {
    const count = baseDocs.filter((doc) => {
      const docValues = getFilterableValue(doc, key);
      return docValues.includes(value);
    }).length;
    return { value, count };
  });
}

// ─── Helper: Parse study period string ──────────────────────────────────────

function parseStudyPeriod(raw: string): { start?: string; end?: string } {
  if (!raw) return {};
  if (raw.includes(" / ")) {
    const [start, end] = raw.split(" / ").map((s) => s.trim());
    return { start, end };
  }
  return { start: raw };
}

// ─── Sample Documents (from real CSV data) ──────────────────────────────────

export const DOCUMENTS: EtnoDocument[] = [
  // ── 1. AT00016 — výskumná správa, rich metadata ──
  {
    id: "AT00016",
    title:
      "Spracovanie ľanu, konopí a vlny, textilný materiál, údaje o živote vo veľkej rodine a o liečení",
    keywords: ["výroba", "tkaniny", "výroba a úprava priadze"],
    language: "sk",
    authors: [{ name: "Kovačevičová, Soňa" }],
    researchers: [],
    originators: [],
    obec: "Horný Tisovník",
    okres: "Detva",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lat: 48.4333,
    lng: 19.55,
    studyPeriodStart: "1950-05-01",
    studyPeriodEnd: "1950-06-30",
    submissionDate: "1950",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "36",
    sizeType: "strany",
    format: "archívny lístok",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 2. AD017191 — diapozitív, image type, minimal metadata ──
  {
    id: "AD017191",
    title: "Drevorubači, Pribylina",
    keywords: ["drevorubači"],
    authors: [{ name: "Kovačevičová, Soňa" }],
    researchers: [],
    originators: [],
    obec: "Pribylina",
    castObce: "Pribylina",
    okres: "Liptovský Mikuláš",
    kraj: "Žilinský",
    stat: "Slovensko",
    lat: 49.0833,
    lng: 19.8,
    studyPeriodStart: "1973",
    submissionDate: "1973",
    documentType: "diapozitív",
    mediaType: "image",
    researchCollection: "Zbierka diapozitívov",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    note: "Osada Podbanské je miestnou časťou obce Pribylina",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 3. AK000054 — kresba, very sparse data ──
  {
    id: "AK000054",
    title: "Nôž, Brzotín",
    keywords: ["nôž"],
    authors: [{ name: "Dudychová, M." }],
    researchers: [],
    originators: [],
    obec: "Brzotín",
    okres: "Rožňava",
    kraj: "Košický",
    stat: "Slovensko",
    lat: 48.6333,
    lng: 20.5333,
    studyPeriodStart: "1958",
    submissionDate: "1958",
    documentType: "kresba",
    mediaType: "image",
    researchCollection: "Zbierka kresieb",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 4. AT00230 — dotazník, originators instead of authors ──
  {
    id: "AT00230",
    title:
      "Zvyky pri svadbe, pri predaji a kúpe, na prahu domu, ľudové poľovníctvo v obciach okresu Vranov nad Topľou",
    keywords: ["odev mužský"],
    language: "sk",
    authors: [],
    researchers: [],
    originators: [{ name: "učitelia ľudových škôl" }],
    obec: "Cabov",
    okres: "Vranov nad Topľou",
    kraj: "Prešovský",
    stat: "Slovensko",
    lat: 48.9,
    lng: 21.5833,
    studyPeriodStart: "1942",
    submissionDate: "1956",
    documentType: "dotazník",
    mediaType: "pdf",
    researchCollection: "Dotazníková akcia Matice Slovenskej",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "dotazníková akcia",
    acquisitionMethod: "depozit",
    size: "34",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis, rukopis, kresba, noty",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    note: "Materiál z dotazníkovej akcie, ktorú organizoval Národopisný odbor Matice slovenskej v roku 1942 - zapísali miestni učitelia ľudových škôl v rôznych lokalitách Slovenska",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 5. AT00288 — výskumná správa, multi-keyword ──
  {
    id: "AT00288",
    title:
      "Materiál zo súpisu poľnohospodárskeho náradia v Košickom, Prešovskom a Ružomberskom Múzeu",
    keywords: ["poľnohospodárstvo", "pluhy", "rádla", "múzejný materiál"],
    language: "sk",
    authors: [{ name: "Urbancová, Viera" }],
    researchers: [],
    originators: [],
    obec: "Košice",
    okres: "Košice",
    kraj: "Košický",
    stat: "Slovensko",
    lat: 48.7164,
    lng: 21.2611,
    studyPeriodStart: "1955",
    submissionDate: "1957",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "25",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 6. AT00936 — výskumná správa, short title ──
  {
    id: "AT00936",
    title: "Odev",
    keywords: ["odev mužský"],
    language: "sk",
    authors: [{ name: "Mjartan, Ján" }],
    researchers: [],
    originators: [],
    obec: "Dolná Súča",
    okres: "Trenčín",
    kraj: "Trenčianský",
    stat: "Slovensko",
    lat: 48.9667,
    lng: 18.0167,
    studyPeriodStart: "1950",
    submissionDate: "1980",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "8",
    sizeType: "strany",
    format: "A4",
    notation: "rukopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 7. AT01392 — výskumná správa, no obec (only region "Ponitrie") ──
  {
    id: "AT01392",
    title: "Výtvarná kultúra",
    keywords: ["výtvarné umenie", "výtvarná kultúra"],
    language: "sk",
    authors: [{ name: "Danglová, Oľga" }],
    researchers: [],
    originators: [],
    stat: "Slovensko",
    lokalita: "Ponitrie",
    studyPeriodStart: "1994",
    submissionDate: "1995",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "10",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: false, // no specific municipality, no coordinates
  },

  // ── 8. AT00642 — výskumná správa, Poľsko (foreign country!) ──
  {
    id: "AT00642",
    title:
      "Materiál z individuálneho výskumu s rôznorodou tematikou z Poľska",
    keywords: [
      "poľnohospodárstvo",
      "výroba",
      "zamestnanie obyvateľstva",
      "vedomosti a viera",
      "strava",
      "staviteľstvo",
      "spoločenské vzťahy",
    ],
    language: "sk",
    authors: [{ name: "Pranda, Adam" }],
    researchers: [],
    originators: [],
    obec: "Białowieża",
    stat: "Poľsko",
    lat: 52.6994,
    lng: 23.8367,
    studyPeriodStart: "1964",
    submissionDate: "1969",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "46",
    sizeType: "strany",
    format: "archívny lístok",
    notation: "strojopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 9. AT01408 — výskumná správa, with ORCID, rich metadata ──
  {
    id: "AT01408",
    title: "Mestskí vinohradníci 1. pol. 20 stor. z archívu",
    keywords: ["vinohradníctvo", "vinohradníci", "mesto"],
    language: "sk",
    authors: [
      {
        name: "Popelková, Katarína",
        orcid: "https://orcid.org/0000-0002-8163-4800",
      },
    ],
    researchers: [],
    originators: [],
    obec: "Modra",
    okres: "Pezinok",
    kraj: "Bratislavská",
    stat: "Slovensko",
    lat: 48.3333,
    lng: 17.3,
    studyPeriodStart: "1997-03-01",
    studyPeriodEnd: "1997-04-30",
    submissionDate: "2000",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "archívny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "113",
    sizeType: "strany",
    format: "elektronický text",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 10. RELIROMA video — videonahrávka, with abstract, restricted access ──
  {
    id: "RELIROMA-V001",
    title:
      'Osobné svedectvo laického kazateľa spoločenstva Kresťanská misia Immanuel Spišská Nová Ves',
    subtitle:
      "Materiál z výskumu religiozity, spirituality a non-religiozity medzi Rómami na Slovensku",
    abstract:
      'Demonštrácia odrábacieho úkonu "Z očí"; výroba tzv. "uhľovej vody", do ktorej sa postupne odpaľuje 9 zápaliek, resp. odpálených hlavičiek, koľko klesne ku dnu, toľko ľudí človeka "urieklo".',
    keywords: [
      "mágia",
      "uhľová voda",
      "ľudová viera",
      "urečenie",
      "urieknutie z oči",
      "odrábanie",
    ],
    authors: [
      {
        name: "Zachar Podolinská, Tatiana",
        orcid: "https://orcid.org/0000-0001-6164-5740",
      },
    ],
    researchers: [],
    originators: [],
    obec: "Markušovce",
    okres: "Spišská Nová Ves",
    kraj: "Košický",
    stat: "Slovensko",
    lokalita: "Jareček - rómska osada",
    lat: 48.9333,
    lng: 20.5667,
    studyPeriodStart: "2024-07-13",
    submissionDate: "2024-11-24",
    documentType: "videonahrávka",
    mediaType: "video",
    researchCollection: "RELIROMA",
    project:
      "Výskum religiozity, spirituality a non-religiozity medzi Rómami na Slovensku (APVV–22–0389)",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "02:39",
    sizeType: "čas",
    accessRight: "obmedzený prístup",
    license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    note: "Po skončení projektu otvorený prístup",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 11. RELIROMA photo — fotografia, with abstract, restricted access ──
  {
    id: "RELIROMA-F001",
    title:
      "Interiér rómskeho obydlia laického kazateľa spoločenstva Kresťanská misia Immanuel Spišská Nová Ves",
    subtitle:
      "Materiál z výskumu religiozity, spirituality a non-religiozity medzi Rómami na Slovensku",
    abstract:
      'Vizuálne upravené obydlie v duchu protestantského učenia spoločenstva Kresťanská misia Immanuel Spišská Nová Ves. V interiéri sa nenachádzajú žiadne "sväté obrazy", podobizne Márie, Ježiša alebo Svätej rodiny, ani na zvyčajných "nástenkách", kde sa kombinujú "sväté obrázky" s fotografiami rodinných príslušníkov z dôvodu apotropajnej ochrany.',
    keywords: [
      "ikonoborectvo",
      "domáca zbožnosť",
      "domáce nástenky",
      "Kresťanská misia Immanuel Spišská Nová Ves",
      "interiér rómskeho obydlia",
    ],
    authors: [
      {
        name: "Zachar Podolinská, Tatiana",
        orcid: "https://orcid.org/0000-0001-6164-5740",
      },
    ],
    researchers: [],
    originators: [],
    obec: "Markušovce",
    okres: "Spišská Nová Ves",
    kraj: "Košický",
    stat: "Slovensko",
    lokalita: "Jareček - rómska osada",
    lat: 48.9333,
    lng: 20.5667,
    studyPeriodStart: "2024-07-13",
    submissionDate: "2024-11-24",
    documentType: "fotografia",
    mediaType: "image",
    researchCollection: "RELIROMA",
    project:
      "Výskum religiozity, spirituality a non-religiozity medzi Rómami na Slovensku (APVV–22–0389)",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "obmedzený prístup",
    license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    note: "Po skončení projektu otvorený prístup",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 12. AT00001 — výskumná správa, no obec, vanished village ──
  {
    id: "AT00001",
    title: "Opis jednotlivých častí mužského a ženského odevu",
    keywords: ["odev žien", "odevné súčiastky"],
    language: "sk",
    authors: [{ name: "Kovačevičová, Soňa" }],
    researchers: [],
    originators: [],
    okres: "Zvolen",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lokalita: "Lešť - zaniknutá obec (1951)",
    studyPeriodStart: undefined,
    submissionDate: "1950",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "49",
    sizeType: "strany",
    format: "archívny lístok",
    notation: "strojopis, rukopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: false, // vanished village, no coordinates
  },

  // ── 13. AT01443 — výskumná správa, 2004 (most recent pre-RELIROMA) ──
  {
    id: "AT01443",
    title: "Aktivizácia vidieka na Slovensku po roku 1989",
    keywords: [
      "pomocné vedné disciplíny",
      "zamestnanie obyvateľstva",
      "spoločenské vzťahy",
      "život obce",
      "historické pramene",
      "všeobecné údaje o obci",
    ],
    language: "sk",
    authors: [{ name: "Falťanová, Ľubica" }],
    researchers: [],
    originators: [],
    obec: "Veľká Ves",
    okres: "Poltár",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lat: 48.4167,
    lng: 19.8,
    studyPeriodStart: "2004",
    submissionDate: "2005",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "14",
    sizeType: "strany",
    format: "A4",
    notation: "tlač",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 14. Placeholder audio record (no real audio in CSV) ──
  {
    id: "AU00001",
    title: "Rozhovor o tradičnom liečiteľstve",
    keywords: ["ľudové liečiteľstvo", "tradičná medicína", "byliny"],
    language: "sk",
    authors: [{ name: "Zachar Podolinská, Tatiana" }],
    researchers: [],
    originators: [],
    obec: "Markušovce",
    okres: "Spišská Nová Ves",
    kraj: "Košický",
    stat: "Slovensko",
    lokalita: "Jareček - rómska osada",
    lat: 48.9333,
    lng: 20.5667,
    studyPeriodStart: "2024-07-14",
    submissionDate: "2024-11-24",
    documentType: "audionahrávka",
    mediaType: "audio",
    researchCollection: "RELIROMA",
    project:
      "Výskum religiozity, spirituality a non-religiozity medzi Rómami na Slovensku (APVV–22–0389)",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    institutionRor: "https://ror.org/01y3dn551",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "01:33",
    sizeType: "čas",
    accessRight: "obmedzený prístup",
    license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    note: "Po skončení projektu otvorený prístup",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 15. AT00102 — výskumná správa, Liptov ──
  {
    id: "AT00102",
    title: "Pastierstvo a salašníctvo v oblasti Liptova",
    keywords: ["pastierstvo", "salašníctvo", "ovce", "bryndza"],
    language: "sk",
    authors: [{ name: "Podolák, Ján" }],
    researchers: [],
    originators: [],
    obec: "Liptovský Hrádok",
    okres: "Liptovský Mikuláš",
    kraj: "Žilinský",
    stat: "Slovensko",
    lat: 49.0397,
    lng: 19.7242,
    studyPeriodStart: "1956",
    submissionDate: "1958",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "52",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 16. AF00031 — fotografia, Orava ──
  {
    id: "AF00031",
    title: "Drevorubači pri práci, Oravská Lesná",
    keywords: ["drevorubači", "lesné hospodárstvo", "práca"],
    language: "sk",
    authors: [{ name: "Húščava, Alexander" }],
    researchers: [],
    originators: [],
    obec: "Oravská Lesná",
    okres: "Námestovo",
    kraj: "Žilinský",
    stat: "Slovensko",
    lat: 49.3667,
    lng: 19.1833,
    studyPeriodStart: "1961",
    submissionDate: "1962",
    documentType: "fotografia",
    mediaType: "image",
    researchCollection: "Zbierka fotografií",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 17. AT00445 — výskumná správa, Šariš ──
  {
    id: "AT00445",
    title: "Ľudové staviteľstvo a bývanie na Šariši",
    keywords: ["staviteľstvo", "bývanie", "drevenice", "architektúra"],
    language: "sk",
    authors: [{ name: "Mešša, Michal" }],
    researchers: [],
    originators: [],
    obec: "Bardejov",
    okres: "Bardejov",
    kraj: "Prešovský",
    stat: "Slovensko",
    lat: 49.2921,
    lng: 21.2765,
    studyPeriodStart: "1962",
    submissionDate: "1964",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "38",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 18. AV00012 — videonahrávka, Gemer ──
  {
    id: "AV00012",
    title: "Tradičná svadba v obci Rejdová, Gemer",
    keywords: ["svadba", "svadobné zvyky", "ľudové piesne", "tanec"],
    language: "sk",
    authors: [{ name: "Leščák, Milan" }],
    researchers: [],
    originators: [],
    obec: "Rejdová",
    okres: "Rožňava",
    kraj: "Košický",
    stat: "Slovensko",
    lat: 48.7333,
    lng: 20.2167,
    studyPeriodStart: "1978",
    submissionDate: "1980",
    documentType: "videonahrávka",
    mediaType: "video",
    researchCollection: "Zbierka videonahrávok",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "45:20",
    sizeType: "čas",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 19. AT00567 — výskumná správa, Záhorie ──
  {
    id: "AT00567",
    title: "Vinohradníctvo a vinárstvo na Záhorí",
    keywords: ["vinohradníctvo", "vinárstvo", "vinobranie"],
    language: "sk",
    authors: [{ name: "Húsek, Jan" }],
    researchers: [],
    originators: [],
    obec: "Skalica",
    okres: "Skalica",
    kraj: "Trnavský",
    stat: "Slovensko",
    lat: 48.8453,
    lng: 17.2264,
    studyPeriodStart: "1958",
    submissionDate: "1960",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "29",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 20. AF00087 — fotografia, Detva ──
  {
    id: "AF00087",
    title: "Fujara — výroba a hra na fujaru, Detva",
    keywords: ["fujara", "hudobné nástroje", "ľudová hudba", "výroba"],
    language: "sk",
    authors: [{ name: "Elschek, Oskár" }],
    researchers: [],
    originators: [],
    obec: "Detva",
    okres: "Detva",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lat: 48.5575,
    lng: 19.4214,
    studyPeriodStart: "1965",
    submissionDate: "1966",
    documentType: "fotografia",
    mediaType: "image",
    researchCollection: "Zbierka fotografií",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 21. AT00780 — dotazník, Turiec ──
  {
    id: "AT00780",
    title: "Zvyky pri narodení dieťaťa a krstinách v Turci",
    keywords: ["narodenie", "krstiny", "zvyky", "rodina"],
    language: "sk",
    authors: [],
    researchers: [],
    originators: [{ name: "učitelia ľudových škôl" }],
    obec: "Martin",
    okres: "Martin",
    kraj: "Žilinský",
    stat: "Slovensko",
    lat: 49.0636,
    lng: 18.9214,
    studyPeriodStart: "1942",
    submissionDate: "1956",
    documentType: "dotazník",
    mediaType: "pdf",
    researchCollection: "Dotazníková akcia Matice Slovenskej",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "dotazníková akcia",
    acquisitionMethod: "depozit",
    size: "22",
    sizeType: "strany",
    format: "A4",
    notation: "rukopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 22. AK000112 — kresba, Podpoľanie ──
  {
    id: "AK000112",
    title: "Pluh s kolieskami, Hriňová",
    keywords: ["pluh", "poľnohospodárstvo", "rádla"],
    language: "sk",
    authors: [{ name: "Kramárová, Elena" }],
    researchers: [],
    originators: [],
    obec: "Hriňová",
    okres: "Detva",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lat: 48.5833,
    lng: 19.5167,
    studyPeriodStart: "1960",
    submissionDate: "1961",
    documentType: "kresba",
    mediaType: "image",
    researchCollection: "Zbierka kresieb",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 23. AT00899 — výskumná správa, Spiš ──
  {
    id: "AT00899",
    title: "Vianočné a novoročné zvyky na Spiši",
    keywords: ["Vianoce", "Nový rok", "zvyky", "koledovanie"],
    language: "sk",
    authors: [{ name: "Horváthová, Emília" }],
    researchers: [],
    originators: [],
    obec: "Levoča",
    okres: "Levoča",
    kraj: "Prešovský",
    stat: "Slovensko",
    lat: 49.0236,
    lng: 20.5903,
    studyPeriodStart: "1968",
    submissionDate: "1970",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "31",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 24. AU00015 — audionahrávka, Myjavské kopanice ──
  {
    id: "AU00015",
    title: "Rozprávanie o živote na kopaniciach",
    keywords: ["kopanice", "život na kopaniciach", "poľnohospodárstvo"],
    language: "sk",
    authors: [{ name: "Botík, Ján" }],
    researchers: [],
    originators: [],
    obec: "Myjava",
    okres: "Myjava",
    kraj: "Trenčianský",
    stat: "Slovensko",
    lat: 48.7556,
    lng: 17.5678,
    studyPeriodStart: "1975",
    submissionDate: "1976",
    documentType: "audionahrávka",
    mediaType: "audio",
    researchCollection: "Zbierka audionahrávok",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "22:45",
    sizeType: "čas",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 25. AD017250 — diapozitív, Čičmany ──
  {
    id: "AD017250",
    title: "Ornamentálna výzdoba dreveníc, Čičmany",
    keywords: ["ornament", "výzdoba", "drevenice", "architektúra"],
    language: "sk",
    authors: [{ name: "Kovačevičová, Soňa" }],
    researchers: [],
    originators: [],
    obec: "Čičmany",
    okres: "Žilina",
    kraj: "Žilinský",
    stat: "Slovensko",
    lat: 48.9500,
    lng: 18.5000,
    studyPeriodStart: "1970",
    submissionDate: "1971",
    documentType: "diapozitív",
    mediaType: "image",
    researchCollection: "Zbierka diapozitívov",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 26. AT01050 — výskumná správa, Zemplín ──
  {
    id: "AT01050",
    title: "Poľnohospodárske náradie a spôsoby obrábania pôdy v Zemplíne",
    keywords: ["poľnohospodárstvo", "pluhy", "obrábanie pôdy"],
    language: "sk",
    authors: [{ name: "Markuš, Michal" }],
    researchers: [],
    originators: [],
    obec: "Michalovce",
    okres: "Michalovce",
    kraj: "Košický",
    stat: "Slovensko",
    lat: 48.7544,
    lng: 21.9181,
    studyPeriodStart: "1963",
    submissionDate: "1965",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "41",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis, kresba",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 27. AF00150 — fotografia, Čierny Hron ──
  {
    id: "AF00150",
    title: "Uhliarstvo v doline Čierneho Hrona",
    keywords: ["uhliarstvo", "les", "výroba uhlia", "remeslá"],
    language: "sk",
    authors: [{ name: "Urbancová, Viera" }],
    researchers: [],
    originators: [],
    obec: "Čierny Balog",
    okres: "Brezno",
    kraj: "Banskobystrický",
    stat: "Slovensko",
    lat: 48.7500,
    lng: 19.6500,
    studyPeriodStart: "1959",
    submissionDate: "1960",
    documentType: "fotografia",
    mediaType: "image",
    researchCollection: "Zbierka fotografií",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: false,
    hasMap: true,
  },

  // ── 28. AT01200 — výskumná správa, Maďarsko ──
  {
    id: "AT01200",
    title: "Materiál z výskumu slovenských osídlení v Maďarsku",
    keywords: ["slovenská menšina", "osídlenie", "migrácia", "identita"],
    language: "sk",
    authors: [{ name: "Botík, Ján" }],
    researchers: [],
    originators: [],
    obec: "Békešská Čaba",
    stat: "Maďarsko",
    lat: 46.6833,
    lng: 21.0833,
    studyPeriodStart: "1985",
    submissionDate: "1987",
    documentType: "výskumná správa",
    mediaType: "pdf",
    researchCollection: "Zbierka výskumných správ",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "67",
    sizeType: "strany",
    format: "A4",
    notation: "strojopis",
    accessRight: "otvorený prístup",
    license: "CC BY-NC",
    hasTranscript: true,
    hasMap: true,
  },

  // ── 29. AV00035 — videonahrávka, Veľká noc ──
  {
    id: "AV00035",
    title: "Veľkonočné zvyky a šibačka v obci Vlčnov",
    keywords: ["Veľká noc", "šibačka", "oblievačka", "zvyky"],
    language: "sk",
    authors: [{ name: "Leščák, Milan" }],
    researchers: [],
    originators: [],
    obec: "Vlčnov",
    stat: "Česko",
    lat: 49.0000,
    lng: 17.5833,
    studyPeriodStart: "1982",
    submissionDate: "1983",
    documentType: "videonahrávka",
    mediaType: "video",
    researchCollection: "Zbierka videonahrávok",
    institution: "Ústav etnológie a sociálnej antropológie SAV, v. v. i.",
    collectionMethod: "terénny výskum",
    acquisitionMethod: "zamestnanecké dielo",
    size: "28:15",
    sizeType: "čas",
    accessRight: "otvorený prístup",
    license: "CC BY-NC-SA",
    hasTranscript: true,
    hasMap: true,
  },
];

export function getDocumentById(id: string): EtnoDocument | undefined {
  return DOCUMENTS.find((d) => d.id === id);
}

/** Five documents for review: single image, multi image, audio, video, pdf */
const REVIEW_DOCUMENT_IDS = [
  "AD017191",      // single image (diapozitív)
  "RELIROMA-F001", // multi image (fotografia, hasTranscript)
  "AU00001",       // audio
  "RELIROMA-V001", // video
  "AT00016",       // pdf
]

export function getReviewDocuments(): EtnoDocument[] {
  return REVIEW_DOCUMENT_IDS
    .map((id) => DOCUMENTS.find((d) => d.id === id))
    .filter((d): d is EtnoDocument => d != null)
}

// ─── Map cluster utilities (simplified from Archeo) ─────────────────────────

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  documentType: DocumentType;
}

export function getMapPins(documents: EtnoDocument[]): MapPin[] {
  return documents
    .filter((d) => d.lat != null && d.lng != null)
    .map((d) => ({
      id: d.id,
      lat: d.lat!,
      lng: d.lng!,
      title: d.title,
      documentType: d.documentType,
    }));
}

// ─── Metadata display configuration ─────────────────────────────────────────
// Defines which fields show in the detail page metadata table, in order

export interface MetadataField {
  key: string;
  label: string;
  getValue: (doc: EtnoDocument) => string | undefined;
  isLink?: boolean; // renders as blue clickable filter link
  filterKey?: string; // which filter key to use for cross-reference
}

export interface MetadataSection {
  title: string;
  fields: MetadataField[];
}

export const METADATA_SECTIONS: MetadataSection[] = [
  {
    title: "TEMATICKÉ A AUTORSKÉ ÚDAJE",
    fields: [
      {
        key: "authors",
        label: "Autor",
        getValue: (d) => d.authors?.length ? d.authors.map((a) => a.name).join(", ") : undefined,
        isLink: true,
        filterKey: "author",
      },
      {
        key: "researchers",
        label: "Výskumník",
        getValue: (d) => d.researchers?.length ? d.researchers.map((a) => a.name).join(", ") : undefined,
      },
      {
        key: "originators",
        label: "Pôvodca",
        getValue: (d) => d.originators?.length ? d.originators.map((a) => a.name).join(", ") : undefined,
      },
      { key: "doi", label: "DOI", getValue: (d) => d.doi },
    ],
  },
  {
    title: "GEOGRAFICKÉ ÚDAJE",
    fields: [
      { key: "obec", label: "Obec", getValue: (d) => d.obec, isLink: true, filterKey: "obec" },
      { key: "castObce", label: "Časť obce", getValue: (d) => d.castObce },
      { key: "okres", label: "Okres", getValue: (d) => d.okres, isLink: true, filterKey: "okres" },
      { key: "kraj", label: "Kraj", getValue: (d) => d.kraj, isLink: true, filterKey: "kraj" },
      { key: "stat", label: "Štát", getValue: (d) => d.stat, isLink: true, filterKey: "stat" },
      { key: "lokalita", label: "Lokalita", getValue: (d) => d.lokalita },
    ],
  },
  {
    title: "FORMÁLNE ÚDAJE",
    fields: [
      {
        key: "documentType",
        label: "Typ dokumentu",
        getValue: (d) => d.documentType,
        isLink: true,
        filterKey: "documentType",
      },
      {
        key: "studyPeriod",
        label: "Čas realizácie",
        getValue: (d) => {
          if (!d.studyPeriodStart) return undefined;
          if (d.studyPeriodEnd) return `${d.studyPeriodStart} – ${d.studyPeriodEnd}`;
          return d.studyPeriodStart;
        },
      },
      { key: "submissionDate", label: "Dátum odovzdania", getValue: (d) => d.submissionDate },
      {
        key: "collectionMethod",
        label: "Spôsob zberu",
        getValue: (d) => d.collectionMethod,
        isLink: true,
        filterKey: "collectionMethod",
      },
      { key: "acquisitionMethod", label: "Spôsob nadobudnutia", getValue: (d) => d.acquisitionMethod },
      {
        key: "size",
        label: "Veľkosť",
        getValue: (d) => {
          if (!d.size) return undefined;
          if (d.sizeType) return `${d.size} ${d.sizeType}`;
          return d.size;
        },
      },
      { key: "format", label: "Formát", getValue: (d) => d.format },
      { key: "notation", label: "Zápis", getValue: (d) => d.notation },
      { key: "language", label: "Jazyk", getValue: (d) => d.language },
    ],
  },
  {
    title: "ADMINISTRATÍVNE ÚDAJE",
    fields: [
      { key: "project", label: "Projekt", getValue: (d) => d.project },
      {
        key: "researchCollection",
        label: "Výskumná zbierka",
        getValue: (d) => d.researchCollection,
        isLink: true,
        filterKey: "researchCollection",
      },
      { key: "institution", label: "Inštitúcia", getValue: (d) => d.institution },
      {
        key: "institutionRor",
        label: "ROR",
        getValue: (d) => d.institutionRor,
        isLink: true,
      },
      { key: "accessRight", label: "Prístup", getValue: (d) => d.accessRight },
      {
        key: "license",
        label: "Licencia",
        getValue: (d) => {
          if (d.license.includes("by-nc-nd")) return "CC BY-NC-ND 4.0";
          if (d.license.includes("by-nc-sa")) return "CC BY-NC-SA";
          return d.license;
        },
        isLink: true,
      },
    ],
  },
];
