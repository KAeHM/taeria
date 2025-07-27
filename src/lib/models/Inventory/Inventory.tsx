
import { Attribute } from "../Attributes/Attributes";
import { Character } from "../Character/Character";
import { Item, ItemModifierType, ItemQuality, ItemRarity, ItemType } from "../Item/Item";
import { Modifier, ModifierOrigin, ModifierType } from "../Modifier/Modifier";
import { Trait } from "../Traits/Traits";


export class Inventory {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    static createNewInventory() {
        return new Inventory([new Item('Moedas', 'Teste', 10, 0.01, 0, ItemQuality.FAIR, ItemType.OTHER, ItemRarity.COMMON, false, [])]);
    }


    equipItem(item: Item, character: Character): Character {

        if (item.itemModifiers.length > 0) {
            item.itemModifiers.forEach((itemModifier => {
                if (itemModifier.path.type == ItemModifierType.TRAIT) {
                    character.traits = character.traits.map(characterTrait => {
                        if (characterTrait.name == itemModifier.path.name) {
                            const newModifier = new Modifier(item.name, ModifierOrigin.Item, itemModifier.value.includes('d') ? ModifierType.Dice : ModifierType.Number, itemModifier.value)
                            return new Trait(characterTrait.name, characterTrait.description, [...characterTrait.value, newModifier], characterTrait.current)
                        }
                        return characterTrait
                    })
                }

                if (itemModifier.path.type == ItemModifierType.ATTRIBUTE) {
                    character.attributes = character.attributes.map(characterAttribute => {
                        if (characterAttribute.name == itemModifier.path.name) {
                            const newModifier = new Modifier(item.name, ModifierOrigin.Item, itemModifier.value.includes('d') ? ModifierType.Dice : ModifierType.Number, itemModifier.value)
                            return new Attribute(characterAttribute.name, characterAttribute.description, [...characterAttribute.value, newModifier], characterAttribute.current)
                        }

                        return characterAttribute
                    })
                }
            }))
        }

        character.inventory.items = character.inventory.items.map((currentItem) => {
            if (item.name == currentItem.name) {
                currentItem.isActive = true
            }
            return currentItem
        })

        return character
    }

    unequipItem(item: Item, character: Character): Character {
        if (item.itemModifiers.length > 0) {
            item.itemModifiers.forEach((itemModifier => {
                if (itemModifier.path.type == ItemModifierType.TRAIT) {
                    character.traits = character.traits.map(characterTrait => {
                        if (characterTrait.name == itemModifier.path.name) {
                            characterTrait.value = characterTrait.value.filter(modifiers => modifiers.name != item.name)
                        }
                        return characterTrait
                    })
                }

                if (itemModifier.path.type == ItemModifierType.ATTRIBUTE) {
                    character.attributes = character.attributes.map(characterAttribute => {
                        if (characterAttribute.name == itemModifier.path.name) {
                            characterAttribute.value = characterAttribute.value.filter(modifiers => modifiers.name != item.name)
                        }
                        return characterAttribute
                    })
                }
            }))
        }

        character.inventory.items = character.inventory.items.map((currentItem) => {
            if (item.name == currentItem.name) {
                currentItem.isActive = false
            }
            return currentItem
        })

        return character
    }

    addItem(item: Item): Inventory {
        const newItems = [...this.items, item];
        return new Inventory(newItems);
    }

    removeItem(item: Item): Inventory {
        const newItems = this.updateItem(new Item(item.name, item.description, 0, item.weight, item.value, item.quality, item.type, item.rarity, item.isActive, item.itemModifiers), item.name);
        return newItems
    }

    updateItem(item: Item, oldName: string): Inventory {
        const newItems = this.items.map(i => i.name === oldName ? item : i);
        return new Inventory(newItems);
    }

    getItem(name: string) {
        return this.items.find(i => i.name === name);
    }

    getItems() {
        return this.items.filter(item => item.quantity > 0);
    }


}