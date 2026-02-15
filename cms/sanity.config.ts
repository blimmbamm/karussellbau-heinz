import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table'
import {deployTool} from './plugins/deployTool'

export default defineConfig({
  name: 'default',
  title: 'Karussellbau Heinz CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool(), visionTool(), table(), deployTool()],

  schema: {
    types: schemaTypes,
  },
})
