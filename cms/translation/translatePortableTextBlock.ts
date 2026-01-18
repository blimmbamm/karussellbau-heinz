import translateText from './translateText'

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
            label: await translateText(mark.label),
          }
        }
        return mark
      }),
    ),
  }
}
