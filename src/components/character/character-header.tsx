'use client'

import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { Race, RaceList } from "@/lib/models/Race/Race";




export default function CharacterHeader() {

    const { character } = useCharacterContext();


    return (
        <div className='w-full'>
            {/* Header */}
            <div className="flex flex-row justify-between">

                {/* Portrait and Info */}
                <div className="flex flex-row gap-5">

                    {/* Portrait */}
                    <div className="w-72 h-72 rounded-lg overflow-hidden">
                        <AspectRatio ratio={1 / 1}>
                            <Image src={character.lore.imageURL} alt={character.name} fill />
                        </AspectRatio>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between">

                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">{character.name}</h1>
                            <p className="text-sm text-neutral-500 italic">
                                {character.lore.title}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">

                            <p>Idade: {character.lore.age} anos</p>
                            <p>Altura: {character.lore.height}m</p>
                            <p>Peso: {character.lore.weight}kg</p>
                            <p>Raça: {character.race.name}</p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-2 justify-between">
                    <div className="flex flex-col gap-2 items-end">
                        <p>Level: {character.level}</p>
                        <p>XP: {character.xp}</p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-5 items-end">

                        <div className="flex flex-col gap-2">

                            <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">Galeria</Button>
                            <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">História</Button>
                            <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">Conexões</Button>
                            <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">Anotações</Button>
                        </div>

                        <div className="flex flex-row gap-2">
                            <CharacterLoreDialog />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function CharacterLoreDialog() {

    const { character, updateCharacter } = useCharacterContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const imageURL = formData.get('imageURL') as string;
        const age = formData.get('age') as string;
        const height = formData.get('height') as string;
        const weight = formData.get('weight') as string;
        const race = formData.get('race') as string;


        const newRace = RaceList.find((raceList) => raceList.name === race) as Race;


        const updatedRace = newRace.updateCharacterRace(newRace, character);

        const updatedLore = character.updateCharacterLore({ title, imageURL, age: Number(age), height: Number(height), weight: Number(weight) }, updatedRace);

        const updatedCharacter = character.updateCharacterName(name, updatedLore);

        updateCharacter(updatedCharacter);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">Editar Personagem</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Personagem</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Nome</Label>
                        <Input name="name" defaultValue={character.name} type="text" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Título</Label>
                        <Input name="title" defaultValue={character.lore.title} type="text" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>ImageURL</Label>
                        <Input name="imageURL" defaultValue={character.lore.imageURL} type="text" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Idade</Label>
                        <Input name="age" defaultValue={character.lore.age.toString()} type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Altura</Label>
                        <Input name="height" defaultValue={character.lore.height.toString()} type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Peso</Label>
                        <Input name="weight" defaultValue={character.lore.weight.toString()} type="number" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Raça</Label>
                        <Select name="race" defaultValue={character.race.name}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma raça" />
                            </SelectTrigger>
                            <SelectContent>
                                {RaceList.map((race) => (
                                    <SelectItem key={race.name} value={race.name}>{race.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}