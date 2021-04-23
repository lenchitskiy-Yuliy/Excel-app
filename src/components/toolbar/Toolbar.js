import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {creatToolbar} from './toolbar.template'
import {$} from '@core/dom'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel-toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        })
    }

    prepare() {
        const initialState = {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAligin: 'left'
        }
        this.initState(initialState)
    }

    get template() {
        return creatToolbar(this.state)
    }

    toHtml() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            const key = Object.keys(value)[0]
            this.setState({[key]: value[key]})
        }
    }
}