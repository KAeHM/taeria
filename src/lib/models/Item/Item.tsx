import { AttributeType } from "../Attributes/Attributes";
import { Modifier } from "../Modifier/Modifier";
import { TraitsType } from "../Traits/Traits";

export enum ItemType {
    WEAPON = "Arma",
    ARMOR = "Armadura",
    ACCESSORY = "Acessório",
    CONSUMABLE = "Consumível",
    MATERIAL = "Material",
    OTHER = "Outro",
}

export enum ItemRarity {
    COMMON = "Comum",
    UNCOMMON = "Incomum",
    RARE = "Raro",
    EPIC = "Épico",
    LEGENDARY = "Lendário",
}

export enum ItemQuality {
    DESTROYED = "Destruído",
    POOR = "Baixa",
    FAIR = "Média",
    GOOD = "Alta",
    EXCELLENT = "Magnífico",
}

export enum ItemModifierType {
    ATTRIBUTE = "Atributo",
    TRAIT = "Traço",
    ABILITY = "Habilidade",
}

export interface ItemModifier<T extends ItemModifierType> {
    name: string;
    path: {
        type: T;
        name: ModifierTypeMap[T];
    };
    value: string;
}

type ModifierTypeMap = {
    [ItemModifierType.ATTRIBUTE]: AttributeType;
    [ItemModifierType.TRAIT]: TraitsType;
    [ItemModifierType.ABILITY]: string;
};



export class Item {
    name: string;
    description: string;
    quantity: number;
    weight: number;
    value: number;
    isActive: boolean;
    quality: ItemQuality;
    type: ItemType;
    rarity: ItemRarity;
    itemModifiers: ItemModifier<ItemModifierType>[];

    constructor(
        name: string,
        description: string,
        quantity: number,
        weight: number,
        value: number,
        quality: ItemQuality,
        type: ItemType,
        rarity: ItemRarity,
        isActive: boolean,
        itemModifiers: ItemModifier<ItemModifierType>[]
    ) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.weight = weight;
        this.value = value;
        this.quality = quality;
        this.type = type;
        this.rarity = rarity;
        this.isActive = isActive;
        this.itemModifiers = itemModifiers;
    }
}
