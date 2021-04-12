import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const emitterOptions = {
            emitter: this.emitter
        }

        this.components = this.components.map(Componet => {
            const $el = $.create('div', Componet.className)
            const component = new Componet($el, emitterOptions)
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