'use client'
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Character, CharacterData } from "@/lib/models/Character/Character";

import { useRouter } from "next/navigation";



export default function CharacterUpload() {

    const [characterData, setCharacterData] = useState<CharacterData>()
    const router = useRouter()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {

                const text = e.target?.result;
                if (typeof text === 'string') {
                    try {
                        const data = JSON.parse(text);
                        setCharacterData(data)
                    } catch (err) {
                        console.error("Erro de processamento do JSON:", err);
                    }
                }
            };

            reader.onerror = () => {
                console.error("Erro de leitura do arquivo.");
            };

            reader.readAsText(file);
        }
    };

    const sendFile = (characterData: CharacterData) => {
        const newCharacter = Character.createCharacter(characterData.id, characterData.name, characterData.level, characterData.xp, characterData.attributes, characterData.traits, characterData.knowledges, characterData.abilities, characterData.race, characterData.lore, characterData.inventory)
        localStorage.setItem(`character-${newCharacter.id}`, JSON.stringify(newCharacter.getCharacter));
        router.push('/characters/' + newCharacter.id)
    }


    return (
        <Dialog>
            <DialogTrigger asChild><Button className="cursor-pointer">Upload</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload de Personagem</DialogTitle>
                    <DialogDescription>
                        Está ação irá criar um novo personagem com base no arquivo JSON enviado.
                    </DialogDescription>
                </DialogHeader>

                <Input type="file" onChange={handleFileChange} />
                <Button className="cursor-pointer" onClick={() => {

                    if (characterData) {
                        sendFile(characterData)
                    }
                }}>Enviar</Button>
            </DialogContent>
        </Dialog>
    )
}