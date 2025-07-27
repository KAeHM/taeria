import { Character } from "../Character/Character";
import { Modifier } from "../Modifier/Modifier";

export enum TraitsType {
  HitPoints = "Vitalidade",
  DamageThreshold = "Defesa (DT)",
  Adrenaline = "Adrenalina",
  Mana = "Mana",
  Estresse = "Estresse",
  Stealth = "Camuflagem",
  Perception = "Percepção",
  PhysicalDefense = "Defesa Física",
  MagicDefense = "Defesa Mágica",
  ActionPoints = "Pontos de Ação",
  SaveThrowSocial = "Salva-Guarda Social",
  SaveThrowIntelectual = "Salva-Guarda Intelectual",
  SaveThrowPhysical = "Salva-Guarda Físico",
  SaveThrowMagic = "Salva-Guarda Mágico",
  InventoryCapacity = "Capacidade de Inventário",
  Damage = "Rolagem de Dano",
}

export enum ResourceType {
  Adrenaline = TraitsType.Adrenaline,
  Mana = TraitsType.Mana,
  Estresse = TraitsType.Estresse,
  NotSet = "NOT_SET",
}

export const ListResources = [
  ResourceType.Adrenaline,
  ResourceType.Mana,
  ResourceType.Estresse,
];

export const ListTraits = [
  TraitsType.HitPoints,
  TraitsType.DamageThreshold,
  TraitsType.Adrenaline,
  TraitsType.Mana,
  TraitsType.Estresse,
  TraitsType.Stealth,
  TraitsType.Perception,
  TraitsType.PhysicalDefense,
  TraitsType.MagicDefense,
  TraitsType.ActionPoints,
  TraitsType.SaveThrowSocial,
  TraitsType.SaveThrowIntelectual,
  TraitsType.SaveThrowPhysical,
  TraitsType.SaveThrowMagic,
  TraitsType.InventoryCapacity,
  TraitsType.Damage,
];

export class Trait {
  name: string;
  description: string;
  value: Modifier[];
  current: Modifier[];

  constructor(
    name: string,
    description: string,
    value: Modifier[],
    current: Modifier[]
  ) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.current = current;
  }

  updateCharacterTraitCurrent(newCurrent: Modifier[], character: Character) {
    character.traits = character.traits.map((trait) => {
      if (trait.name === this.name) {
        trait.current = newCurrent;
      }
      return trait;
    });

    return character;
  }
}

export const HitPoints = new Trait(
  TraitsType.HitPoints,
  "Vitalidade é a quantidade de vida do personagem.",
  [],
  []
);
export const DamageThreshold = new Trait(
  TraitsType.DamageThreshold,
  "DT é o valor que o personagem precisa para não sofrer dano.",
  [],
  []
);
export const Adrenaline = new Trait(
  TraitsType.Adrenaline,
  "A adrenalina é um recurso utilizado em habilidades do atributo físico.",
  [],
  []
);
export const Mana = new Trait(
  TraitsType.Mana,
  "Mana é um recurso utilizado em habilidades do atributo mágico.",
  [],
  []
);
export const Estresse = new Trait(
  TraitsType.Estresse,
  "Estresse é um recurso utilizado em habilidades do atributo Social e Intelectual.",
  [],
  []
);
export const Stealth = new Trait(
  TraitsType.Stealth,
  "Camuflagem é a habilidade do personagem de se esconder ou se mover silenciosamente.",
  [],
  []
);
export const Perception = new Trait(
  TraitsType.Perception,
  "Percepção é a habilidade do personagem de perceber detalhes e se manter alerta.",
  [],
  []
);
export const PhysicalDefense = new Trait(
  TraitsType.PhysicalDefense,
  "Defesa Física é a resistência do personagem a danos físicos.",
  [],
  []
);
export const MagicDefense = new Trait(
  TraitsType.MagicDefense,
  "Defesa Mágica é a resistência do personagem a danos mágicos.",
  [],
  []
);
export const ActionPoints = new Trait(
  TraitsType.ActionPoints,
  "Pontos de Ação são um recurso utilizado em ações do personagem em rodadas.",
  [],
  []
);
export const SaveThrowSocial = new Trait(
  TraitsType.SaveThrowSocial,
  "Salva-Guarda Social é a habilidade do personagem de se salvar de ataques ou efeitos.",
  [],
  []
);
export const SaveThrowIntelectual = new Trait(
  TraitsType.SaveThrowIntelectual,
  "Salva-Guarda Intelectual é a habilidade do personagem de se salvar de ataques ou efeitos.",
  [],
  []
);
export const SaveThrowPhysical = new Trait(
  TraitsType.SaveThrowPhysical,
  "Salva-Guarda Físico é a habilidade do personagem de se salvar de ataques ou efeitos.",
  [],
  []
);
export const SaveThrowMagic = new Trait(
  TraitsType.SaveThrowMagic,
  "Salva-Guarda Mágico é a habilidade do personagem de se salvar de ataques ou efeitos.",
  [],
  []
);
export const InventoryCapacity = new Trait(
  TraitsType.InventoryCapacity,
  "Capacidade de Inventário é a quantidade de itens que o personagem pode carregar.",
  [],
  []
);
export const Damage = new Trait(
  TraitsType.Damage,
  "Rolagem de Dano do personagem.",
  [],
  []
);

export const TraitList = [
  HitPoints,
  DamageThreshold,
  Adrenaline,
  Mana,
  Estresse,
  Stealth,
  Perception,
  PhysicalDefense,
  MagicDefense,
  ActionPoints,
  SaveThrowSocial,
  SaveThrowIntelectual,
  SaveThrowPhysical,
  SaveThrowMagic,
  InventoryCapacity,
  Damage,
];
