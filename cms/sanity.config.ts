import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table'
import {deployTool} from './plugins/deployTool'

export default defineConfig({
  name: 'default',
  title: 'cms',

  projectId: '6xgy4u6j',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), table(), deployTool()],

  schema: {
    types: schemaTypes,
  },
})
