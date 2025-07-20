'use client'

import { Input } from "../ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { useState } from "react";
import { Item, ItemQuality, ItemRarity, ItemType } from "@/lib/models/Item/Item";
import { AttributeType } from "@/lib/models/Attributes/Attributes";
import { Checkbox } from "../ui/checkbox";
import { Modifier, ModifierOrigin, ModifierType } from "@/lib/models/Modifier/Modifier";
import { TraitsType } from "@/lib/models/Traits/Traits";
import { toast } from "sonner"
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";





export default function CharacterInventory() {
    const { character } = useCharacterContext();
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <p className="text-2xl font-bold">Inventário</p>
                <CharacterInventoryAddItem />
            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Nome</TableHead>
                        <TableHead >Descrição</TableHead>
                        <TableHead >Tipo</TableHead>
                        <TableHead >Raridade</TableHead>
                        <TableHead >Qualidade</TableHead>
                        <TableHead >Peso</TableHead>
                        <TableHead >Quantidade</TableHead>
                        <TableHead className="text-end items-end">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {character.inventory.getItems().map((item) => {

                        const itemHasModifiers = item.changeAttributes && item.changeAttributes.length > 0 || item.changeTraits && item.changeTraits.length > 0 || item.changeAbilities && item.changeAbilities.length > 0 || false;

                        return (<TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.rarity}</TableCell>
                            <TableCell>{item.quality}</TableCell>
                            <TableCell>{item.weight}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-end">
                                <div className="flex flex-row gap-2 justify-end">
                                    <CharacterInventoryUpdateAmount item={item} />
                                    {item.isActive ?
                                        <Button variant="outline" disabled={!itemHasModifiers} className="cursor-pointer"><FaRegCircleCheck /></Button> :
                                        <Button variant="destructive" disabled={!itemHasModifiers} className="cursor-pointer"><FaRegCircleXmark /></Button>}
                                </div>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </div>
    )
}


export function CharacterInventoryAddItem() {
    const { character, updateCharacter } = useCharacterContext();
    const [isNewItem, setIsNewItem] = useState(false);

    const [changeAttributes, setChangeAttributes] = useState(false);
    const [changeTraits, setChangeTraits] = useState(false);

    const [attributes, setAttributes] = useState<Modifier[]>([]);
    const [traits, setTraits] = useState<Modifier[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const itemKnown = formData.get('item-known') as string;
        const itemName = formData.get('item-name') as string;
        const itemDescription = formData.get('item-description') as string;
        const itemType = formData.get('item-type') as ItemType;
        const itemRarity = formData.get('item-rarity') as ItemRarity;
        const itemQuality = formData.get('item-quality') as ItemQuality;
        const itemWeight = formData.get('item-weight') as string;

        if (isNewItem) {
            const newItem = new Item(itemName, itemDescription, 1, Number(itemWeight), 0, itemQuality, itemType, itemRarity, true, changeAttributes ? attributes : [], changeTraits ? traits : [], []);
            character.inventory = character.inventory.addItem(newItem);
        } else {
            const oldItem = character.inventory.getItem(itemKnown);
            if (!oldItem) {
                toast.error("Item não encontrado");
                return;
            }
            const newItem = new Item(oldItem.name, oldItem.description, 1, oldItem.weight, oldItem.value, oldItem.quality, oldItem.type, oldItem.rarity, oldItem.isActive, oldItem.changeAttributes, oldItem.changeTraits, []);
            character.inventory = character.inventory.updateItem(newItem);
        }


        updateCharacter(character);
        toast.success("Item Adicionado com sucesso");
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900" >
                    Adicionar Item
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50svw] overflow-y-auto max-h-[90vh]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Alterar Item</DialogTitle>
                        <DialogDescription>
                            Altere um item do seu inventário.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Itens</Label>
                            <Select name="item-known" onValueChange={(e) => {
                                if (e === "new-item") {
                                    setIsNewItem(true);
                                } else {
                                    setIsNewItem(false);
                                }
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Item Conhecido" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new-item">Novo Item</SelectItem>
                                    {character.inventory.getItems().map((item) => (
                                        <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                        </div>

                        {isNewItem &&
                            <>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Nome do Item</Label>
                                    <Input type="text" name="item-name" placeholder="Nome do Item" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Descrição do Item</Label>
                                    <Input type="text" name="item-description" placeholder="Descrição do Item" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Tipo do Item</Label>
                                    <Select name="item-type" >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tipo do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemType).map((type: ItemType) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Raridade do Item</Label>
                                    <Select name="item-rarity" >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Raridade do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemRarity).map((rarity: ItemRarity) => (
                                                <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Qualidade do Item</Label>
                                    <Select name="item-quality" >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Qualidade do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemQuality).map((quality: ItemQuality) => (
                                                <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Peso do Item</Label>
                                    <Input type="number" name="item-weight" placeholder="Peso do Item" step="0.1" />
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-row gap-3">
                                        <Label htmlFor="username-1">Modificadores de Atributos</Label>
                                        <Checkbox />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <Label htmlFor="username-1">Modificadores de Traços</Label>
                                        <Checkbox />
                                    </div>
                                </div>

                            </>}



                        {changeAttributes && <div className="gap-3 flex flex-col">
                            <div className="flex flex-row gap-3">
                                <p>Modificadores de Atributos</p>
                                {
                                    attributes.map((attribute, index) => (
                                        <div key={attribute.name + index} className="flex flex-row justify-between w-full gap-5">
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label htmlFor="username-1">Modificadores de Atributos</Label>
                                                <Select defaultValue={attribute.type} name="item-change-attributes">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Modificadores de Atributos" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(AttributeType).map((attribute: AttributeType) => (
                                                            <SelectItem key={attribute} value={attribute}>{attribute}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label htmlFor="username-1">Valor do Modificador</Label>
                                                <Input defaultValue={attribute.value} type="text" name="item-change-attributes-value" placeholder="Valor do Modificador" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Button onClick={() => setAttributes([...attributes, new Modifier('Modificador da Arma', ModifierOrigin.Item, ModifierType.NotSet, '0')])}>Adicionar Modificador</Button>
                        </div>}
                        {changeTraits && <div className="gap-3 flex flex-col">
                            <div className="flex flex-row gap-3">
                                <p>Modificadores de Traços</p>
                                {
                                    traits.map((trait, index) => (
                                        <div key={trait.name + index} className="flex flex-row justify-between w-full gap-5">
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label htmlFor="username-1">Modificadores de Traços</Label>
                                                <Select defaultValue={trait.type} name="item-change-traits">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Modificadores de Atributos" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(TraitsType).map((trait: TraitsType) => (
                                                            <SelectItem key={trait} value={trait}>{trait}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label htmlFor="username-1">Valor do Modificador</Label>
                                                <Input defaultValue={trait.value} type="text" name="item-change-traits-value" placeholder="Valor do Modificador" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Button onClick={() => setTraits([...traits, new Modifier('Modificador da Arma', ModifierOrigin.Item, ModifierType.NotSet, '0')])}>Adicionar Modificador</Button>
                        </div>}



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

export function CharacterInventoryUpdateAmount({ item }: { item: Item }) {
    const { character, updateCharacter } = useCharacterContext();
    const [itemQuantity, setItemQuantity] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const itemQuantity = formData.get('item-quantity') as string;

        const newItem = new Item(item.name, item.description, Number(itemQuantity), item.weight, item.value, item.quality, item.type, item.rarity, item.isActive, item.changeAttributes, item.changeTraits, item.changeAbilities);
        character.inventory = character.inventory.updateItem(newItem);
        updateCharacter(character);
        toast.success("Quantidade atualizada com sucesso");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer"><AiOutlineEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50svw] overflow-y-auto max-h-[90vh]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Atualizar Quantidade</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Quantidade</Label>
                        <Input type="number" name="item-quantity" placeholder="Quantidade" value={itemQuantity} onChange={(e) => setItemQuantity(Number(e.target.value))} />
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