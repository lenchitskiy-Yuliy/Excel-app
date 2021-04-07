import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom.js'
import {createTable} from '@/components/table/table.template'

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

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords();
            const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            let delta
            let value
            document.onmousemove = e => {
               delta = e.pageX - coords.right
               value = coords.width + delta
            }
            document.onmouseup = () => {
                document.onmousemove = null
                $parent.$el.style.width = value + 'px'
                cells.forEach(cell => cell.style.width = value + 'px')
            }
        }
    }
    
}