'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CharacterContext, useCharacterContext } from "@/lib/contexts/character/character-context";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Knowledge, KnowledgeLevel, KnowledgeList } from "@/lib/models/Knowledges/Knowledges";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export default function CharacterKnowledges() {

    const { character } = useCharacterContext();

    return (
        <div className="w-full">

            <div className="flex justify-between">

                <p className="text-2xl font-bold">Conhecimentos</p>

                <CharacterKnowledgeAddDialog />

            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Conhecimento</TableHead>
                        <TableHead>Nível</TableHead>
                        <TableHead>XP</TableHead>
                        <TableHead>Atributo</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {character.knowledges.filter(knowledge => knowledge.currentLevel !== KnowledgeLevel.NotSet).map((knowledge) => (
                        <TableRow key={knowledge.name}>
                            <TableCell className="font-medium">{knowledge.name}</TableCell>
                            <TableCell>{knowledge.currentLevel}</TableCell>
                            <TableCell>{knowledge.currentXp}</TableCell>
                            <TableCell>{knowledge.attribute}</TableCell>
                            <TableCell className="text-right">
                                <Button>
                                    Ver Mais
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


export function CharacterKnowledgeAddDialog() {

    const { character, updateCharacter } = useCharacterContext();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const knowledgeName = formData.get('knowledge') as string;
        const level = formData.get('level') as string;
        const xp = formData.get('xp') as string;
        const knowledge = KnowledgeList.find(knowledge => knowledge.name === knowledgeName);
        if (!knowledge) return;

        const newKnowledge = new Knowledge(knowledgeName, knowledge.markdown, knowledge.attribute, knowledge.resource, Number(level), Number(xp), knowledge.progressionByLevel);

        const newCharacter = newKnowledge.updateCharacterKnowledge(newKnowledge, character);

        updateCharacter(newCharacter);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900" >
                    Alterar Conhecimento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Alterar Conhecimento</DialogTitle>
                        <DialogDescription>
                            Altere o nível e o XP de um conhecimento.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Conhecimento</Label>
                            <Select name="knowledge">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Conhecimento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {KnowledgeList.map((knowledge: Knowledge) => (
                                        <SelectItem key={knowledge.name} value={knowledge.name}>{knowledge.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Nível</Label>
                            <Select name="level">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Nível" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[KnowledgeLevel.NotSet, KnowledgeLevel.Basic, KnowledgeLevel.Intermediate, KnowledgeLevel.Advanced, KnowledgeLevel.Expert].map((level) => (
                                        <SelectItem key={level} value={level.toString()}>{level.toString()}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">XP</Label>
                            <Input type="number" name="xp" placeholder="XP" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Alterar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}