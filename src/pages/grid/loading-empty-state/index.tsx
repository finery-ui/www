import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Grid, Button, useColumns, Stack } from '@finery/core'

import { DefaultLayout } from 'src/layouts'
import { CodeHighlight, DemoCard, SectionTitle } from 'src/components'

interface Products {
  name: string
  desc: string
}

const productData: Products[] = [
  {
    name: 'Premium Domain SSL',
    desc: 'Secure your domain with our premium DNS and DDOS protection service.',
  },
]

export default function GridLoadingEmptyStatePage() {
  const { columns } = useColumns<Products>(() => [
    {
      key: 'productName',
      headerNode: 'Product Name',
      width: '0.5fr',
      getValue: item => item.name,
    },
    {
      key: 'productDesc',
      headerNode: 'Product Description',
      width: '1fr',
      getValue: item => item.desc,
    },
  ])
  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Grid Loading/Empty</title>
      </Head>

      <SectionTitle id="loading">Loading</SectionTitle>

      <p>
        Loading is displayed when the <code>loading</code> prop is set to <code>true</code>.
      </p>

      <DemoCard
        title="Loading on empty grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        <Grid columns={columns} data={[]} getRowId={item => item.name} loading />
      </DemoCard>

      <DemoCard
        title="Loading on non-empty grid"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        <Grid columns={columns} data={productData} getRowId={item => item.name} loading />
      </DemoCard>

      <p>
        You can customize the loader with the <code>loadingNode</code> prop. For example{' '}
        <code>{`loadingNode="Loading..."`}</code>
      </p>

      <SectionTitle id="no-data">No data</SectionTitle>

      <p>
        By default no grid body is rendered if there is no data. You can alternatively show a custom
        React node e.g. <code>{`noDataNode={<p>No data to display</p>}`}</code>.
      </p>

      <DemoCard
        title="Custom no data message"
        css={{ display: 'flex', flexDirection: 'column', maxHeight: 500, marginBottom: '2rem' }}
      >
        <Grid
          columns={columns}
          data={[]}
          getRowId={item => item.name}
          noDataNode={
            <p
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2em',
              }}
            >
              No data to display 😞
            </p>
          }
        />
      </DemoCard>
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
