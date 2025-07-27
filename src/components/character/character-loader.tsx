"use client";
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface CharacterLoaderProps {
    id: string;
    children: React.ReactNode;
}

export default function CharacterLoader({
    id,
    children,
}: CharacterLoaderProps) {
    const { loadFromLocalStorage, createNewCharacter } = useCharacterContext();

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
        return (
            <div className="w-svw h-svh flex items-center justify-center">
                <div className="flex flex-col gap-3">
                    <p>Personagem não encontrado</p>
                    <Button onClick={createNewCharacter}>Criar Novo</Button>
                    <Button>Upload</Button>
                </div>
            </div>
        );
    }

    return isLoading ? <div>Carregando...</div> : children;
}
