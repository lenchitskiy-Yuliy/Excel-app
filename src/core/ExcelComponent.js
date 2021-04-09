import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, option = {}) {
        super($root, option.listeners)
        this.name = option.name || ''

        this.prepare()
    }

    prepare() {}

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
    }
}