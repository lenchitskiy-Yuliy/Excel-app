import {CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLE, APPLY_STYLE, APP_TITLE, UPDATE_DATE} from './types'

export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value,
                [field]: value(state, field, action)
            }
        case CHANGE_STYLE:
            return {...state, currentStyle: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyle: {...state.currentStyle, ...action.data.value}
            }
        case APP_TITLE:
            return {...state, title: action.value}
        case UPDATE_DATE:
            return {...state, dateVisit: new Date().toJSON()}
        default:
          return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}