import {$} from '@core/dom'
import {ActiveRouter} from './ActiveRouter'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provised in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.changePageHundler = this.changePageHundler.bind(this)
        this.init()
        this.page = null
    }

    init() {
        window.addEventListener('hashchange', this.changePageHundler)
        this.changePageHundler()
    }

    changePageHundler() {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clear()

        const Page = ActiveRouter.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard

        this.page = new Page()

        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHundler)
    }
}