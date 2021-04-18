import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Store} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import {storage} from '@core/utils'
import './scss/index.scss'

const store = new Store(rootReducer, initialState)

store.subscribe(state => {
    storage('exel-state', state)
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})
excel.render()