import styled from '@emotion/styled'
import { RiExternalLinkLine } from 'react-icons/ri'

export interface ExternalLinkProps {
  href: string
  children: React.ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <StyledAnchor href={href} target="_blank" rel="noreferrer noopener">
      {children}
      <RiExternalLinkLine css={{ marginLeft: 2 }} aria-label="External link icon" />
    </StyledAnchor>
  )
}

const StyledAnchor = styled.a`
  display: inline-flex;
  align-items: center;
`
