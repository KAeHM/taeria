import { Attribute, AttributeType } from "../Attributes/Attributes";
import { Character } from "../Character/Character";
import {
  Anao,
  Ascommani,
  Brakkal,
  Draconico,
  Durkhan,
  Espectral,
  Galgoro,
  Humano,
  Knowledge,
} from "../Knowledges/Knowledges";
import { Modifier, ModifierOrigin } from "../Modifier/Modifier";
import { Trait, TraitsType } from "../Traits/Traits";

export type RaceTraits = Record<TraitsType, string>;

export type RaceAttributes = Record<AttributeType, string>;

export class Race {
  name: string;
  traits: RaceTraits;
  attributes: RaceAttributes;
  knowledge: Knowledge;

  constructor(
    name: string,
    traits: RaceTraits,
    attributes: RaceAttributes,
    knowledge: Knowledge
  ) {
    this.name = name;
    this.traits = traits;
    this.attributes = attributes;
    this.knowledge = knowledge;
  }

  updateCharacterRace(newRace: Race, character: Character): Character {
    // Atualiza a raça do personagem
    character.race = newRace;

    // Atualiza os Traits do personagem
    character.traits = character.traits.map((trait) => {
      const newModifiers = trait.value.map((modifier) => {
        const newValue = newRace.traits[modifier.name as TraitsType];
        if (modifier.origin === ModifierOrigin.Race) {
          const newModifier = new Modifier(
            modifier.name,
            ModifierOrigin.Race,
            modifier.type,
            newValue
          );
          return newModifier;
        }
        return modifier;
      });

      return new Trait(
        trait.name,
        trait.description,
        newModifiers,
        newModifiers
      );
    });

    // Atualiza os atributos do personagem
    character.attributes = character.attributes.map((attribute) => {
      const newModifiers = attribute.value.map((modifier) => {
        const newValue = newRace.attributes[modifier.name as AttributeType];
        if (modifier.origin === ModifierOrigin.Race) {
          const newModifier = new Modifier(
            modifier.name,
            ModifierOrigin.Race,
            modifier.type,
            newValue
          );
          return newModifier;
        }
        return modifier;
      });

      return new Attribute(
        attribute.name,
        attribute.description,
        newModifiers,
        newModifiers
      );
    });

    return character;
  }
}

export const AnaoRace = new Race(
  "Anão",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "4",
    [TraitsType.MagicDefense]: "0",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "2",
    [TraitsType.SaveThrowPhysical]: "0",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "12",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "0",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "2",
    [AttributeType.Magic]: "0",
  },
  Anao
);

export const AscRace = new Race(
  "Asc",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "32",
    [TraitsType.Estresse]: "8",
    [TraitsType.Stealth]: "0",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "0",
    [TraitsType.MagicDefense]: "4",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "0",
    [TraitsType.SaveThrowIntelectual]: "2",
    [TraitsType.SaveThrowPhysical]: "0",
    [TraitsType.SaveThrowMagic]: "2",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "0",
    [AttributeType.Social]: "0",
    [AttributeType.Intelectual]: "2",
    [AttributeType.Magic]: "2",
  },
  Ascommani
);

export const DurkhanRace = new Race(
  "Durkhan",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "8",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d12",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "0",
    [TraitsType.SaveThrowMagic]: "2",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "0",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "2",
  },
  Durkhan
);

export const EspectralRace = new Race(
  "Espectral",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "16",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d12",
    [TraitsType.PhysicalDefense]: "4",
    [TraitsType.MagicDefense]: "0",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "0",
  },
  Espectral
);

export const GalgoroRace = new Race(
  "Galgoro",
  {
    [TraitsType.HitPoints]: "32",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "16",
    [TraitsType.Estresse]: "16",
    [TraitsType.Stealth]: "0",
    [TraitsType.Perception]: "1d4",
    [TraitsType.PhysicalDefense]: "4",
    [TraitsType.MagicDefense]: "4",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "16",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "0",
  },
  Galgoro
);

export const BrakkalRace = new Race(
  "Brakkal",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "10",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "8",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d12",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "0",
    [TraitsType.SaveThrowIntelectual]: "2",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "0",
    [AttributeType.Intelectual]: "2",
    [AttributeType.Magic]: "0",
  },
  Brakkal
);

export const SautreRace = new Race(
  "Sautre",
  {
    [TraitsType.HitPoints]: "32",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "10",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "16",
    [TraitsType.Stealth]: "0",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "4",
    [TraitsType.MagicDefense]: "0",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "0",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "2",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "0",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "2",
  },
  Draconico
);

export const HumanoRace = new Race(
  "Humano",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "0",
  },
  Humano
);

export const HumanBrakkalRace = new Race(
  "Humano-Brakkal",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "0",
  },
  Brakkal
);

export const HumanDurkhanRace = new Race(
  "Humano-Durkhan",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "0",
    [TraitsType.SaveThrowMagic]: "2",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "0",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "2",
  },
  Durkhan
);

export const HumanAnaoRace = new Race(
  "Humano-Anão",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "2",
    [TraitsType.SaveThrowPhysical]: "0",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "10",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "0",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "2",
    [AttributeType.Magic]: "0",
  },
  Anao
);

export const HumanGalgoroRace = new Race(
  "Humano-Galgoro",
  {
    [TraitsType.HitPoints]: "24",
    [TraitsType.DamageThreshold]: "10",
    [TraitsType.Adrenaline]: "6",
    [TraitsType.Mana]: "24",
    [TraitsType.Estresse]: "24",
    [TraitsType.Stealth]: "4",
    [TraitsType.Perception]: "1d8",
    [TraitsType.PhysicalDefense]: "2",
    [TraitsType.MagicDefense]: "2",
    [TraitsType.ActionPoints]: "4",
    [TraitsType.SaveThrowSocial]: "2",
    [TraitsType.SaveThrowIntelectual]: "0",
    [TraitsType.SaveThrowPhysical]: "2",
    [TraitsType.SaveThrowMagic]: "0",
    [TraitsType.InventoryCapacity]: "12",
    [TraitsType.Damage]: "0",
  },
  {
    [AttributeType.Physical]: "2",
    [AttributeType.Social]: "2",
    [AttributeType.Intelectual]: "0",
    [AttributeType.Magic]: "0",
  },
  Galgoro
);

export const RaceList = [
  AnaoRace,
  AscRace,
  DurkhanRace,
  EspectralRace,
  GalgoroRace,
  BrakkalRace,
  SautreRace,
  HumanoRace,
  HumanBrakkalRace,
  HumanDurkhanRace,
  HumanAnaoRace,
  HumanGalgoroRace,
];
