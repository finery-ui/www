import styled from '@emotion/styled'

import { NavLink } from 'src/components'

export function Sidebar(attrs: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container className="fy-scroll" {...attrs}>
      <div className="fy-scroll">
        <nav>
          <MenuList>
            <li>
              <NavLink href="/" passHref>
                <MenuLink>Home</MenuLink>
              </NavLink>
            </li>
            <li>
              <NavLink href="/buttons" passHref>
                <MenuLink>Buttons</MenuLink>
              </NavLink>
            </li>
            <li>
              <NavLink href="/currency-icons" passHref>
                <MenuLink>Currency Icons</MenuLink>
              </NavLink>
            </li>
            <li>
              <NavLink href="/orderbook" passHref>
                <MenuLink>Orderbook</MenuLink>
              </NavLink>
            </li>
            <li>
              <NavLink href="/grid" passHref>
                <MenuLink>Grid</MenuLink>
              </NavLink>
              <MenuList>
                <li>
                  <NavLink href="/grid" passHref>
                    <MenuLink>Basics</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/loading-empty-state" passHref>
                    <MenuLink>Loading/Empty State</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/pagination" passHref>
                    <MenuLink>Pagination</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/sorting" passHref>
                    <MenuLink>Sorting</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/filtering" passHref>
                    <MenuLink>Filtering</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/master-details" passHref>
                    <MenuLink>Master-details</MenuLink>
                  </NavLink>
                  <NavLink href="/grid/row-children" passHref>
                    <MenuLink>Row children</MenuLink>
                  </NavLink>
                </li>
              </MenuList>
            </li>
          </MenuList>
        </nav>
      </div>
    </Container>
  )
}

const Container = styled.div`
  border-right: 1px solid var(--fy-borderColor);
  transition: margin-left 0.3s ease;
  width: 0;
  overflow: hidden;
  padding-top: 70px;

  &[data-sidebar-open='true'] {
    width: 200px;
  }
`

const MenuLink = styled.a`
  display: block;
  color: var(--fy-textColor);
  padding: 0.125em 0;
  transition: color var(--fy-trans);
  margin-bottom: 0.25em;

  &:focus,
  &:not(:disabled):hover,
  &[data-active='true']:not(:disabled) {
    color: var(--fy-primaryTextColor);
    text-decoration: none;
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--fy-controlOutlineColor);
  }

  &[data-active='true'] {
    cursor: default;
  }
`

const MenuList = styled.ul`
  list-style: none;
  padding-left: 1.5em;

  & & ${MenuLink} {
    margin-bottom: 0em;
  }
`
