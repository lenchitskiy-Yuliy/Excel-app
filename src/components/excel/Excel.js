import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '../../core/StoreSubscriber'

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
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

    init() {
        this.subscriber.subscriberComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}