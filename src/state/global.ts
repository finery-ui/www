import { proxy } from 'valtio'

interface GlobalState {
  theme: 'light' | 'dark'
  code: string
  codebarOpen: boolean
  sidebarOpen: boolean
}

export const globalState = proxy<GlobalState>({
  theme: 'dark',
  code: '',
  codebarOpen: false,
  sidebarOpen: true,
})
