import { code } from 'src/components'

export const serverFilterSetup = code`
  useEffect(() => {
    setLoading(true)
    serverFilter(filteredColumns)
      .then(setData)
      .finally(() => setLoading(false))
  }, [filteredColumns])
`
