import { code } from 'src/components'

export const basicRequiredSetup = code`
  interface Market {
    marketId: string | number,
    price: string
  }

  const { columns } = useColumns<Market>(() => [
    {
      key: 'marketId',
      headerNode: 'Pair',
      width: 200,
      pin: true,
      getValue: item => item.marketId,
      cellRenderer: marketId => (
        <Icon id={marketId}>{marketId}</Icon>
      )
    },
    {
      key: 'price',
      headerNode: <strong>Price</strong>,
      getValue: item => currencyFmt(item.price),
      width: 'minmax(200px, 1fr)'
    }
  ]);

  const data: Market[] = [
    {
      marketId: 'BTC-USD',
      price: 49020.7
    },
    {
      marketId: 'ETH-GBP',
      price: 1102.0038
    }
  ]

  return <Grid<Market> columns={columns} data={data} getRowId={item => item.marketId} />
`
