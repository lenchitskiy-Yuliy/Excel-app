import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {TableSelection} from '@/components/table/TableSelection'
import {createTable} from '@/components/table/table.template'
import {resizeTable} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'
import {isCell} from '@/components/table/table.functions'
import {matrix} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
    static className = 'excel-table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
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

        const firstCell = this.$root.find('[data-id="0:0"]')
        this.selection.select(firstCell)
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
                this.selection.select($target)
            }
        }
    }
}

