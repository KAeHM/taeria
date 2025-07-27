
import CharacterAbilities from "@/components/character/character-abilities";
import CharacterAttributes from "@/components/character/character-attributes";
import CharacterHeader from "@/components/character/character-header";
import CharacterInventory from "@/components/character/character-inventory";
import CharacterKnowledges from "@/components/character/character-knowledges";
import CharacterLoader from "@/components/character/character-loader";
import CharacterSliderTraits from "@/components/character/character-slider-traits";
import CharacterTraits from "@/components/character/character-traits";
import { CharacterProvider } from "@/lib/contexts/character/character-context";
import { Toaster } from "@/components/ui/sonner"
import CharacterToolsButtons from "@/components/character/character-tools-buttons";



export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;


    return (
        <CharacterProvider >
            <CharacterLoader id={id}>
                <div className="flex flex-col items-center justify-center svh-screen svw-screen py-10 gap-10">
                    <div className="w-5/6 flex rounded-lg justify-end">
                        <CharacterToolsButtons />
                    </div>
                    <div className="w-5/6 border-1 border-neutral-200 rounded-lg p-10">
                        <CharacterHeader />
                    </div>


                    <div className="flex flex-row justify-between w-5/6 gap-5">
                        <CharacterAttributes />
                    </div>



                    <div className="w-5/6 gap-5 flex flex-row justify-between">
                        <CharacterSliderTraits />
                        <CharacterTraits />
                    </div>

                    <div className="w-5/6 gap-5 flex flex-row justify-between">
                        <CharacterKnowledges />
                    </div>

                    <div className="w-5/6 gap-5 flex flex-row justify-between">
                        <CharacterAbilities />
                    </div>

                    <div className="w-5/6 gap-5 flex flex-row justify-between">
                        <CharacterInventory />
                    </div>
                </div>
                <Toaster />
            </CharacterLoader>
        </CharacterProvider>
    )

}