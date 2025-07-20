
import { Item } from "../Item/Item";


export class Inventory {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    static createNewInventory() {
        return new Inventory([]);
    }

    addItem(item: Item): Inventory {
        const newItems = [...this.items, item];
        return new Inventory(newItems);
    }

    removeItem(item: Item): Inventory {
        const newItems = this.updateItem(new Item(item.name, item.description, 0, item.weight, item.value, item.quality, item.type, item.rarity, item.isActive, item.changeAttributes, item.changeTraits, item.changeAbilities));
        return newItems
    }

    updateItem(item: Item): Inventory {
        const newItems = this.items.map(i => i.name === item.name ? item : i);
        return new Inventory(newItems);
    }

    getItem(name: string) {
        return this.items.find(i => i.name === name);
    }

    getItems() {
        return this.items;
    }


}