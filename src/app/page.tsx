import CharacterAttributes from "@/components/character/character-attributes";
import CharacterHeader from "@/components/character/character-header";
import CharacterSliderTraits from "@/components/character/character-slider-traits";
import CharacterTraits from "@/components/character/character-traits";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center svh-screen svw-screen py-10 gap-10">
      <div className="w-5/6 border-1 border-neutral-200 rounded-lg p-10">
        {/* Header */}
        <CharacterHeader />
      </div>

      {/* Attributes */}
      <div className="flex flex-row justify-between w-5/6 gap-5">
        <CharacterAttributes />
      </div>


      {/* Traits */}
      <div className="w-5/6 gap-5 flex flex-row justify-between">
        {/* Vitalidade, Mana, Estresse, Adrenalina */}
        <CharacterSliderTraits />
        <CharacterTraits />
      </div>


    </div>
  );
}
