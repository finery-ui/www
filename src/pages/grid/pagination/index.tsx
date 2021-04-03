import { useEffect, useMemo, useState } from 'react'
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi'
import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ColorHash from 'color-hash'
import { Grid, useColumns, Alert, Button, Input } from '@finery/core'
import * as allIcons from '@finery/ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle, ExternalLink, code } from 'src/components'

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

const basicRequiredSetup = 'const temp = "REMOVE ME"'

const PAGE_SIZE = 15

const lng = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
const nFmt8 = new Intl.NumberFormat(lng, { maximumFractionDigits: 8 }).format
const colorHash = new ColorHash({ lightness: 0.5 })

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function GridPaginationPage() {
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
  const [pageIndex, setPageIndex] = useState(0)
  const totalPages = Math.ceil(data.length ? data.length / PAGE_SIZE : 0)
  const lastPageIndex = totalPages - 1
  const pageClamp = (n: number) => clamp(n, 0, lastPageIndex)

  useEffect(() => {
    fetch('/products.json', { headers: { 'content-type': 'application/json' } })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        console.error(err)
        setError(err.toString())
      })
  }, [])

  const paginatedData = useMemo(
    () => data.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE),
    [pageIndex, data]
  )

  function renderFooter() {
    return (
      <Pagination>
        <Button emphasis="ghost" disabled={pageIndex === 0} onClick={() => setPageIndex(0)}>
          <HiOutlineChevronDoubleLeft />
        </Button>
        <Button
          emphasis="ghost"
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageClamp(pageIndex - 1))}
        >
          <HiOutlineChevronLeft />
        </Button>
        <Input
          type="number"
          value={String(pageIndex + 1)}
          css={{ width: 80 }}
          onChange={e => setPageIndex(pageClamp(Number(e.target.value) - 1))}
        />
        <Button
          emphasis="ghost"
          disabled={pageIndex === lastPageIndex}
          onClick={() => setPageIndex(pageClamp(pageIndex + 1))}
        >
          <HiOutlineChevronRight />
        </Button>
        <Button
          emphasis="ghost"
          disabled={pageIndex === lastPageIndex}
          onClick={() => setPageIndex(lastPageIndex)}
        >
          <HiOutlineChevronDoubleRight />
        </Button>
      </Pagination>
    )
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid</title>
      </Head>

      <SectionTitle id="basic-setup">Setting up pagination</SectionTitle>

      <p>
        Since data is controlled and pagination could be handled on the client or server, you are in
        full control of it. This also means that how you render the pagination is up to you since
        there are many ways to do it.
      </p>

      <p>
        In the example below we paginate data on the client (simply a slice of the data), and use
        the <code>Button</code> and <code>Input</code> components provided by the library.
      </p>

      <DemoCard
        title="Default grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        {error ? (
          <Alert emphasis="error">{error}</Alert>
        ) : (
          <Grid<Market>
            columns={columns}
            data={paginatedData}
            getRowId={item => item.id}
            footerNode={renderFooter()}
          />
        )}
      </DemoCard>

      <p>The key steps above are:</p>

      <ul>
        <li>Create state to hold the current page index.</li>
        <li>Slice the data based on the page index.</li>
        <li>
          Render pagination controls which set the page index and pass them into the grid via the{' '}
          <code>footerNode</code> prop.
        </li>
      </ul>

      <SectionTitle id="grid-props">Server side pagination</SectionTitle>

      <p>
        As with sorting and filtering instead of <code>useMemo</code> switch to using{' '}
        <code>useEffect</code> for requesting the new page of data.
      </p>

      <CodeHighlight
        code={code`
        useEffect(() => {
          setLoading(true)
          fetchPagedData(pageIndex, PAGE_SIZE)
            .then(setData)
            .finally(() => setLoading(false))
        }, [pageIndex])
      `}
      />
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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 0.5em;
  }
`
