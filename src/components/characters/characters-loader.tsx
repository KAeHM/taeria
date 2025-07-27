"use client";

import { useMemo } from "react";
import {
    Card,
    CardDescription,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CharacterData } from "@/lib/models/Character/Character";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CharactersLoader() {
    function getAllLocalStorage() {
        const storageData: { [key: string]: string } = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                storageData[key] = localStorage.getItem(key) as string;
            }
        }
        return storageData;
    }

    const allLocalStorage = useMemo(getAllLocalStorage, []);

    console.log(allLocalStorage);

    return (
        <div className="flex flex-row flex-wrap gap-5">
            {Object.entries(allLocalStorage).map((value) => {
                const characterData: CharacterData = JSON.parse(value[1]);
                const characterID = value[0].split("character-")[1];


                return (
                    <Card key={characterID}>
                        <CardHeader>
                            <CardTitle>{characterData.name}</CardTitle>
                            <CardDescription>
                                <p>Nível: {characterData.level}</p>
                                <p>XP: {characterData.xp}</p>
                            </CardDescription>
                            <CardAction>
                                <Button asChild>
                                    <Link target="_blank" href={`/characters/${characterID}`}>
                                        Ficha
                                    </Link>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="w-full">
                            <div className="w-72 h-72 rounded-lg overflow-hidden">
                                <AspectRatio ratio={1 / 1}>
                                    <Image src={characterData.lore.imageURL} alt={characterData.name} fill />
                                </AspectRatio>
                            </div>
                        </CardContent>

                    </Card>
                );
            })}
        </div>
    );
}
