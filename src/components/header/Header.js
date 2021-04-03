import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    static className = 'excel-header'

    toHtml() {
        return `
            <input type="text" class="excel-header__input" value="Новая таблица">
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
}