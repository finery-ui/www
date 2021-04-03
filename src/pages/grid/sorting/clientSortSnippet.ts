import { code } from 'src/components'

export const clientSortSnippet = code`
  const sortedData = useMemo<YourDataShape[]>(() => clientSort(sortedColumns, data), [sortedColumns, data])
`
