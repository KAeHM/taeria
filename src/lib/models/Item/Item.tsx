import { Modifier } from "../Modifier/Modifier";

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
    changeAttributes?: Modifier[];
    changeTraits?: Modifier[];
    changeAbilities?: Modifier[];

    constructor(name: string, description: string, quantity: number, weight: number, value: number, quality: ItemQuality, type: ItemType, rarity: ItemRarity, isActive: boolean, changeAttributes?: Modifier[], changeTraits?: Modifier[], changeAbilities?: Modifier[]) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.weight = weight;
        this.value = value;
        this.quality = quality;
        this.type = type;
        this.rarity = rarity;
        this.isActive = isActive;
        this.changeAttributes = changeAttributes;
        this.changeTraits = changeTraits;
        this.changeAbilities = changeAbilities;
    }
}