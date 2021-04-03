import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Stack } from '@finery/core'
import * as allIcons from '@finery/ccy-icons'

import { DefaultLayout } from 'src/layouts'
import { DemoCard } from 'src/components'

export default function CCYIconsPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Currency Icons</title>
      </Head>

      <Stack layout="horizontal">
        {Object.entries(allIcons).map(([name, Icon]) => {
          return (
            <IconCard key={name} title={name} sourceOverride={`<${name} />`}>
              <Icon css={iconStyle} />
            </IconCard>
          )
        })}
      </Stack>
    </DefaultLayout>
  )
}

const IconCard = styled(DemoCard)`
  color: var(--fy-primaryTextColor);
`

const iconStyle = css`
  width: 48px;
  height: 48px;
`
