'use client'

import { Character } from "@/lib/models/Character/Character";
import { createContext, useContext, useState } from "react";


interface CharacterContextType {
    character: Character;
    updateCharacter: (character: Character) => void;
    loadFromLocalStorage: (id: string) => Character | null;
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
});

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
    const [character, setCharacter] = useState<Character>(Character.createDefaultCharacter());


    const updateCharacter = (character: Character) => {
        const newCharacter = new Character(character.id, character.name, character.level, character.xp, character.attributes, character.traits, character.knowledges, character.abilities, character.race, character.lore, character.inventory)
        console.log(newCharacter);
        setCharacter(newCharacter);
        // localStorage.setItem(`character-${character.id}`, JSON.stringify(character.getCharacter));
    }

    const loadFromLocalStorage = (id: string): Character | null => {
        // const character = localStorage.getItem(`character-${id}`);
        // if (character) {
        //     const characterData = JSON.parse(character);
        //     setCharacter(new Character(characterData.id, characterData.name, characterData.level, characterData.attributes, characterData.traits, characterData.knowledges, characterData.abilities));
        //     return characterData;
        // }
        // return null;
        const character = Character.createDefaultCharacter();
        setCharacter(character);
        return character;
    }


    return <CharacterContext.Provider value={{ character, updateCharacter, loadFromLocalStorage }}>{children}</CharacterContext.Provider>
}