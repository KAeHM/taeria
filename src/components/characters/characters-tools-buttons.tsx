'use client'
import { Character } from "@/lib/models/Character/Character";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import CharacterUpload from "../character/character-upload";



export default function CharactersToolsButtons() {
    const router = useRouter()
    const createNewCharacter = () => {
        const newCharacter = Character.createDefaultCharacter()
        localStorage.setItem(`character-${newCharacter.id}`, JSON.stringify(newCharacter.getCharacter));
        router.push('/characters/' + newCharacter.id)
    }

    return <div className="flex gap-2">
        <CharacterUpload />
        <Button className="cursor-pointer" onClick={createNewCharacter}>Novo Personagem</Button>
    </div>
}