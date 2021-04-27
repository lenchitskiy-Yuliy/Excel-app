import {Page} from '@core/Page'
import {$} from '@core/dom'
import {toHtml} from './dashboard.functions'

export class DashboardPage extends Page {
    getRoot() {
        const newTable = Date.now().toString()

        return $.create('div', 'db').html(`
            <header class="db-header">Excel table</header>
            <section class="db-new">
                <a href="#excel/${newTable}" class="db-new__card db-new__card--new">
                    <span class="material-icons">post_add</span>
                </a>
            </section>
            <section class="db-table">
                ${toHtml()}
            </section>
        `)
    }
}