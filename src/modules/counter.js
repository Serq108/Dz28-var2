export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'
export const ENTER = 'counter/ENTER'


const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  entering: 'Вход',
  username: '',
  userId: 0,
  first_name: '',
  last_name: '',
  email: '',
  group: '',  
  birthday: new Date(0)
 }

//Редюсер
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    case ENTER:
      return {
        ...state,
        entering: action.entering,
        username: action.username,
        userId: action.userId,
        first_name: action.first_name,
        last_name: action.last_name,
        email: action.email,
        group: action.group,
        birthday: action.birthday
      }

    default:
      return state
  }
}

//Акшены
export const increment = () => {
  return dispatch => {
    console.log('INCREMENT')
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}

export const gate = (
  entering, 
  username, 
  userId,
  first_name,
  last_name,
  email,
  group,
  birthday
) => {
  console.log('GATEEEEEEEE')
  return dispatch => {
    dispatch({
      type: ENTER,
      entering,
      username,
      userId,
      first_name,
      last_name,
      email,
      group,
      birthday
    })
  }
}