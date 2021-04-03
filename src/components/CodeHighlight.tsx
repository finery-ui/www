import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

export interface CodeHighlightProps {
  code: string
}

const ourTheme = {
  ...theme,
  plain: {
    ...theme.plain,
    backgroundColor: '#23252d',
  },
}

export function CodeHighlight({ code }: CodeHighlightProps) {
  return (
    <Highlight {...defaultProps} theme={ourTheme} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

const Pre = styled.pre`
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(44, 47, 57) rgb(35, 37, 45);
  margin: 1em 0;
  padding: 2em 1em;
  font-family: 'Source Code Pro', mono;
  border-radius: var(--fy-radius);
  background: rgb(33, 36, 47);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(35, 37, 45);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(44, 47, 57);
    border-radius: 20px;
    border: 3px solid rgb(35, 37, 45);
  }
`
