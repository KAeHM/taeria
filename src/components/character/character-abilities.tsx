'use client'
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { Table, TableCell, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

import Link from "next/link";




export default function CharacterAbilities() {

    const { character } = useCharacterContext();

    return (
        <div className="w-full">

            <div className="flex justify-between">
                <p className="text-2xl font-bold">Habilidades</p>
            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Habilidade</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {character.abilities.map((abilityName) => (
                        <TableRow key={abilityName}>
                            <TableCell className="font-medium">{abilityName}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild>
                                    <Link target="_blank" href={`/abilities/${encodeURIComponent(abilityName)}`}>
                                        Ver Mais
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

