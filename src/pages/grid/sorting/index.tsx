import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ColorHash from 'color-hash'
import { Grid, Alert, Button, clientSort, useColumns } from '@finery/components'
import * as allIcons from 'ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle } from 'src/components'

import { sortSetup } from './sortSetup'
import { numberSortComparator } from './numberSortComparator'
import { clientSortSnippet } from './clientSortSnippet'
import { serverSortSetup } from './serverSortSetup'

interface Market {
  id: string
  base_currency: string
  quote_currency: string
  base_min_size: string
  base_max_size: string
  quote_increment: string
  base_increment: string
  display_name: string
  min_market_funds: string
  max_market_funds: string
  margin_enabled: boolean
  post_only: boolean
  limit_only: boolean
  cancel_only: boolean
  trading_disabled: boolean
  status: string
  status_message: string
}

const defaultColumn = {
  sortable: true,
}

const lng = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
const nFmt8 = new Intl.NumberFormat(lng, { maximumFractionDigits: 8 }).format

const colorHash = new ColorHash({ lightness: 0.5 })

export default function GridSortingPage() {
  const [data, setData] = useState<Market[]>([])
  const { columns, sortedColumns, updateColumns } = useColumns<Market>(
    () => [
      {
        key: 'market',
        headerNode: 'Market',
        getValue: item => item.id,
        sortDirection: 'desc',
        sortComparator: 'default',
        width: 170,
        pin: true,
        cellRenderer: (marketId: string, market: Market) => {
          const Icon = allIcons[market.base_currency]
          const backgroundColor = colorHash.hex(market.base_currency)
          if (Icon) {
            return (
              <>
                <IconBadge style={{ backgroundColor }}>
                  <Icon css={marketIconStyle} />
                </IconBadge>
                {marketId}
              </>
            )
          }
          return marketId
        },
      },
      {
        key: 'base',
        headerNode: 'Base',
        getValue: item => item.base_currency,
      },
      {
        key: 'quote',
        headerNode: 'Quote',
        getValue: item => item.quote_currency,
      },
      {
        key: 'baseOrderMin',
        headerNode: 'Base Min',
        getValue: (item, source) => {
          const n = Number(item.base_min_size)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'baseOrderMax',
        headerNode: 'Base Max',
        getValue: (item, source) => {
          const n = Number(item.base_max_size)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'quoteOrderMin',
        headerNode: 'Quote Min',
        getValue: (item, source) => {
          const n = Number(item.min_market_funds)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'quoteOrderMax',
        headerNode: 'Quote Max',
        getValue: (item, source) => {
          const n = Number(item.max_market_funds)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'baseTickSize',
        headerNode: 'Base Tick',
        getValue: (item, source) => {
          const n = Number(item.base_increment)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'quoteTickSize',
        headerNode: 'Quote Tick',
        getValue: (item, source) => {
          const n = Number(item.quote_increment)
          return source === 'cell' ? nFmt8(n) : n
        },
        sortComparator: 'number',
        align: 'right',
      },
      {
        key: 'trade',
        headerNode: null,
        sortable: false,
        pin: true,
        width: 90,
        cellRenderer: (market: Market) => (
          <Button emphasis="ghost" size="compact">
            Trade
          </Button>
        ),
      },
    ],
    defaultColumn
  )
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/products.json', { headers: { 'content-type': 'application/json' } })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        console.error(err)
        setError(err.toString())
      })
  }, [])

  const sortedData = useMemo<Market[]>(() => clientSort(sortedColumns, data), [sortedColumns, data])

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid Sorting</title>
      </Head>
      <DemoCard
        title="Sortable grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        {error ? (
          <Alert emphasis="error">{error}</Alert>
        ) : (
          <Grid<Market>
            columns={columns}
            data={sortedData}
            getRowId={item => item.id}
            onColumnsChange={updateColumns}
          />
        )}
      </DemoCard>
      <SectionTitle id="setting-up-sorting">Setting up sorting</SectionTitle>
      <p>To sort columns you need three things:</p>
      <ol>
        <li>
          Set <code>sortable</code> to <code>true</code> in the column defs you want to sort (or set
          for all in <code>defaultColumn</code> prop).
        </li>
        <li>
          Take <code>updateColumns</code> from <code>useColumns</code> and pass it into the{' '}
          <code>onColumnsChange</code> prop.
        </li>
        <li>
          Observe <code>sortedColumns</code> changes from <code>useColumns</code> and sort the data
          before you pass it into the grid. This can be either client or server side.
        </li>
      </ol>
      <CodeHighlight code={sortSetup} />
      <SectionTitle id="clientside-sorting">Clientside sorting</SectionTitle>
      <p>
        For clientside sorting ensure that the appropriate <code>sortComparator</code> function (or
        preset) is set. For strings or booleans you don't need to set anything (the default{' '}
        <code>'default'</code> works), however you should change it to <code>'number'</code> for
        numerical columns.
      </p>
      <CodeHighlight code={numberSortComparator} />
      <p>
        The final step is to import and use <code>clientSort</code> to sort the columns:
      </p>
      <CodeHighlight code={clientSortSnippet} />
      <SectionTitle id="serverside-sorting">Serverside sorting</SectionTitle>
      <p>
        For server side sorting you need to implement a function that suits your need. You'll also
        need to switch from <code>useMemo</code> to <code>useEffect</code>.
      </p>
      <CodeHighlight code={serverSortSetup} />
      <p>
        In this example <code>serverSort</code> is a custom function that you define, and pass the
        sorted columns to your backend to receive sorted data.
      </p>
    </DefaultLayout>
  )
}

const IconBadge = styled.div`
  width: 32px;
  height: 32px;
  padding: 6px;
  margin-right: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const marketIconStyle = css`
  max-width: 100%;
  max-height: 100%;
  color: white;
`
