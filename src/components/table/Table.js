import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {TableSelection} from '@/components/table/TableSelection'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/table.functions'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel-table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHtml() {
        return createTable(40, this.store.state)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    updateText(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: value
        }))
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', value => {
            this.selection.current.attr('data-value', value)
            this.selection.current.text(parse(value))
            this.updateText(value)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('table:styles', value => {
            this.selection.selectedStyles(value)
            this.$dispatch(actions.applyStyles({
                value,
                ids: this.selection.ids
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:sellect', $cell)
        const styles = $cell.getStyle(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this.$root)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.log('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectedGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }
    
    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'ArrowLeft',
            'Tab',
            'Enter'
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const {row, col} = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(event.key, row, col))
            this.selectCell($next)
        }
    }
    
    onInput(event) {
        this.updateText($(event.target).text())
    }
}

