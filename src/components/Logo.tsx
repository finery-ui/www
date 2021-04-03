import styled from '@emotion/styled'

import { LogoIcon } from './LogoIcon'

export function Logo() {
  return (
    <Container>
      <StyledLogoIcon /> Finery
    </Container>
  )
}

const Container = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: var(--fy-primaryTextColor);
`

const StyledLogoIcon = styled(LogoIcon)`
  width: 24px;
  margin-right: 10px;
`
