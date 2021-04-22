import {CHANGE_TEXT, TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
    let prevState
    let typeCell
    switch (action.type) {
        case TABLE_RESIZE:
            typeCell = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[typeCell] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [typeCell]: prevState}
        case CHANGE_TEXT:
            prevState = state.dataState || {}
            prevState[action.data.id] = action.data.value
            return {...state, dataState: prevState, currentText: action.data.value}
        default:
          return state
    }
}