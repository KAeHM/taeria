'use client'
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { useEffect, useState } from "react";


interface CharacterLoaderProps {
    id: string;
    children: React.ReactNode;
}


export default function CharacterLoader({ id, children }: CharacterLoaderProps) {

    const { loadFromLocalStorage } = useCharacterContext();

    const [isLoading, setIsLoading] = useState(true);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const character = loadFromLocalStorage(id);
        if (!character) {
            setNotFound(true);
        }

        setIsLoading(false);
    }, [id]);


    if (notFound) {
        return <div>Personagem não encontrado</div>;
    }

    return isLoading ? <div>Carregando...</div> : children;
}