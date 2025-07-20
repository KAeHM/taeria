import {
  Attribute,
  AttributeList,
  AttributeType,
} from "../Attributes/Attributes";
import { Inventory } from "../Inventory/Inventory";
import { Knowledge, KnowledgeList } from "../Knowledges/Knowledges";
import { Modifier, ModifierOrigin, ModifierType } from "../Modifier/Modifier";
import { HumanoRace, Race } from "../Race/Race";

import { Trait, TraitList, TraitsType } from "../Traits/Traits";

export interface CharacterLoreData {
  age: number;
  height: number;
  weight: number;
  title: string;
  imageURL: string;
}

export class Character {
  id: string;
  name: string;
  level: number;
  xp: number;
  attributes: Attribute[];
  traits: Trait[];
  knowledges: Knowledge[];
  abilities: string[];
  race: Race;
  lore: CharacterLoreData;
  inventory: Inventory;
  constructor(
    id: string,
    name: string,
    level: number,
    xp: number,
    attributes: Attribute[],
    traits: Trait[],
    knowledges: Knowledge[],
    abilities: string[],
    race: Race,
    lore: CharacterLoreData,
    inventory: Inventory
  ) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.xp = xp;
    this.attributes = attributes;
    this.traits = traits;
    this.knowledges = knowledges;
    this.abilities = abilities;
    this.race = race;
    this.lore = lore;
    this.inventory = inventory;
  }

  get getCharacter() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      xp: this.xp,
      attributes: this.attributes,
      traits: this.traits,
      knowledges: this.knowledges,
      abilities: this.abilities,
      race: this.race,
    };
  }

  updateCharacterName(newName: string, character: Character): Character {
    const updatedCharacter = new Character(
      character.id,
      newName,
      character.level,
      character.xp,
      character.attributes,
      character.traits,
      character.knowledges,
      character.abilities,
      character.race,
      character.lore,
      character.inventory
    );

    return updatedCharacter;
  }

  updateCharacterLore(
    newLore: CharacterLoreData,
    character: Character
  ): Character {
    const updatedLore = {
      ...character.lore,
      ...newLore,
    };

    const updatedCharacter = new Character(
      character.id,
      character.name,
      character.level,
      character.xp,
      character.attributes,
      character.traits,
      character.knowledges,
      character.abilities,
      character.race,
      updatedLore,
      character.inventory
    );

    return updatedCharacter;
  }

  static createCharacter(
    id: string,
    name: string,
    level: number,
    xp: number,
    attributes: Attribute[],
    traits: Trait[],
    knowledges: Knowledge[],
    abilities: string[],
    race: Race,
    lore: CharacterLoreData,
    inventory: Inventory
  ) {
    return new Character(
      id,
      name,
      level,
      xp,
      attributes,
      traits,
      knowledges,
      abilities,
      race,
      lore,
      inventory
    );
  }

  static createDefaultCharacter() {
    const attributes = Object.keys(HumanoRace.attributes).map((attribute) => {
      const AttributeFromMock = AttributeList.find(
        (attributeList) => attributeList.name === attribute
      ) as Attribute;

      const newAttribute = new Attribute(
        attribute as AttributeType,
        AttributeFromMock.description,
        [
          new Modifier(
            attribute as AttributeType,
            ModifierOrigin.Race,
            ModifierType.Number,
            HumanoRace.attributes[attribute as AttributeType],
            AttributeFromMock.description
          ),
        ],
        [
          new Modifier(
            attribute as AttributeType,
            ModifierOrigin.Race,
            ModifierType.Number,
            HumanoRace.attributes[attribute as AttributeType],
            AttributeFromMock.description
          ),
        ]
      );
      return newAttribute;
    });

    const traits = Object.keys(HumanoRace.traits).map((trait) => {
      const TraitFromMock = TraitList.find(
        (traitList) => traitList.name === (trait as TraitsType)
      ) as Trait;

      const newTrait = new Trait(
        trait as TraitsType,
        TraitFromMock.description,
        [
          new Modifier(
            trait as TraitsType,
            ModifierOrigin.Race,
            ModifierType.Number,
            HumanoRace.traits[trait as TraitsType],
            TraitFromMock.description
          ),
        ],
        [
          new Modifier(
            trait as TraitsType,
            ModifierOrigin.Race,
            ModifierType.Number,
            HumanoRace.traits[trait as TraitsType],
            TraitFromMock.description
          ),
        ]
      );
      return newTrait;
    });

    return new Character(
      crypto.randomUUID(),
      "Novo Personagem",
      1,
      0,
      attributes,
      traits,
      KnowledgeList,
      [],
      HumanoRace,
      {
        age: 20,
        height: 1.8,
        weight: 80,
        title: "Titulo do Personagem",
        imageURL:
          "https://cdn.discordapp.com/attachments/941040169853792307/1396587340180492410/default-avatar-icon-of-social-media-user-vector.png?ex=687ea0d1&is=687d4f51&hm=6f8ca6be557d05cad44e2880f7720b9d1e72172f0641fc57fd86fc5b09190790&",
      },
      Inventory.createNewInventory()
    );
  }
}
