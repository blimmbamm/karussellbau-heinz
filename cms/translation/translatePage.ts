import translateBlockContent from './translateBlockContent'
import translateText from './translateText'

export default async function translatePage(page: any) {
  console.log('Original title:', page.title)
  console.log('Original description:', page.description)

  const translatedTitle = await translateText(page.title)
  const translatedDescription = await translateText(page.description)
  const translatedContent = await translateBlockContent(page.content || [])

  console.log('\nTranslated title:', translatedTitle)
  console.log('Translated description:', translatedDescription)

  return {
    ...page,
    title: translatedTitle,
    description: translatedDescription,
    content: translatedContent,
  }
}
