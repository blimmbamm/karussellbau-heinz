import translateText from './translateText'

const ANCHOR_LABEL_RENAMES: Record<string, string> = {
  Beschreibung: 'Description',
  Bilder: 'Images',
  'Technische Daten': 'Technical data',
  Details: 'Details',
}

export default async function translatePortableTextBlock(block: any) {
  return {
    ...block,
    children: await Promise.all(
      (block.children || []).map(async (child: any) => ({
        ...child,
        text: await translateText(child.text),
      })),
    ),
    markDefs: await Promise.all(
      (block.markDefs || []).map(async (mark: any) => {
        if (mark._type === 'anchor' && mark.label) {
          return {
            ...mark,
            // label: await translateText(mark.label),
            label: ANCHOR_LABEL_RENAMES[mark.label],
          }
        }
        return mark
      }),
    ),
  }
}
