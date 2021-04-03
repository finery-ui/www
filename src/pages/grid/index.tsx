import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ColorHash from 'color-hash'
import { Grid, Alert, Button, useColumns, Stack } from '@finery/components'
import * as allIcons from 'ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle, ExternalLink } from 'src/components'

import { basicRequiredSetup } from './basicRequiredSetup'

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
  // Defaults that you wish to apply to all columns here.
}

const lng = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
const nFmt8 = new Intl.NumberFormat(lng, { maximumFractionDigits: 8 }).format

const colorHash = new ColorHash({ lightness: 0.5 })

export default function GridPage() {
  const [data, setData] = useState<Market[]>([])
  const { columns } = useColumns<Market>(
    () => [
      {
        key: 'market',
        headerNode: 'Market',
        getValue: item => item.id,
        sortDirection: 'desc',
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
        getValue: item => nFmt8(Number(item.base_min_size)),
        align: 'right',
      },
      {
        key: 'baseOrderMax',
        headerNode: 'Base Max',
        getValue: item => nFmt8(Number(item.base_max_size)),
        align: 'right',
      },
      {
        key: 'quoteOrderMin',
        headerNode: 'Quote Min',
        getValue: item => nFmt8(Number(item.min_market_funds)),
        align: 'right',
      },
      {
        key: 'quoteOrderMax',
        headerNode: 'Quote Max',
        getValue: item => nFmt8(Number(item.max_market_funds)),
        align: 'right',
      },
      {
        key: 'baseTickSize',
        headerNode: 'Base Tick',
        getValue: item => nFmt8(Number(item.base_increment)),
        align: 'right',
      },
      {
        key: 'quoteTickSize',
        headerNode: 'Quote Tick',
        getValue: item => nFmt8(Number(item.quote_increment)),
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

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid</title>
      </Head>

      <DemoCard
        title="Default grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        {error ? (
          <Alert emphasis="error">{error}</Alert>
        ) : (
          <Grid<Market> columns={columns} data={data} getRowId={item => item.id} />
        )}
      </DemoCard>

      <SectionTitle id="basic-setup">Basic setup</SectionTitle>

      <CodeHighlight code={basicRequiredSetup} />

      <SectionTitle id="grid-props">Grid Props</SectionTitle>

      <p>Todo</p>

      <SectionTitle id="column-definitions">Column definitions</SectionTitle>

      <Stack>
        <div>
          <SectionTitle as="h3" id="key-def">
            key <small>string</small>
          </SectionTitle>

          <p>
            Define by you, must be unique across all columns e.g. <code>key: 'createdDate'</code>
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="headerNode-def">
            headerNode <small>React.ReactNode</small>
          </SectionTitle>

          <p>
            A React node to display in the column header. Can be a simple string or any React
            element e.g. <code>{`headerNode: 'Created'`}</code>
          </p>
        </div>
      </Stack>

      <Stack>
        <div>
          <SectionTitle as="h3" id="getValue-def">
            getValue? <small>{`(item: T, source: 'cell' | 'clipboard' | 'sort') => any`}</small>
          </SectionTitle>

          <p>A function which returns the value for this column cell.</p>

          <p>
            You can return different values depending on the source requesting it. For example you
            want to return a formatted string in the grid, but a number for sorting and the
            clipboard:
          </p>

          <CodeHighlight
            code={`getValue: (item, source) => source === 'cell' ? currencyFmt(item.price) : item.price`}
          />

          <p>
            If no function is provided then the whole row item is returned to the first param of{' '}
            <code>cellRenderer</code>.
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="cellRenderer-def">
            cellRenderer? <small>{`(value: any, item: T, depth: number) => React.ReactNode`}</small>
          </SectionTitle>

          <p>
            A function that returns a ReactNode if you need to customize the rendering of a cell.{' '}
            <code>value</code> is the result of <code>getValue</code>. If you don't define a{' '}
            <code>getValue</code> then it will be the same as <code>item</code>.
          </p>

          <p>
            <code>depth</code> is 0, unless you're rendering nested child rows, in which case it can
            be used to visually indent child rows for example.
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="width-def">
            width? <small>{`React.ReactText`}</small>
          </SectionTitle>

          <p>
            Any valid column width as specified in the{' '}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns">
              MDN Spec
            </ExternalLink>
            , e.g <code>'0.5fr'</code>, <code>'200px'</code> (or <code>200</code>),{' '}
            <code>'minmax(120px, 1fr)'</code>. Defaults to <code>'minmax(max-content, 300px)'</code>
            .
          </p>

          <p>Pinned colums must have a pixel width.</p>
        </div>
        <div>
          <SectionTitle as="h3" id="align-def">
            align? <small>{`'left' | 'center' | 'right'`}</small>
          </SectionTitle>

          <p>The content alignment of the header and body cell. Defaults to undefined (left).</p>
        </div>
        <div>
          <SectionTitle as="h3" id="pin-def">
            pin? <small>{`boolean`}</small>
          </SectionTitle>

          <p>
            Set to <code>true</code> to pin the column in place so that it's always visible even if
            the grid is scrolled.
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="sortable-def">
            sortable? <small>{`boolean`}</small>
          </SectionTitle>

          <p>
            Whether this column can be sorted or not. Defaults to <code>false</code>. See{' '}
            <Link href="/grid/sorting">
              <a>Sorting</a>
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="sortDirection-def">
            sortDirection? <small>{`'asc' | 'desc'`}</small>
          </SectionTitle>

          <p>
            The current sort direction of this column. Can be omitted or undefined to mean "no
            sort". See{' '}
            <Link href="/grid/sorting">
              <a>Sorting</a>
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="sortComparator-def">
            sortComparator?{' '}
            <small>{`'string' | 'boolean' | 'number' | (direction: GridSortDirection, valueA: any, valueB: any) => number`}</small>
          </SectionTitle>

          <p>
            The sort comparator to use for this column when sorting on the <u>client</u>. Can be be
            one of the predefined comparators or a custom function which has the same behaviour as a
            normal array{' '}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">
              sort function
            </ExternalLink>
            , the only difference being that the first param is the sort direction. Defaults to{' '}
            <code>'string'</code> and should be set to <code>'number'</code> for numeric columns.
            See{' '}
            <Link href="/grid/sorting">
              <a>Sorting</a>
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="filterComponent-def">
            filterComponent? <small>{`React.ComponentType<GridFilterProps<T>>`}</small>
          </SectionTitle>

          <p>
            A filter component (e.g. a text input) to allow the user to filter column cell values.
            See{' '}
            <Link href="/grid/filtering">
              <a>Filtering</a>
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="filterComponent-def">
            filterComparator? <small>{`(filterValue: any, cellValue: any) => boolean`}</small>
          </SectionTitle>

          <p>
            For clientside filtering you can set a function to be used for filtering values in this
            column. See{' '}
            <Link href="/grid/filtering">
              <a>Filtering</a>
            </Link>
            .
          </p>
        </div>
        <div>
          <SectionTitle as="h3" id="filterValue-def">
            filterValue? <small>{`any`}</small>
          </SectionTitle>

          <p>
            The current filter value for this column. Usually you can omit this and not worry about
            it unless you want to load the grid with a specific filter value set for the column.
            However in your filter handler you will use this value to filter data. See{' '}
            <Link href="/grid/filtering">
              <a>Filtering</a>
            </Link>
            .
          </p>
        </div>
      </Stack>
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
