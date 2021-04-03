import { code } from 'src/components'

export const getRowChildrenSnippet = code`
  function getRowDetails(item: YourDataShape) {
    if (expandState[item.id]) {
      return item.children
    }
  }

  return (
    <Grid<YourDataShape>
      columns={columns}
      data={data}
      getRowId={item => item.id}
      getRowChildren={getRowChildren}
    />
  )
`
