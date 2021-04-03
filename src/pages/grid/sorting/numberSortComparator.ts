import { code } from 'src/components'

export const numberSortComparator = code`
  const { columns, sortedColumns, updateColumns } = useColumns<YourDataShape>(() => [
    {
      // ...
      sortComparator: 'number'
    }
  ])
`
