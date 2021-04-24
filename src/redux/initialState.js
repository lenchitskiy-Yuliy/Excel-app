import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '../constants'

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    appTitle: defaultTitle,
    currentStyle: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyle: defaultStyles,
    currentText: ''
})

export const initialState = storage('exel-state')
    ? normalize(storage('exel-state'))
    : defaultState