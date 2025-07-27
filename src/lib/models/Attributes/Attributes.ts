import { Modifier } from "../Modifier/Modifier";

export enum AttributeType {
  Physical = "Físico",
  Social = "Social",
  Intelectual = "Intelectual",
  Magic = "Mágico",
}

export const ListAttributes = [
  AttributeType.Physical,
  AttributeType.Social,
  AttributeType.Intelectual,
  AttributeType.Magic,
];

export class Attribute {
  name: AttributeType;
  description: string;
  value: Modifier[];
  current: Modifier[];

  constructor(
    name: AttributeType,
    description: string,
    value: Modifier[],
    current: Modifier[]
  ) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.current = current;
  }
}

export const Physical = new Attribute(
  AttributeType.Physical,
  "Físico é o atributo que representa a força física do personagem.",
  [],
  []
);
export const Social = new Attribute(
  AttributeType.Social,
  "Social é o atributo que representa a habilidade social do personagem.",
  [],
  []
);
export const Intelectual = new Attribute(
  AttributeType.Intelectual,
  "Intelectual é o atributo que representa a habilidade intelectual do personagem.",
  [],
  []
);
export const Magic = new Attribute(
  AttributeType.Magic,
  "Mágico é o atributo que representa a habilidade mágica do personagem.",
  [],
  []
);

export const AttributeList = [Physical, Social, Intelectual, Magic];
