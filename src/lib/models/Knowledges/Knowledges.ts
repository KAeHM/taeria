import { AttributeType } from "../Attributes/Attributes";
import { Character } from "../Character/Character";
import { Modifier, ModifierOrigin, ModifierType } from "../Modifier/Modifier";
import { ResourceType, TraitsType } from "../Traits/Traits";

export enum KnowledgeLevel {
  NotSet = 0,
  Basic = 1,
  Intermediate = 2,
  Advanced = 3,
  Expert = 4,
}

export enum KnowledgeType {
  Bardo = "Bardo",
  Academico = "Academico",
  Alquimista = "Alquimista",
  Atirador = "Atirador",
  Comerciante = "Comerciante",
  Diplomata = "Diplomata",
  Encantador = "Encantador",
  Engenheiro = "Engenheiro",
  Guerreiro = "Guerreiro",
  Ladino = "Ladino",
  Mago = "Mago",
  Religioso = "Religioso",
}

export interface KnowledgeProgression {
  abilities?: string[];
  traits?: [TraitsType, Modifier][];
}

export class Knowledge {
  name: string;
  markdown: string;
  attribute: AttributeType;
  resource: ResourceType;
  currentLevel: KnowledgeLevel;
  currentXp: number;
  progressionByLevel: { [key in KnowledgeLevel]: KnowledgeProgression };

  constructor(
    name: string,
    markdown: string,
    attribute: AttributeType,
    resource: ResourceType,
    currentLevel: KnowledgeLevel,
    currentXp: number,
    progressionByLevel: { [key in KnowledgeLevel]: KnowledgeProgression }
  ) {
    this.name = name;
    this.markdown = markdown;
    this.attribute = attribute;
    this.resource = resource;
    this.currentLevel = currentLevel;
    this.currentXp = currentXp;
    this.progressionByLevel = progressionByLevel;
  }

  updateCharacterKnowledge(
    newKnowledge: Knowledge,
    character: Character
  ): Character {
    // Atualiza o nível e o XP do conhecimento
    character.knowledges.map((knowledge) => {
      if (knowledge.name === newKnowledge.name) {
        knowledge.currentLevel = newKnowledge.currentLevel;
        knowledge.currentXp = newKnowledge.currentXp;
      }
    });

    // Atualiza o XP e o nível do personagem
    character.xp = character.knowledges.reduce((acc, knowledge) => {
      return acc + knowledge.currentXp;
    }, 0);
    character.level = character.knowledges.reduce((acc, knowledge) => {
      return acc + knowledge.currentLevel;
    }, 0);

    // Atualiza o nível e o XP do atributo
    character.attributes = character.attributes.map((attribute) => {
      if (attribute.name === newKnowledge.attribute) {
        const findModifier = attribute.value.find(
          (modifier) =>
            modifier.origin === ModifierOrigin.Knowledge &&
            modifier.name === newKnowledge.name
        );

        if (findModifier) {
          attribute.value = attribute.value.map((modifier) => {
            if (
              modifier.origin === ModifierOrigin.Knowledge &&
              modifier.name === newKnowledge.name
            ) {
              return new Modifier(
                modifier.name,
                modifier.origin,
                modifier.type,
                newKnowledge.currentLevel.toString(),
                modifier.description,
                modifier.isActive
              );
            }
            return modifier;
          });
        } else {
          attribute.value.push(
            new Modifier(
              newKnowledge.name,
              ModifierOrigin.Knowledge,
              ModifierType.Number,
              newKnowledge.currentLevel.toString()
            )
          );
        }
      }

      return attribute;
    });

    // Adiciona as habilidades do conhecimento ao personagem
    const levels = Object.keys(this.progressionByLevel).map(
      Number
    ) as KnowledgeLevel[];

    levels.forEach((level: KnowledgeLevel) => {
      if (level <= newKnowledge.currentLevel) {
        this.progressionByLevel[level].abilities?.forEach((ability: string) => {
          if (!character.abilities.includes(ability)) {
            character.abilities.push(ability);
          }
        });
      }
      // Caso o conhecimento seja menor do que antes, remove as habilidade de nível superior do personagem
      else {
        if (
          character.abilities.some((ability) =>
            this.progressionByLevel[level].abilities?.includes(ability)
          )
        ) {
          character.abilities = character.abilities.filter(
            (ability) =>
              !this.progressionByLevel[level].abilities?.includes(ability)
          );
        }
      }
    });

    return character;
  }
}

export const Bardo = new Knowledge(
  "Bardo",
  "Bardo.md",
  AttributeType.Social,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: {
      abilities: ["Interpretação", "Exposição do Interior"],
    },
    [KnowledgeLevel.Intermediate]: { abilities: ["Transcendência Criativa"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Segunda Chance"] },
    [KnowledgeLevel.Expert]: { abilities: ["Mestre da Sensação"] },
  }
);

export const Academico = new Knowledge(
  "Academico",
  "Academico.md",
  AttributeType.Intelectual,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Erudição Rápida"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Mapa Mental", "Lógica Dedutiva"],
    },
    [KnowledgeLevel.Advanced]: { abilities: ["Antecipação Tática"] },
    [KnowledgeLevel.Expert]: { abilities: ["Gênio Universal"] },
  }
);

export const Alquimista = new Knowledge(
  "Alquimista",
  "Alquimista.md",
  AttributeType.Intelectual,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Mistura Rápida"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Aprimoramento Alquímico", "Coleta Precisa"],
    },
    [KnowledgeLevel.Advanced]: { abilities: ["Tratamento de Emergência"] },
    [KnowledgeLevel.Expert]: { abilities: ["Elixir Supremo"] },
  }
);

export const Atirador = new Knowledge(
  "Atirador",
  "Atirador.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Tiro Focalizado"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Disparo Rápido", "Retirada Estratégica"],
    },
    [KnowledgeLevel.Advanced]: { abilities: ["Olho de Falcão"] },
    [KnowledgeLevel.Expert]: { abilities: ["Morte à Distância"] },
  }
);

export const Comerciante = new Knowledge(
  "Comerciante",
  "Comerciante.md",
  AttributeType.Social,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: {
      abilities: ["Avaliação Instintiva", "Persuasão de Mercado"],
    },
    [KnowledgeLevel.Intermediate]: { abilities: [] },
    [KnowledgeLevel.Advanced]: { abilities: ["Senso de Oportunidade"] },
    [KnowledgeLevel.Expert]: { abilities: [] },
  }
);

export const Diplomata = new Knowledge(
  "Diplomata",
  "Diplomata.md",
  AttributeType.Social,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: {
      abilities: ["Leitura Social", "Imposição Diplomática"],
    },
    [KnowledgeLevel.Intermediate]: { abilities: ["Influência Gradual"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Pressão Implacável"] },
    [KnowledgeLevel.Expert]: { abilities: ["Mente Dominadora"] },
  }
);

export const Encantador = new Knowledge(
  "Encantador",
  "Encantador.md",
  AttributeType.Magic,
  ResourceType.Mana,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Aplicar Efeito", "Encantar"] },
    [KnowledgeLevel.Intermediate]: { abilities: ["Vínculo Estável"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Teia de Efeitos"] },
    [KnowledgeLevel.Expert]: { abilities: ["Encantamento Supremo"] },
  }
);

export const Engenheiro = new Knowledge(
  "Engenheiro",
  "Engenheiro.md",
  AttributeType.Intelectual,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Montagem Rápida"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Aprimoramento Prática", "Coleta Eficiente"],
    },
    [KnowledgeLevel.Advanced]: { abilities: ["Engenhoca de Emergência"] },
    [KnowledgeLevel.Expert]: { abilities: ["Obra-Prima"] },
  }
);

export const Guerreiro = new Knowledge(
  "Guerreiro",
  "Guerreiro.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Investida Tática"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Ataque Preciso", "Bloqueio Impecável"],
    },
    [KnowledgeLevel.Advanced]: {
      abilities: ["Fúria Controlada", "Muralha Inabalável"],
    },
    [KnowledgeLevel.Expert]: { abilities: ["Mestre dos Estilos"] },
  }
);

export const Ladino = new Knowledge(
  "Ladino",
  "Ladino.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Ataque Oportuno"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Golpe Explorado", "Evasão Ágil"],
    },
    [KnowledgeLevel.Advanced]: {
      abilities: ["Crítico Oportunista", "Desaparecer nas Sombras"],
    },
    [KnowledgeLevel.Expert]: { abilities: ["Mestre das Brechas"] },
  }
);

export const Mago = new Knowledge(
  "Mago",
  "Mago.md",
  AttributeType.Magic,
  ResourceType.Mana,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Canalizar Mana"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Amplificar Fluxo", "Escudo Arcano"],
    },
    [KnowledgeLevel.Advanced]: { abilities: [] },
    [KnowledgeLevel.Expert]: { abilities: ["Arcanum Supremo"] },
  }
);

export const Religioso = new Knowledge(
  "Religioso",
  "Religioso.md",
  AttributeType.Magic,
  ResourceType.Mana,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Ritual de Aliança"] },
    [KnowledgeLevel.Intermediate]: { abilities: [] },
    [KnowledgeLevel.Advanced]: { abilities: ["Intercessão Divina"] },
    [KnowledgeLevel.Expert]: { abilities: ["Avatar da Fé"] },
  }
);

export const Anao = new Knowledge(
  "Anão",
  "Anão.md",
  AttributeType.Intelectual,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: {
      abilities: [
        "Forjamento Tático Lâmina Afiada",
        "Forjamento Tático Munição Elemental",
      ],
    },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Forjamento Tático Reforço de Armadura"],
    },
    [KnowledgeLevel.Advanced]: { abilities: [] },
    [KnowledgeLevel.Expert]: { abilities: ["Forjar Arma-Legado"] },
  }
);

export const Ascommani = new Knowledge(
  "Asc",
  "Asc.md",
  AttributeType.Magic,
  ResourceType.Mana,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Toque Gélido"] },
    [KnowledgeLevel.Intermediate]: { abilities: ["Muralha Glacial"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Nevasca Localizada"] },
    [KnowledgeLevel.Expert]: { abilities: ["Forma Glacial"] },
  }
);

export const Brakkal = new Knowledge(
  "Brakkal",
  "Brakkal.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Grito Territorial"] },
    [KnowledgeLevel.Intermediate]: {
      abilities: ["Bote Predatório", "Pisotear em Manada"],
    },
    [KnowledgeLevel.Advanced]: {
      abilities: ["Faro de Sangue", "Postura Inabalável"],
    },
    [KnowledgeLevel.Expert]: { abilities: ["Instinto Primal"] },
  }
);

export const Draconico = new Knowledge(
  "Dracônico",
  "Dracônico.md",
  AttributeType.Magic,
  ResourceType.Mana,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Sopro Dracônico"] },
    [KnowledgeLevel.Intermediate]: { abilities: ["Escamas de Dragão"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Presença Aterradora"] },
    [KnowledgeLevel.Expert]: { abilities: ["Forma Dracônica Parcial"] },
  }
);

export const Durkhan = new Knowledge(
  "Durkhan",
  "Durkhan.md",
  AttributeType.Social,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: {
      abilities: ["Contrabandista Habilidoso", "Performance Cativante"],
    },
    [KnowledgeLevel.Intermediate]: { abilities: [] },
    [KnowledgeLevel.Advanced]: { abilities: [] },
    [KnowledgeLevel.Expert]: { abilities: ["Metamorfose Perfeita"] },
  }
);

export const Espectral = new Knowledge(
  "Espectral",
  "Espectral.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: [] },
    [KnowledgeLevel.Intermediate]: { abilities: [] },
    [KnowledgeLevel.Advanced]: { abilities: [] },
    [KnowledgeLevel.Expert]: { abilities: ["Metamorfose de Batalha"] },
  }
);

export const Galgoro = new Knowledge(
  "Galgoro",
  "Galgoro.md",
  AttributeType.Physical,
  ResourceType.Adrenaline,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Soco Fortificado"] },
    [KnowledgeLevel.Intermediate]: { abilities: ["Pele de Pedra"] },
    [KnowledgeLevel.Advanced]: { abilities: ["Terra Tatuada"] },
    [KnowledgeLevel.Expert]: { abilities: ["Banquete das Marcas"] },
  }
);

export const Humano = new Knowledge(
  "Humano",
  "Humano.md",
  AttributeType.Social,
  ResourceType.Estresse,
  KnowledgeLevel.NotSet,
  0,
  {
    [KnowledgeLevel.NotSet]: {},
    [KnowledgeLevel.Basic]: { abilities: ["Discurso Motivador"] },
    [KnowledgeLevel.Intermediate]: { abilities: [] },
    [KnowledgeLevel.Advanced]: { abilities: ["Formar Falange"] },
    [KnowledgeLevel.Expert]: { abilities: ["O Legado de Gyliam Bene"] },
  }
);

export const KnowledgeList = [
  Bardo,
  Academico,
  Alquimista,
  Atirador,
  Comerciante,
  Diplomata,
  Encantador,
  Engenheiro,
  Guerreiro,
  Ladino,
  Mago,
  Religioso,
  Anao,
  Ascommani,
  Brakkal,
  Draconico,
  Durkhan,
  Espectral,
  Galgoro,
  Humano,
];
