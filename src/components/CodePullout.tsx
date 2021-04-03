import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import styled from '@emotion/styled'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IconButton } from '@finery/core'

import { globalState } from 'src/state'
import { CodeHighlight } from 'src/components'

export function CodePullout() {
  const { codebarOpen, code } = useSnapshot(globalState)

  useEffect(() => {
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        globalState.codebarOpen = false
      }
    }

    if (codebarOpen) {
      document.addEventListener('keydown', closeOnEscape)
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [codebarOpen])

  function onBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      globalState.codebarOpen = false
    }
  }

  return (
    <Container data-open={codebarOpen} onClick={onBackgroundClick}>
      <Tray className="fy-scroll" data-open={codebarOpen}>
        <CloseButton title="Close" onClick={() => (globalState.codebarOpen = false)}>
          <AiOutlineArrowRight size={20} />
        </CloseButton>
        <CodeHighlight code={code} />
      </Tray>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  contain: strict;

  &[data-open='true'] {
    pointer-events: auto;
  }
`
const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1em;
  left: 1em;
`

const Tray = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 720px;
  transform: translateX(100%);
  transition: all 0.15s ease;
  background: rgba(25, 28, 38, 0.8);
  padding: 3em 1em;
  contain: strict;

  &[data-open='true'] {
    transform: translateX(0%);
  }
`
