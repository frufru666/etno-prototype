// Mock content for Info page. Replace with CMS/admin content when available.
// Structured for: title, perex, sections (h2/h3/h4, body, images, links).

export interface InfoLink {
  label: string
  href: string
}

export interface InfoImage {
  src: string
  alt: string
}

export interface InfoSection {
  heading: string
  level: 2 | 3 | 4
  body?: string
  images?: InfoImage[]
  links?: InfoLink[]
}

export interface InfoContent {
  title: string
  perex: string
  sections: InfoSection[]
}

export const INFO_CONTENT: InfoContent = {
  title: 'O projekte Etno Explorer',
  perex:
    'Etno Explorer SAV je repozitár etnologických a sociálno-antropologických výskumných dát Ústavu etnológie a sociálnej antropológie SAV, v. v. i. Táto stránka obsahuje informačné, technické, právne a ďalšie materiály k používaniu repozitára.',

  sections: [
    {
      heading: 'Informácie o repozitári',
      level: 2,
      body:
        'Repozitár umožňuje prehliadať a vyhľadávať dokumenty z terénnych výskumov, archívne jednotky, fotografie, audionahrávky a videá. Dáta sú štrukturované podľa výskumných zbierok, kolekcií a dokumentov. Obsah je priebežne dopĺňaný a aktualizovaný.',
    },
    {
      heading: 'Technická dokumentácia',
      level: 2,
      body: 'Pre vývojárov a správcov sú k dispozícii technické špecifikácie a manuály.',
      links: [
        { label: 'API dokumentácia', href: 'https://example.com/api-docs' },
        { label: 'Manuál pre správcov', href: 'https://example.com/admin-manual' },
        { label: 'Štandardy metadát', href: 'https://example.com/metadata-standards' },
      ],
    },
    {
      heading: 'Štandardy a metadátový model',
      level: 3,
      body:
        'Repozitár používa jednotný metadátový model založený na doménových slovníkoch (typ dokumentu, geografia, kľúčové slová, účastníci). Metadáta sú v súlade s odporúčaniami DARIAH-SK a ESFRI infraštruktúr.',
    },
    {
      heading: 'Právne informácie',
      level: 2,
      body:
        'Všetky dokumenty v repozitári sú chránené autorským zákonom. Prístup k niektorým materiálom môže byť obmedzený; pre žiadosť o prístup kontaktujte ÚESA SAV. Licencie a podmienky použitia sú uvedené pri jednotlivých položkách.',
      links: [
        { label: 'Podmienky použitia', href: 'https://example.com/terms' },
        { label: 'Ochrana osobných údajov', href: 'https://example.com/privacy' },
      ],
    },
    {
      heading: 'Kontakt a podpora',
      level: 2,
      body:
        'Pre otázky k obsahu alebo technickej podpore kontaktujte Ústav etnológie a sociálnej antropológie SAV, v. v. i. Tento repozitár vznikol vďaka finančnej podpore ESFRI výskumných infraštruktúr Ministerstva školstva, výskumu, vývoja a mládeže SR a národného konzorcia DARIAH-SK. Realizátor: Off Grid lab.',
    },
  ],
}
