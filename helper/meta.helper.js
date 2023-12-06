export const renderTitle = (path) => {
  if (path.includes('myOrder')) {
    return 'My Orders'
  }

  const title = path.replace('/', '')
  return title.charAt(0).toUpperCase() + title.slice(1)
}
