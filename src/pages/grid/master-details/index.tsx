import { useState } from 'react'
import Head from 'next/head'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { Grid, Button, useColumns } from '@finery/core'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard } from 'src/components'

import { getRowDetailsSnippet } from './getRowDetailsSnippet'

interface Market {
  id: string
  desc: string
  details: string
}

const data: Market[] = [
  {
    id: 'Bitch plz',
    desc: 'Pleasing bitch',
    details: 'Wow am I child?',
  },
  {
    id: 'Say no to choco powder',
    desc: 'Its not very good in cakes',
    details: 'I am the choco devil!',
  },
]

export default function GridMasterDetailsPage() {
  const [expandState, setExpandState] = useState<Record<string, boolean>>({})

  const { columns } = useColumns<Market>(
    () => [
      {
        key: 'expand',
        headerNode: 'Details',
        pin: true,
        width: 80,
        align: 'center',
        cellRenderer: (market: Market) => {
          if (expandState[market.id]) {
            return (
              <Button
                emphasis="ghost"
                size="compact"
                title="Hide details"
                onClick={() => setExpandState(s => ({ ...s, [market.id]: false }))}
              >
                <AiOutlineDown />
              </Button>
            )
          }
          return (
            <Button
              emphasis="ghost"
              size="compact"
              title="Show details"
              onClick={() => setExpandState(s => ({ ...s, [market.id]: true }))}
            >
              <AiOutlineRight />
            </Button>
          )
        },
      },
      {
        key: 'id',
        headerNode: 'ID',
        getValue: item => item.id,
      },
      {
        key: 'desc',
        headerNode: 'Description',
        getValue: item => item.desc,
      },
    ],
    null,
    [expandState]
  )

  function getRowDetails(market: Market) {
    if (expandState[market.id]) {
      return <div>{market.details}</div>
    }
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid Master-details</title>
      </Head>

      <DemoCard
        title="Grid master-details"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        <Grid<Market>
          columns={columns}
          data={data}
          getRowId={item => item.id}
          getRowDetails={getRowDetails}
        />
      </DemoCard>

      <p>
        Detail rows stretch the full width of the grid and allow you to render anything below a
        particular row.
      </p>

      <p>
        To render a details row you should implement a <code>getRowDetails</code> function, which
        returns a <code>React.ReactNode</code> for rows you wish to render details for. In our
        examples we also introduce expansion state so that only expanded rows show their details.
      </p>

      <CodeHighlight code={getRowDetailsSnippet} />
    </DefaultLayout>
  )
}
