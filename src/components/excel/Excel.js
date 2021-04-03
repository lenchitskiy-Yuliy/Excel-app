import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        
        this.components.forEach(Componet => {
            const $el = $.create('div', Componet.className)
            const component = new Componet($el)
            $el.html(component.toHtml())
            $root.append($el)
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}