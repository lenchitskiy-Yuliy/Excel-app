export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.className)
    }

    selectedGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    get ids() {
        return this.group.map($el => $el.id())
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectedStyles(styles) {
        this.group.forEach($el => $el.css(styles))
    }
}