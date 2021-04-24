import {APPLY_STYLE, APP_TITLE, CHANGE_STYLE, CHANGE_TEXT, TABLE_RESIZE} from './types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLE,
        data
    }
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle(value) {
    return {
        type: APP_TITLE,
        value
    }
}