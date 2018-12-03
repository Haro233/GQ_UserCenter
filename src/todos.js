let appState = {
  token: {
    access_token: '',
    refresh_token: '',
    token_type: '',
  },
}

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_USER_TOKEN':
      return {
        ...state,
        token: {
          access_token: action.access_token,
          refresh_token: action.refresh_token,
          token_type: action.token_type,
        }
      }
    // case 'UPDATE_TITLE_COLOR':
    //   return {
    //     ...state,
    //     title: {
    //       ...state.title,
    //       color: action.color
    //     }
    //   }
    default:
      return state
  }
}

const store = createStore(appState, stateChanger)