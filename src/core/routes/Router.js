import {$} from '@core/dom'
// import {ActiveRouter} from './ActiveRouter'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provised in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.changePageHundler = this.changePageHundler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHundler)
        this.changePageHundler()
    }

    changePageHundler() {
        const Page = this.routes.excel
        const page = new Page()
        this.$placeholder.append(page.getRoot())

        page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHundler)
    }
}