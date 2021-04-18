import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {TableSelection} from '@/components/table/TableSelection'
import {createTable} from '@/components/table/table.template'
import {resizeTable} from '@/components/table/table.resize'
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/table.functions'

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
        return createTable(40)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$subscribe(state => {
            console.log('TableState', state)
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:sellect', $cell)
        this.$dispatch({type: 'TEST'})
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeTable(event, this.$root)
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
        this.$emit('table:input', $(event.target))
    }
}

