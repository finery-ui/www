import { code } from 'src/components'

export const getRowDetailsSnippet = code`
  function getRowDetails(item: YourDataShape) {
    if (expandState[item.id]) {
      return <div>{item.details}</div>
    }
  }

  return (
    <Grid<YourDataShape>
      columns={columns}
      data={data}
      getRowId={item => item.id}
      getRowDetails={getRowDetails}
    />
  )
`
