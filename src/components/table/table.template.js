const CODES = {
    A: 65,
    Z: 90
}

const WIDTH_COL = 120
const HEIGHT_ROW = 24

function toCell(row, state) {
    return function(_, index) {
        const widht = state.colState[index] ? state.colState[index] : WIDTH_COL
        const id = `${row}:${index}`
        const text = state.dataState[id] || ''
        return `
            <div
                class="cell"
                contenteditable
                data-col="${index}"
                data-type="cell"
                data-id="${id}"
                style="width: ${widht}px"
            >${text}</div>
        `
    }
}

function toColumn(colState) {
    return function(col, index) {
        const widht = colState[index] ? colState[index] : WIDTH_COL
        return `
            <div
                class="column"
                data-type="resizable"
                data-col="${index}"
                style="width: ${widht}px"
            >${col}
            <div
            class="col-resize" data-resize="col"></div>
            </div>
        `
    }
}

function createRow(content, index, rowState = {}) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const dataRow = index ? `data-row="${index}"`: ''
    const height = rowState[index] ? rowState[index] : HEIGHT_ROW
    return `
        <div class="row" data-type="resizable" ${dataRow} style="height: ${height}px"">
            <div class="row-info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChart(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChart)
        .map(toColumn(state.colState))
        .join('')

    rows.push(createRow(cols))

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('')

        rows.push(createRow(cells, row + 1, state.rowState) )
    }

    return rows.join('')
}