import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel-formula'
    
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
        })
    }

    toHtml() {
        return `
            <div class="excel-formula__info">fx</div>
            <div class="excel-formula__input" contenteditable spellcheck="false"></div>
        `
    }
    
    onInput(event) {
        console.log('Formula onInput', event)
    }
}