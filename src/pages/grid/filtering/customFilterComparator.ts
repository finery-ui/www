import { code } from 'src/components'

export const customFilterComparator = code`
  function dateFilter(filterValue: Date, cellValue: Date) {
    // Don't filter if the filter date isn't set/valid.
    if (!filterValue instanceof Date || !filterValue.getTime()) {
      return true;
    }

    // Normalize the time (we only care about the calendar date matching)
    filterValue.setHours(0, 0, 0)
    cellValue.setHour(0, 0, 0)

    return filterValue.getTime() === cellValue.getTime()
  }
`
