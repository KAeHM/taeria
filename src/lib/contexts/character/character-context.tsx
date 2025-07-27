'use client'

import { Character } from "@/lib/models/Character/Character";
import { Inventory } from "@/lib/models/Inventory/Inventory";
import { redirect } from "next/navigation";
import { createContext, useContext, useState } from "react";


interface CharacterContextType {
    character: Character;
    updateCharacter: (character: Character) => void;
    loadFromLocalStorage: (id: string) => Character | null;
    createNewCharacter: () => void;
}

export const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) throw new Error('useCharacterContext must be used within a CharacterProvider');
    return context;
}

export const CharacterContext = createContext<CharacterContextType>({
    character: Character.createDefaultCharacter(),
    updateCharacter: () => { },
    loadFromLocalStorage: () => null,
    createNewCharacter: () => { },
});

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
    const [character, setCharacter] = useState<Character>(Character.createDefaultCharacter());


    const createNewCharacter = () => {
        const newCharacter = Character.createDefaultCharacter()
        localStorage.setItem(`character-${newCharacter.id}`, JSON.stringify(newCharacter.getCharacter));
        redirect('/characters/' + newCharacter.id)
    }

    const updateCharacter = (character: Character) => {
        const newCharacter = new Character(character.id, character.name, character.level, character.xp, character.attributes, character.traits, character.knowledges, character.abilities, character.race, character.lore, character.inventory)
        setCharacter(newCharacter);
        localStorage.setItem(`character-${character.id}`, JSON.stringify(character.getCharacter));
    }

    const loadFromLocalStorage = (id: string): Character | null => {
        const character = localStorage.getItem(`character-${id}`);
        if (character) {
            const characterData = JSON.parse(character);
            setCharacter(new Character(characterData.id, characterData.name, characterData.level, characterData.xp, characterData.attributes, characterData.traits, characterData.knowledges, characterData.abilities, characterData.race, characterData.lore, new Inventory(characterData.inventory.items)));
            return characterData;
        }
        return null;
    }


    return <CharacterContext.Provider value={{ character, updateCharacter, loadFromLocalStorage, createNewCharacter }}>{children}</CharacterContext.Provider>
}