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

export function getOptionsWithCounts(
  key: string
): { value: string; count: number }[] {
  const values = getUniqueValues(key);
  return values.map((value) => {
    const count = DOCUMENTS.filter((doc) => {
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
    hasTranscript: false,
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
];

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
    title: "GEOGRAFICKÉ ÚDAJE",
    fields: [
      { key: "obec", label: "Obec", getValue: (d) => d.obec, isLink: true, filterKey: "obec" },
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
      {
        key: "collectionMethod",
        label: "Spôsob zberu",
        getValue: (d) => d.collectionMethod,
        isLink: true,
        filterKey: "collectionMethod",
      },
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
      { key: "accessRight", label: "Prístup", getValue: (d) => d.accessRight },
      {
        key: "license",
        label: "Licencia",
        getValue: (d) => {
          // Shorten full URLs to readable labels
          if (d.license.includes("by-nc-nd")) return "CC BY-NC-ND 4.0";
          if (d.license.includes("by-nc-sa")) return "CC BY-NC-SA";
          return d.license;
        },
        isLink: true,
      },
    ],
  },
];
