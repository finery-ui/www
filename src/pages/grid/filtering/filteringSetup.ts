import { code } from 'src/components'

export const filteringSetup = code`
  // Declare this outside your component (static).
  function TextFilter<T>({ state, setState }: GridFilterProps<T>) {
    return <Input type="text" value={state} onChange={e => setState(e.target.value)} />
  }

  const { columns, filteredColumns, updateColumns } = useColumns<YourDataShape>([
    {
      key: 'desc',
      headerNode: 'Description',
      getValue: item => item.desc,
      filterComponent: TextFilter,
      filterComparator: createStringFilter()
    },
    // ...
  ])

  // Filter the data on the client or server in whatever way suits you.
  const filteredData = useMemo<YourDataShape[]>(() => clientFilter(filteredColumns, data), [
    filteredColumns,
    data,
  ])

  return (
    <Grid<YourDataShape>
      columns={columns}
      data={filteredData}
      getRowId={item => item.id}
      onColumnsChange={updateColumns}
    />
  )
`
