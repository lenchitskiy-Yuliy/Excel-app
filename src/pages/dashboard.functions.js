import {storage} from '@core/utils'

function toList(key) {
    const id = key.split(':')[1]
    const model = storage(key)
    
    return `<li class="db-table-item">
        <a href="#excel/${id}" class="db-table-item__link">
            <span class="db-table-item__name">${model.title}</span>
            <strong class="db-table-item__date">${new Date(model.dateVisit).toLocaleDateString()}</strong>
        </a>
    </li>`
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function toHtml() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<h3>Вы не создали еще таблицу</h3>`
    }
    return `
        <div class="db-table__header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="db-table__list">
            ${keys.map(toList).join('')}
        </ul>
    `
}