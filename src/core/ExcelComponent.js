import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, option = {}) {
        super($root, option.listeners)
        this.name = option.name || ''
        this.emitter = option.emitter
        this.prepare()
        this.unsubscribe = []
        this.store = option.store
        this.subscribes = option.subscribes || []
    }

    prepare() {}

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const subscribe = this.emitter.subscribe(event, fn)
        this.unsubscribe.push(subscribe)
    }

    $dispatch(event) {
        this.store.dispatch(event)
    }

    storeChanged() {}

    isWathing(key) {
        return this.subscribes.includes(key)
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubscribe.forEach(subscribe => subscribe())
    }
}