import {Page} from '@core/Page'
import {$} from '@core/dom'

export class DashboardPage extends Page {
    getRoot() {
        return $.create('div', 'db').html(`
        <header class="db-header">Excel table</header>
        <section class="db-new">
            <a href="#" class="db-new__card db-new__card--new"><span class="material-icons">post_add</span></a>
            <a href="#" class="db-new__card"></a>
            <a href="#" class="db-new__card"></a>
        </section>
        <section class="db-table">
            <div class="db-table__header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>
            <ul class="db-table__list">
                <li class="db-table-item">
                    <a href="#" class="db-table-item__link">
                        <span class="db-table-item__name">Таблица №1</span>
                        <strong class="db-table-item__date">01.01.01</strong>
                    </a>
                </li>
                <li class="db-table-item">
                    <a href="#" class="db-table-item__link">
                        <span class="db-table-item__name">Таблица №1</span>
                        <strong class="db-table-item__date">01.01.01</strong>
                    </a>
                </li>
                <li class="db-table-item">
                    <a href="#" class="db-table-item__link">
                        <span class="db-table-item__name">Таблица №1</span>
                        <strong class="db-table-item__date">01.01.01</strong>
                    </a>
                </li>
                <li class="db-table-item">
                    <a href="#" class="db-table-item__link">
                        <span class="db-table-item__name">Таблица №1</span>
                        <strong class="db-table-item__date">01.01.01</strong>
                    </a>
                </li>
            </ul>
        </section>
        `)
    }
}