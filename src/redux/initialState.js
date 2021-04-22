import {storage} from '@core/utils'

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    currentText: {}
}

export const initialState = storage('exel-state')
    ? storage('exel-state')
    : defaultState