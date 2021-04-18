import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Componet => {
            const $el = $.create('div', Componet.className)
            const component = new Componet($el, componentOptions)
            $el.html(component.toHtml())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}