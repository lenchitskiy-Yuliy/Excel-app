import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils'
import {$} from '@core/dom'
import {deleteStorange} from '@core/utils'
import {ActiveRouter} from '@core/routes/ActiveRouter'

export class Header extends ExcelComponent {
    static className = 'excel-header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            subscribes: ['title'],
            ...options
        })
    }

    render() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHtml() {
        const title = this.store.getState().title
        return `
            <input type="text" class="excel-header__input" value="${title}">
            <div class="excel-header__buttons">
                <div
                    class="excel-header__button"
                    data-type="back"
                >
                    <span
                        class="material-icons"
                        data-type="back"
                    >exit_to_app</span>
                </div>
                <div
                    class="excel-header__button excel-header__button--red"
                    data-type="remove"
                >
                    <span
                        class="material-icons"
                        data-type="remove"
                    >delete</span>
                </div>
            </div>
        `
    }

    onInput(event) {
        this.$dispatch(actions.changeTitle(event.target.value))
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'remove') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?')
            if (decision) {
                deleteStorange('excel:' + ActiveRouter.param)
                ActiveRouter.navigate('')
            }
        } else if ($target.data.type === 'back') {
            ActiveRouter.navigate('')
        }
    }
}