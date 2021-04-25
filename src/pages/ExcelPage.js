import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Store} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import {storage, debounce} from '@core/utils'

export class ExcelPage extends Page {
    getRoot() {
        const store = new Store(rootReducer, initialState)
        const stateListener = debounce(state => {
            storage('exel-state', state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}