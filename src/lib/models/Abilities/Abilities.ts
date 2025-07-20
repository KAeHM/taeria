import { Knowledge, KnowledgeLevel } from "../Knowledges/Knowledges";
import { ResourceType } from "../Traits/Traits";



export class Ability {
    name: string;
    knowledges: Knowledge[];
    markdown: string;
    cost: number;
    resource: ResourceType;
    requiredLevel: KnowledgeLevel;
    requirements: string[];

    constructor(name: string, markdown: string, knowledges: Knowledge[], cost: number, resource: ResourceType, requiredLevel: KnowledgeLevel, requirements: string[]) {
        this.name = name;
        this.knowledges = knowledges;
        this.markdown = markdown;
        this.cost = cost;
        this.resource = resource;
        this.requiredLevel = requiredLevel;
        this.requirements = requirements;
    }
}

