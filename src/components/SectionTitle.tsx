import styled from '@emotion/styled'
import clsx from 'clsx'
import Link from 'next/link'

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType
  id?: string
  children: React.ReactNode
}

export function SectionTitle({ as = 'h2', id, children, className, ...attrs }: SectionTitleProps) {
  if (id) {
    const active = typeof location !== 'undefined' && location.hash.substr(1) === id
    return (
      <Title className={clsx(className, 'fy-h')} id={id} as={as} {...attrs}>
        <Link href={`#${id}`}>
          <a>
            {active ? <Bookmarklet>#</Bookmarklet> : ''}
            {children}
          </a>
        </Link>
      </Title>
    )
  }

  return (
    <Title className={clsx(className, 'fy-h')} {...attrs}>
      {children}
    </Title>
  )
}

const Title = styled.h3`
  position: relative;
  margin-top: 3em;
  margin-bottom: 0.5em;

  &:first-child {
    margin-top: 0;
  }

  small {
    opacity: 0.5;
  }
`

const Bookmarklet = styled.span`
  position: absolute;
  transform: translateX(calc(-100% - 6px));
  opacity: 0.5;
`
