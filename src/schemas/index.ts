import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import project from './project'
import update from './update'
import user from './user'

export const schemaTypes = [post, blockContent, project, update, user]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, project, update, user],
}
