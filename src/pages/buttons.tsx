import Head from 'next/head'
import { Button, ButtonGroup, Stack } from '@finery/components'
import { FiMail, FiCopy } from 'react-icons/fi'

import { DefaultLayout } from 'src/layouts'
import { DemoCard } from 'src/components'

export default function ButtonsPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Finery UI - Buttons</title>
      </Head>

      <Stack layout="horizontal">
        <DemoCard title="Primary">
          <Button emphasis="primary">Sign up</Button>
        </DemoCard>
        <DemoCard title="Secondary">
          <Button emphasis="secondary">Cancel</Button>
        </DemoCard>
        <DemoCard title="Ghost">
          <Button emphasis="ghost">Change settings</Button>
        </DemoCard>
        <DemoCard title="Danger">
          <Button emphasis="danger">Delete account</Button>
        </DemoCard>
        <DemoCard title="Buy">
          <Button emphasis="buy">Buy BTC</Button>
        </DemoCard>
        <DemoCard title="Sell">
          <Button emphasis="sell">Sell BTC</Button>
        </DemoCard>
        <DemoCard title="Group">
          <ButtonGroup>
            <Button emphasis="primary" disabled>
              Spot
            </Button>
            <Button emphasis="secondary">Margin</Button>
          </ButtonGroup>
        </DemoCard>
        <DemoCard title="Left Decorator">
          <Button emphasis="primary" decoratorLeft={<FiMail />}>
            Subscribe
          </Button>
        </DemoCard>
        <DemoCard title="Right Decorator">
          <Button emphasis="secondary" decoratorRight={<FiCopy />}>
            Copy text
          </Button>
        </DemoCard>
        <DemoCard title="Disabled">
          <Button emphasis="primary" disabled>
            Sign up
          </Button>
        </DemoCard>
        <DemoCard title="Loading">
          <Button emphasis="primary" loading disabled>
            Updating details
          </Button>
        </DemoCard>
        <DemoCard title="Compact">
          <Button emphasis="danger" size="compact">
            Cancel order
          </Button>
        </DemoCard>
      </Stack>
    </DefaultLayout>
  )
}
