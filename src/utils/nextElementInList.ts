const nextElementInList = <T>(list: T[], value: T) => {
  const currentActionIndex = list.indexOf(value)
  const nextActionIndex = currentActionIndex === list.length - 1 ? 0 : currentActionIndex + 1
  const nextValue = list[nextActionIndex]
  return nextValue
}

export default nextElementInList
