import {createClient} from '@sanity/client'
import translatePage from './translatePage'
// import OpenAI from 'openai'
// import dotenv from 'dotenv'

// dotenv.config() // loads .env.local for API keys

// -------------------------
// Sanity client
// -------------------------
const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'development',
  useCdn: false,
  apiVersion: '2026-01-18',
  token: process.env.SANITY_API_TOKEN, // must have write access if creating
})

// -------------------------
// OpenAI client
// -------------------------
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// async function translateText(text: string) {
//   if (!text) return ''
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4o-mini', // cheap & good for translation
//     messages: [
//       { role: 'system', content: 'Translate text from German to English.' },
//       { role: 'user', content: text },
//     ],
//     temperature: 0,
//   })

//   return response.choices[0].message?.content ?? text
// }

// -------------------------
// Fetch one page
// -------------------------
async function getSinglePage() {
  const page = await sanityClient.fetch(
    `*[_type == "page" && _id == "6505c039-3d45-4a81-9964-0b865c4c5413"][0]`,
  )
  if (!page) throw new Error('No German page found')
  return page
}

// -------------------------
// Optional: translate content blocks
// -------------------------
// async function translateContentBlocks(blocks: any[]) {
//   return await Promise.all(
//     blocks.map(async (block: any) => {
//       if (block._type === 'block' && block.children) {
//         return {
//           ...block,
//           children: await Promise.all(
//             block.children.map(async (child: any) => ({
//               ...child,
//               text: await translateText(child.text),
//             }))
//           ),
//         }
//       }
//       return block
//     })
//   )
// }

// -------------------------
// Main test function
// -------------------------
async function testTranslation() {
  const page = await getSinglePage()

  const translatedPage = await translatePage(page)

  // -------------------------
  // Optional: insert translated page into Sanity
  // -------------------------
  const createInSanity = true // change to false if you just want to test
  if (createInSanity) {
    const newDoc = {
      ...translatedPage,
      _id: page._id + '-en',
      language: 'en',
      // title: translatedTitle,
      // description: translatedDescription,
      // content: translatedContent,
    }
    await sanityClient.create(newDoc)
    console.log('\nTranslated page created in Sanity with _id:', newDoc._id)
  }
}

testTranslation()
  .then(() => console.log('\n✅ Done'))
  .catch((err) => console.error(err))
