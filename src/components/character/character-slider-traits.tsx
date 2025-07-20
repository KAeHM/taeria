'use client'

import { Modifier, ModifierOrigin, ModifierType } from "@/lib/models/Modifier/Modifier";
import { Adrenaline, Estresse, HitPoints, Mana, TraitsType } from "@/lib/models/Traits/Traits";
import { Slider } from "../ui/slider";
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { useState } from "react";






export default function CharacterSliderTraits() {

    const { character, updateCharacter } = useCharacterContext();

    const [hitPoints, setHitPoints] = useState(Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.HitPoints)?.current ?? []));
    const [mana, setMana] = useState(Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Mana)?.current ?? []));
    const [estresse, setEstresse] = useState(Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Estresse)?.current ?? []));
    const [adrenaline, setAdrenaline] = useState(Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Adrenaline)?.current ?? []));

    return (
        <div className="flex flex-col justify-between w-1/3">
            <div>
                <div className="flex flex-row justify-between">
                    <p>{TraitsType.HitPoints}</p>
                    <p>{hitPoints}/{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.HitPoints)?.value ?? [])}</p>
                </div>
                <Slider onValueChange={(value) => {
                    setHitPoints(value[0]);
                }} onValueCommit={(value) => {
                    const newTrait = HitPoints.updateCharacterTraitCurrent([new Modifier(TraitsType.HitPoints, ModifierOrigin.NotSet, ModifierType.Number, value[0].toString())], character);
                    updateCharacter(newTrait);
                }} defaultValue={[hitPoints]} max={Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.HitPoints)?.value ?? [])} step={1} />
            </div>
            <div>
                <div className="flex flex-row justify-between">
                    <p>{TraitsType.Mana}</p>
                    <p>{mana}/{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.Mana)?.value ?? [])}</p>
                </div>
                <Slider onValueChange={(value) => {
                    setMana(value[0]);
                }} onValueCommit={(value) => {
                    const newTrait = Mana.updateCharacterTraitCurrent([new Modifier(TraitsType.Mana, ModifierOrigin.NotSet, ModifierType.Number, value[0].toString())], character);
                    updateCharacter(newTrait);
                }} defaultValue={[mana]} max={Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Mana)?.value ?? [])} step={1} />
            </div>
            <div>
                <div className="flex flex-row justify-between">
                    <p>{TraitsType.Estresse}</p>
                    <p>{estresse}/{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.Estresse)?.value ?? [])}</p>
                </div>
                <Slider onValueChange={(value) => {
                    setEstresse(value[0]);
                }} onValueCommit={(value) => {
                    const newTrait = Estresse.updateCharacterTraitCurrent([new Modifier(TraitsType.Estresse, ModifierOrigin.NotSet, ModifierType.Number, value[0].toString())], character);
                    updateCharacter(newTrait);
                }} defaultValue={[estresse]} max={Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Estresse)?.value ?? [])} step={1} />
            </div>
            <div>
                <div className="flex flex-row justify-between">
                    <p>{TraitsType.Adrenaline}</p>
                    <p>{adrenaline}/{Modifier.getValue(character.traits.find((trait) => trait.name === TraitsType.Adrenaline)?.value ?? [])}</p>
                </div>
                <Slider onValueChange={(value) => {
                    setAdrenaline(value[0]);
                }} onValueCommit={(value) => {
                    const newTrait = Adrenaline.updateCharacterTraitCurrent([new Modifier(TraitsType.Adrenaline, ModifierOrigin.NotSet, ModifierType.Number, value[0].toString())], character);
                    updateCharacter(newTrait);
                }} defaultValue={[adrenaline]} max={Modifier.getNumberValue(character.traits.find((trait) => trait.name === TraitsType.Adrenaline)?.value ?? [])} step={1} />
            </div>
        </div>
    )
}