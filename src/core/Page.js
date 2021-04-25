export class Page {
    constructor(params) {
        this.patams = params
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender() {}

    destroy() {}
}