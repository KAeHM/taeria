'use client'

import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { AttributeType } from "@/lib/models/Attributes/Attributes";
import { Modifier } from "@/lib/models/Modifier/Modifier";


export default function CharacterAttributes() {


    const { character } = useCharacterContext();



    return (<div className="w-full flex flex-row justify-between gap-5">
        <div className="border-1 border-red-400 p-3 rounded-lg w-1/4">
            <p className="text-lg text-red-400">{AttributeType.Physical}</p>
            <p className="text-2xl text-red-400 font-bold">{Modifier.getValue(character.attributes.find(attribute => attribute.name === AttributeType.Physical)?.value || []) || "0"}</p>
        </div>
        <div className="border-1 border-blue-400 p-3 rounded-lg w-1/4">
            <p className="text-lg text-blue-400">{AttributeType.Intelectual}</p>
            <p className="text-2xl text-blue-400 font-bold">{Modifier.getValue(character.attributes.find(attribute => attribute.name === AttributeType.Intelectual)?.value || []) || "0"}</p>
        </div>
        <div className="border-1 border-purple-400 p-3 rounded-lg w-1/4">
            <p className="text-lg text-purple-400">{AttributeType.Magic}</p>
            <p className="text-2xl text-purple-400 font-bold">{Modifier.getValue(character.attributes.find(attribute => attribute.name === AttributeType.Magic)?.value || []) || "0"}</p>
        </div>
        <div className="border-1 border-pink-400 p-3 rounded-lg w-1/4">
            <p className="text-lg text-pink-400">{AttributeType.Social}</p>
            <p className="text-2xl text-pink-400 font-bold">{Modifier.getValue(character.attributes.find(attribute => attribute.name === AttributeType.Social)?.value || []) || "0"}</p>
        </div>
    </div>)
}