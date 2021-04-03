import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { IconButton } from '@finery/core'
import reactElementToJSXString from 'react-element-to-jsx-string'
import { RiCodeSSlashLine } from 'react-icons/ri'
import { BiCopy } from 'react-icons/bi'
import { FiCheck } from 'react-icons/fi'

import { globalState } from 'src/state'

interface DemoTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title: string
  sourceOverride?: string
}

export function DemoCard({ children, title, sourceOverride, ...attrs }: DemoTileProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false)
      }, 1000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }
  }, [copied])

  return (
    <Container {...attrs}>
      <Header>
        <Title>{title}</Title>
        <div>
          <HeaderButton
            title="Copy source"
            onClick={() => {
              navigator.clipboard
                .writeText(sourceOverride || reactElementToJSXString(children))
                .then(() => setCopied(true))
                .catch(console.error)
            }}
          >
            {copied ? <FiCheck color="green" /> : <BiCopy />}
          </HeaderButton>
          <HeaderButton
            title="View source"
            onClick={() => {
              globalState.code = sourceOverride || reactElementToJSXString(children)
              globalState.codebarOpen = true
            }}
          >
            <RiCodeSSlashLine />
          </HeaderButton>
        </div>
      </Header>
      {children}
    </Container>
  )
}

const Container = styled.div`
  padding: 2em;
  border: 1px solid var(--fy-borderColor);
  border-radius: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`

const Title = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-family: var(--fy-bodyFont);
  font-weight: 300;
  font-size: 12px;
  color: var(--fy-textColor);
  letter-spacing: 2px;
`

const HeaderButton = styled(IconButton)`
  &:not(:last-of-type) {
    margin-right: 0.5em;
  }
`
