import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import ColorHash from 'color-hash'
import { Grid, Alert, Button, useColumns, Stack } from '@finery/components'
import * as allIcons from 'ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle, ExternalLink } from 'src/components'

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

export default function GridPaginationPage() {
  const [page, setPage] = useState(1)
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

  const paginatedData = useMemo(() => data.slice(page, page * PAGE_SIZE), [page, data])

  function renderFooter() {
    return <div>I am FOOTER!!!</div>
  }

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
          <Grid<Market>
            columns={columns}
            data={paginatedData}
            getRowId={item => item.id}
            footerNode={renderFooter()}
          />
        )}
      </DemoCard>

      <SectionTitle id="basic-setup">Basic setup</SectionTitle>

      <CodeHighlight code={basicRequiredSetup} />

      <SectionTitle id="grid-props">Grid Props</SectionTitle>

      <p>Todo</p>
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
