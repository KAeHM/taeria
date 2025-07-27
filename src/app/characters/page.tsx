import CharactersLoader from "@/components/characters/characters-loader";
import CharactersToolsButtons from "@/components/characters/characters-tools-buttons";



export default function CharactersPage() {



    return <div className="p-10 flex flex-col gap-2">
        <div className="flex justify-between">
            <p className="text-2xl">Personagens Salvos</p>
            <CharactersToolsButtons />
        </div>
        <CharactersLoader />
    </div>
}