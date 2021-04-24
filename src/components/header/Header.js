import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
    static className = 'excel-header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            subscribes: ['appTitle'],
            ...options
        })
    }

    render() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHtml() {
        const title = this.store.getState().appTitle
        return `
            <input type="text" class="excel-header__input" value="${title}">
            <div class="excel-header__buttons">
                <div class="excel-header__button">
                    <span class="material-icons">exit_to_app</span>
                </div>
                <div class="excel-header__button excel-header__button--red">
                    <span class="material-icons">delete</span>
                </div>
            </div>
        `
    }

    onInput(event) {
        this.$dispatch(actions.changeTitle(event.target.value))
    }
}