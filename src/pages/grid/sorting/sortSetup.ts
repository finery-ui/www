import { code } from 'src/components'

export const sortSetup = code`
  const { columns, sortedColumns, updateColumns } = useColumns<YourDataShape>(/*..*/)

  const sortedData = useMemo<YourDataShape[]>(() => someSortFunc(sortedColumns, data), [sortedColumns, data])

  return (
    <Grid<YourDataShape>
      columns={columns}
      data={sortedData}
      getRowId={item => item.id}
      onColumnsChange={updateColumns}
    />
  )
`
