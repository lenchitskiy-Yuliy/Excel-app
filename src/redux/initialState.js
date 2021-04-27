import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '../constants'
import {clone} from '../core/utils'

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    title: defaultTitle,
    currentStyle: defaultStyles,
    dateVisit: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyle: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}