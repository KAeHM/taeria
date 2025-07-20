'use client'
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { Separator } from "../ui/separator";
import { Modifier } from "@/lib/models/Modifier/Modifier";
import { TraitsType } from "@/lib/models/Traits/Traits";






export default function CharacterTraits() {

    const { character } = useCharacterContext();

    return (
        <div className="flex gap-5 w-1/3">
            <div className="flex flex-col gap-5">
                <p className="text-lg font-bold">Salvaguarda</p>

                <div className="flex flex-col gap-2 text-nowrap">
                    <div>
                        <p>{TraitsType.SaveThrowPhysical}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.SaveThrowPhysical)?.value ?? [])}</p>
                    </div>
                    <Separator />
                    <div>
                        <p>{TraitsType.SaveThrowIntelectual}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.SaveThrowIntelectual)?.value ?? [])}</p>
                    </div>
                    <Separator />
                    <div>
                        <p>{TraitsType.SaveThrowMagic}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.SaveThrowMagic)?.value ?? [])}</p>
                    </div>
                    <Separator />
                    <div>
                        <p>{TraitsType.SaveThrowSocial}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.SaveThrowSocial)?.value ?? [])}</p>
                    </div>
                </div>
            </div>
            <Separator orientation="vertical" className="h-full" />
            <div className="flex flex-col gap-5">

                <div className="flex justify-between text-nowrap gap-5">
                    <div>
                        <p>{TraitsType.DamageThreshold}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.DamageThreshold)?.value ?? [])}</p>
                    </div>
                    <div>
                        <p>{TraitsType.PhysicalDefense}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.PhysicalDefense)?.value ?? [])}</p>
                    </div>
                    <div>
                        <p>{TraitsType.MagicDefense}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.MagicDefense)?.value ?? [])}</p>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <p>{TraitsType.ActionPoints}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.ActionPoints)?.value ?? [])}</p>
                    </div>
                    <div>
                        <p>{TraitsType.Stealth}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.Stealth)?.value ?? [])}</p>
                    </div>
                    <div>
                        <p>{TraitsType.Perception}</p>
                        <p>{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.Perception)?.value ?? [])}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}