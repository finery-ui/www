import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ColorHash from 'color-hash'

import {
  Grid,
  Alert,
  Button,
  useColumns,
  Input,
  GridFilterProps,
  clientFilter,
  createStringFilter,
} from '@finery/core'
import * as allIcons from '@finery/ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle } from 'src/components'
import { filteringSetup } from './filteringSetup'
import { customFilterComparator } from './customFilterComparator'
import { serverFilterSetup } from './serverFilterSetup'

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

const lng = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
const nFmt8 = new Intl.NumberFormat(lng, { maximumFractionDigits: 8 }).format
const colorHash = new ColorHash({ lightness: 0.5 })

function TextFilter<T>({ state, setState }: GridFilterProps<T>) {
  return <Input type="text" value={state} onChange={e => setState(e.target.value)} />
}

function NumberFilter<T>({ state, setState }: GridFilterProps<T>) {
  return <Input type="number" value={state} onChange={e => setState(e.target.value)} />
}

const defaultStringFilter = createStringFilter()
const filterStringMin3 = createStringFilter({ min: 3 })

export default function GridFilteringPage() {
  const [data, setData] = useState<Market[]>([])
  const { columns, filteredColumns, updateColumns } = useColumns<Market>(() => [
    {
      key: 'market',
      headerNode: 'Market',
      getValue: item => item.id,
      sortDirection: 'desc',
      width: 170,
      pin: true,
      cellRenderer: 'marketId',
      filterComponent: TextFilter,
      filterComparator: filterStringMin3,
    },
    {
      key: 'base',
      headerNode: 'Base',
      getValue: item => item.base_currency,
      filterComponent: TextFilter,
      filterComparator: filterStringMin3,
    },
    {
      key: 'quote',
      headerNode: 'Quote',
      getValue: item => item.quote_currency,
      filterComponent: TextFilter,
      filterComparator: filterStringMin3,
    },
    {
      key: 'baseOrderMin',
      headerNode: 'Base Min',
      getValue: item => nFmt8(Number(item.base_min_size)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'baseOrderMax',
      headerNode: 'Base Max',
      getValue: item => nFmt8(Number(item.base_max_size)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'quoteOrderMin',
      headerNode: 'Quote Min',
      getValue: item => nFmt8(Number(item.min_market_funds)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'quoteOrderMax',
      headerNode: 'Quote Max',
      getValue: item => nFmt8(Number(item.max_market_funds)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'baseTickSize',
      headerNode: 'Base Tick',
      getValue: item => nFmt8(Number(item.base_increment)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'quoteTickSize',
      headerNode: 'Quote Tick',
      getValue: item => nFmt8(Number(item.quote_increment)),
      filterComponent: NumberFilter,
      filterComparator: defaultStringFilter,
      align: 'right',
    },
    {
      key: 'trade',
      headerNode: null,
      pin: true,
      width: 90,
      cellRenderer: (market: Market) => (
        <Button emphasis="ghost" size="compact">
          Trade
        </Button>
      ),
    },
  ])
  const [error, setError] = useState('')
  const cellRenderers = useMemo(
    () => ({
      marketId: (marketId: string, market: Market) => {
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
    }),
    []
  )

  useEffect(() => {
    fetch('/products.json', { headers: { 'content-type': 'application/json' } })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        console.error(err)
        setError(err.toString())
      })
  }, [])

  const filteredData = useMemo<Market[]>(() => clientFilter(filteredColumns, data), [
    filteredColumns,
    data,
  ])

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid Filtering</title>
      </Head>
      <DemoCard
        title="Filterable Grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        {error ? (
          <Alert emphasis="error">{error}</Alert>
        ) : (
          <Grid<Market>
            columns={columns}
            data={filteredData}
            getRowId={item => item.id}
            cellRenderers={cellRenderers}
            onColumnsChange={updateColumns}
          />
        )}
      </DemoCard>
      <SectionTitle id="setting-up-filtering">Setting up filtering</SectionTitle>
      <p>To filter by columns you need three things:</p>
      <ol>
        <li>
          Set <code>filterComponent</code> in the column defs you want to filter (or set for all in{' '}
          <code>defaultColumn</code> prop).
        </li>
        <li>
          Take <code>updateColumns</code> from <code>useColumns</code> and pass it into the{' '}
          <code>onColumnsChange</code> prop.
        </li>
        <li>
          Observe <code>filteredColumns</code> changes from <code>useColumns</code> and filter the
          data before you pass it into the grid. This can be either client or server side.
        </li>
      </ol>
      <CodeHighlight code={filteringSetup} />
      <SectionTitle id="clientside-filtering">Clientside filtering</SectionTitle>
      <p>
        For clientside filtering set an appropriate <code>filterComparator</code> function. This is
        highly subjective to your data e.g. if you want to filter strings, booleans, or ranges of
        numbers and dates etc.
      </p>
      <p>
        In the example above we use a convenience function provided by the framework called{' '}
        <code>createStringFilter</code>. However rolling your own filter functions is simple:
      </p>
      <CodeHighlight code={customFilterComparator} />
      <SectionTitle id="serverside-filtering">Serverside filtering</SectionTitle>
      <p>
        For server side filtering you need to implement a function that suits your need. You'll also
        need to switch from <code>useMemo</code> to <code>useEffect</code>.
      </p>
      <CodeHighlight code={serverFilterSetup} />
      <p>
        In this example <code>serverFilter</code> is a custom function that you define, and pass the
        filtered columns to your backend to receive filtered data.
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
