export enum ModifierType {
  Dice = "DICE",
  Number = "NUMBER",
  NotSet = "NOT_SET",
}

export enum ModifierOrigin {
  Race = "RACE",
  Class = "CLASS",
  Item = "ITEM",
  Skill = "SKILL",
  Spell = "SPELL",
  Knowledge = "KNOWLEDGE",
  Background = "BACKGROUND",
  Other = "OTHER",
  NotSet = "NOT_SET",
}

export class Modifier {
  constructor(
    name: string,
    origin: ModifierOrigin,
    type: ModifierType,
    value: string,
    description?: string,
    isActive?: boolean
  ) {
    this.name = name;
    this.description = description || "NOT_SET";
    this.origin = origin;
    this.type = type;
    this.isActive = isActive || false;
    this.value = value;
  }

  name: string = "NOT_SET";
  description: string = "NOT_SET";
  origin: ModifierOrigin = ModifierOrigin.NotSet;
  type: ModifierType = ModifierType.NotSet;
  isActive: boolean = false;
  value: string = "";

  static getValue(modifiers: Modifier[]) {
    const toShow = [];

    const sumNumber = modifiers.reduce((acc, current) => {
      if (current.type === ModifierType.Number) {
        return acc + Number(current.value);
      }
      return acc;
    }, 0);

    if (sumNumber > 0) {
      toShow.push(sumNumber);
    }

    const dices = modifiers
      .filter((modifier) => modifier.type === ModifierType.Dice)
      .map((modifier) => modifier.value)
      .join(" + ");

    if (dices.length > 0) {
      toShow.push(dices);
    }

    if (toShow.length === 0) {
      return "0";
    }

    return toShow.join(" + ");
  }

  static getNumberValue(modifiers: Modifier[]): number {
    return modifiers.reduce((acc, current) => {
      if (current.type === ModifierType.Number) {
        return acc + Number(current.value);
      }
      return acc;
    }, 0);
  }
}
