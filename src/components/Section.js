export class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
    }

    renderer(cards) {
        this._items = cards || this._items;
        this._items.forEach((card) => {
            const cardElement = this._renderer(card);
            this.addItem(cardElement);
        });
    }

    addItem(itemCard) {
        this._container.prepend(itemCard)
    }
}