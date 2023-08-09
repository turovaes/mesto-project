export class Section {
    constructor({ items, renderer }, selectorContainer){
        this._items = items.reverse();
        this._renderer = renderer;
        this._selectorContainer = document.querySelector(selectorContainer);
    }

    renderer(){
        this._items.forEach((card) => this._renderer(card, this.addItem.bind(this)));
    }

    addItem(itemCard){
        this._selectorContainer.prepend(itemCard)
    }
}