function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_USER_TOKEN':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}