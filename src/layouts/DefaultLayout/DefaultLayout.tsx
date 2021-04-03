import Head from 'next/head'
import styled from '@emotion/styled'
import { useProxy } from 'valtio'
import { WiMoonAltWaxingCrescent1, WiMoonAltWaxingGibbous6 } from 'react-icons/wi'
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'
import { Button } from '@finery/components'

import { globalState } from 'src/state'
import { CodePullout, Logo } from 'src/components'

import { Sidebar } from './Sidebar'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const MAX_WIDTH = '1200px'

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { theme, sidebarOpen } = useProxy(globalState)

  function toggleSidebar() {
    globalState.sidebarOpen = !sidebarOpen
  }

  function toggleTheme() {
    if (theme === 'light') {
      globalState.theme = 'dark'
    } else {
      globalState.theme = 'light'
    }
  }

  return (
    <Container>
      <Head>
        <title>Finery UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar data-sidebar-open={sidebarOpen} />
      <PageWrapper className="fy-scroll">
        <Header>
          <MenuButton
            emphasis="ghost"
            size="compact"
            title="Toggle sidebar"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <RiMenuFoldLine size={20} /> : <RiMenuUnfoldLine size={20} />}
          </MenuButton>
          <HeaderWrapper>
            <Logo />
            <div>
              <Button
                emphasis="ghost"
                size="compact"
                decoratorLeft={
                  theme === 'light' ? (
                    <WiMoonAltWaxingCrescent1 size={14} />
                  ) : (
                    <WiMoonAltWaxingGibbous6 size={14} />
                  )
                }
                onClick={toggleTheme}
              >
                {theme === 'light' ? 'Dark' : 'Light'} theme
              </Button>
            </div>
          </HeaderWrapper>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <FooterInner>Some footer</FooterInner>
        </Footer>
      </PageWrapper>
      <CodePullout />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  background: var(--fy-bg);
  display: flex;
`

const PageWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 32;
  background: var(--fy-bg);
  border-bottom: 1px solid var(--fy-borderColor);
  padding: 0 1rem;
`

const HeaderWrapper = styled.div`
  flex: 1;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`

const MenuButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`

const Main = styled.main`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  padding: 2rem;
`

const Footer = styled.footer`
  border-top: 1px solid var(--fy-borderColor);
`

const FooterInner = styled.footer`
  margin: 0 auto;
  max-width: ${MAX_WIDTH};
  padding: 1rem 2rem;
`
