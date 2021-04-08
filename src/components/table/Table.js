import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeTable} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

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
        if (shouldResize(event)) {
            resizeTable(event, this.$root)
        }
    }
}