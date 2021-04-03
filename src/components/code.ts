import { stripIndent } from 'common-tags'

export const code = (strings: TemplateStringsArray, ...args: unknown[]) => {
  return stripIndent(strings, ...args)
}
