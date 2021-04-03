export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = document.createElement('div')

        this.components.forEach(Componet => {
            const component = new Componet()
            $root.insertAdjacentHTML('beforeend', component.toHtml())
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}