import type { EtnoItem } from '@/data/mockData'

export type ItemSortKey = 'id' | 'title' | 'studyPeriodStart'
export type ItemSortOrder = 'asc' | 'desc'

export function participantLines(
  item: Pick<EtnoItem, 'authors' | 'researchers' | 'originators'>
): { label: string; names: string }[] {
  const out: { label: string; names: string }[] = []
  if (item.authors?.length) {
    out.push({ label: 'Autor:', names: item.authors.map((a) => a.name).join(', ') })
  }
  if (item.researchers?.length) {
    out.push({ label: 'Výskumník:', names: item.researchers.map((a) => a.name).join(', ') })
  }
  if (item.originators?.length) {
    out.push({ label: 'Pôvodca:', names: item.originators.map((a) => a.name).join(', ') })
  }
  return out
}

export function sortEtnoItems(
  items: EtnoItem[],
  key: ItemSortKey,
  order: ItemSortOrder
): EtnoItem[] {
  return [...items].sort((a, b) => {
    let aVal = ''
    let bVal = ''

    if (key === 'id') {
      aVal = a.id
      bVal = b.id
    } else if (key === 'title') {
      aVal = a.title
      bVal = b.title
    } else {
      aVal = a.studyPeriodStart ?? ''
      bVal = b.studyPeriodStart ?? ''
    }

    const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
    return order === 'asc' ? cmp : -cmp
  })
}

export function searchResultCountLabel(count: number): string {
  if (count === 1) return '1 výsledok vyhľadávania'
  if (count >= 2 && count <= 4) return `${count} výsledky vyhľadávania`
  return `${count} výsledkov vyhľadávania`
}
