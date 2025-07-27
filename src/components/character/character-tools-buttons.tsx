'use client'
import { Character } from "@/lib/models/Character/Character";
import { Button } from "../ui/button";
import { useCharacterContext } from "@/lib/contexts/character/character-context";


export default function CharacterToolsButtons() {

    const { character } = useCharacterContext()

    function downloadObjectAsJson(exportObj: Character, characterName: string) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", characterName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return (
        <div className="flex flex-row gap-5 flex-end">
            <Button className="cursor-pointer" onClick={() => {
                downloadObjectAsJson(character, character.name)
            }} >Baixar Personagem</Button>
        </div>
    )
}