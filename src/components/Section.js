export class Section {
    constructor({items, renderer}, selectorContainer){
        this._items = items;
        this._renderer = renderer;
        this._selectorContainer = document.querySelector(selectorContainer);
    }

    renderer(){
        this._items.forEach(this._renderer);
    }

    addItem(itemCard){
        this._selectorContainer.prepend(itemCard)
    }
}