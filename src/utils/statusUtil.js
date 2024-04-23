export const getStatusBackgroundColor = (statusName) => {
  switch (statusName) {
    case 'Go for Launch':
      return '#32CD32'
    case 'Launch Successful':
      return '#0074B7'
    case 'Launch Failure':
      return '#FFA500'
    case 'To Be Determined':
      return '#808080'
    case 'To Be Confirmed':
      return '#FFD700'
    default:
      return '#808080'
  }
}

export const getStatusText = (statusName) => {
  switch (statusName) {
    case 'Go for Launch':
      return 'GO'
    case 'Launch Successful':
      return 'LS'
    case 'Launch Failure':
      return 'LF'
    case 'To Be Determined':
      return 'TBD'
    case 'To Be Confirmed':
      return 'TBC'
    default:
      return statusName
  }
}
