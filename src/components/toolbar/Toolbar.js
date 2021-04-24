import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {creatToolbar} from './toolbar.template'
import {$} from '@core/dom'
import {defaultStyles} from '../../constants'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel-toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribes: ['currentStyle'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return creatToolbar(this.state)
    }

    toHtml() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyle)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('table:styles', value)
        }
    }
}