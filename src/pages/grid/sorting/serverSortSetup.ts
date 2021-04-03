import { code } from 'src/components'

export const serverSortSetup = code`
  useEffect(() => {
    setLoading(true)
    serverSort(sortedColumns)
      .then(setData)
      .finally(() => setLoading(false))
  }, [sortedColumns])
`
