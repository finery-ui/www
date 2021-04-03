import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { Grid, Button, useColumns } from '@finery/components'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard } from 'src/components'

import { getRowChildrenSnippet } from './getRowChildrenSnippet'

interface Market {
  id: string
  desc: string
  children?: Market[]
}

const data: Market[] = [
  {
    id: 'Bitch plz',
    desc: 'Pleasing bitch',
    children: [
      {
        id: 'child1',
        desc: 'Wow very good grades',
      },
      {
        id: 'child2',
        desc: 'Can i have a refund plz?',
      },
    ],
  },
  {
    id: 'Say no to choco powder',
    desc: 'Its not very good in cakes',
    children: [
      {
        id: 'maltesers',
        desc: 'Not really child of choco powder',
      },
      {
        id: 'ovomaltine',
        desc: 'Superior brown powder for adults',
      },
    ],
  },
]

export default function GridRowChildrenPage() {
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
          if (!market.children?.length) {
            return null
          }

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

  function getRowChildren(market: Market) {
    if (expandState[market.id] && market.children) {
      return market.children
    }
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid Row Children</title>
      </Head>

      <DemoCard
        title="Grid row children"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        <Grid<Market>
          columns={columns}
          data={data}
          getRowId={item => item.id}
          getRowChildren={getRowChildren}
        />
      </DemoCard>
      <p>
        Child rows can express hierarchical relationships between data. Unlike{' '}
        <Link href="/grid/master-details">
          <a>master-detail</a>
        </Link>{' '}
        rows the children have the same columns as the parent and there can be many with recursive
        nesting.
      </p>

      <p>
        To render a child row you should implement a <code>getRowChildren</code> function, which
        returns an array of more items which rows are generated for.
      </p>

      <CodeHighlight code={getRowChildrenSnippet} />

      <p>
        Note that the signature of <code>cellRenderer</code> is{' '}
        <code>{`(value: any, item: T, depth: number) => React.ReactNode`}</code>, if{' '}
        <code>{`depth > 0`}</code> then the cell is in a child row, in case you want to perform
        logic/styling based on the cell depth.
      </p>
    </DefaultLayout>
  )
}
