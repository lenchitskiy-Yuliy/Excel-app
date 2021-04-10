class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHtml.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventTipe, callback) {
        this.$el.addEventListener(eventTipe, callback)
    }

    off(eventTipe, callback) {
        this.$el.removeEventListener(eventTipe, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if ( Element.prototype.append ) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    id(parce) {
        if (parce) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object
        .keys(styles)
        .forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    addClass(className) {
        this.$el.classList.add(className)
    }
    removeClass(className) {
        this.$el.classList.remove(className)
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}