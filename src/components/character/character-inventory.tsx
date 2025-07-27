"use client";

import { Input } from "../ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useCharacterContext } from "@/lib/contexts/character/character-context";
import { useState } from "react";
import {
    Item,
    ItemModifier,
    ItemModifierType,
    ItemQuality,
    ItemRarity,
    ItemType,
} from "@/lib/models/Item/Item";
import { AttributeType } from "@/lib/models/Attributes/Attributes";
import { Checkbox } from "../ui/checkbox";
import { TraitsType } from "@/lib/models/Traits/Traits";
import { toast } from "sonner";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { Inventory } from "@/lib/models/Inventory/Inventory";

export default function CharacterInventory() {
    const { character, updateCharacter } = useCharacterContext();
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
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Raridade</TableHead>
                        <TableHead>Qualidade</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="text-end items-end">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {character.inventory.getItems().map((item) => {
                        const itemHasModifiers =
                            (item.itemModifiers && item.itemModifiers.length > 0) || false;

                        return (
                            <TableRow key={item.name}>
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
                                        {!item.isActive ? (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newCharacter = character.inventory.equipItem(
                                                        item,
                                                        character
                                                    );
                                                    updateCharacter(newCharacter);
                                                }}
                                                disabled={!itemHasModifiers}
                                                className="cursor-pointer"
                                            >
                                                <FaRegCircleCheck />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    const newCharacter = character.inventory.unequipItem(
                                                        item,
                                                        character
                                                    );
                                                    updateCharacter(newCharacter);
                                                }}
                                                variant="destructive"
                                                disabled={!itemHasModifiers}
                                                className="cursor-pointer"
                                            >
                                                <FaRegCircleXmark />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export function CharacterInventoryAddItem() {
    const { character, updateCharacter } = useCharacterContext();
    const [isNewItem, setIsNewItem] = useState(false);

    const [changeAttributes, setChangeAttributes] = useState(false);
    const [changeTraits, setChangeTraits] = useState(false);

    const [attributes, setAttributes] = useState<
        ItemModifier<ItemModifierType.ATTRIBUTE>[]
    >([]);
    const [traits, setTraits] = useState<ItemModifier<ItemModifierType.TRAIT>[]>(
        []
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const itemKnown = formData.get("item-known") as string;
        const itemName = formData.get("item-name") as string;
        const itemDescription = formData.get("item-description") as string;
        const itemType = formData.get("item-type") as ItemType;
        const itemRarity = formData.get("item-rarity") as ItemRarity;
        const itemQuality = formData.get("item-quality") as ItemQuality;
        const itemWeight = formData.get("item-weight") as string;

        if (isNewItem) {
            if (itemName === "" || itemWeight === "") {
                toast.error("Preencha todos os campos obrigatórios: Nome e Peso");
                return;
            }

            if (character.inventory.getItem(itemName)) {
                toast.error("Item já existe");
                return;
            }

            const changesModifiers = [...attributes, ...traits];

            const newItem = new Item(
                itemName,
                itemDescription,
                1,
                Number(itemWeight),
                0,
                itemQuality,
                itemType,
                itemRarity,
                false,
                changesModifiers.length > 0 ? changesModifiers : []
            );
            character.inventory = character.inventory.addItem(newItem);
        } else {
            const oldItem = character.inventory.getItem(itemKnown);
            if (!oldItem) {
                toast.error("Item não encontrado");
                return;
            }
            const newItem = new Item(
                oldItem.name,
                oldItem.description,
                1,
                oldItem.weight,
                oldItem.value,
                oldItem.quality,
                oldItem.type,
                oldItem.rarity,
                oldItem.isActive,
                oldItem.itemModifiers
            );
            character.inventory = character.inventory.updateItem(newItem, oldItem.name);
        }

        updateCharacter(character);
        toast.success("Item Adicionado com sucesso");
    };

    const resetForm = () => {
        setChangeAttributes(false);
        setChangeTraits(false);
        setAttributes([]);
        setTraits([]);
    };

    return (
        <Dialog
            onOpenChange={() => {
                resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-slate-800 text-white hover:bg-slate-900">
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
                            <Select
                                name="item-known"
                                onValueChange={(e) => {
                                    if (e === "new-item") {
                                        setIsNewItem(true);
                                    } else {
                                        setIsNewItem(false);
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Item Conhecido" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new-item">Novo Item</SelectItem>
                                    {character.inventory.getItems().map((item) => (
                                        <SelectItem key={item.name} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {isNewItem && (
                            <>
                                <div className="grid gap-3">
                                    <Label>Nome do Item</Label>
                                    <Input
                                        type="text"
                                        name="item-name"
                                        placeholder="Nome do Item"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label>Descrição do Item</Label>
                                    <Input
                                        type="text"
                                        name="item-description"
                                        placeholder="Descrição do Item"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label>Tipo do Item</Label>
                                    <Select defaultValue={ItemType.OTHER} name="item-type">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tipo do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemType).map((type: ItemType) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Raridade do Item</Label>
                                    <Select defaultValue={ItemRarity.COMMON} name="item-rarity">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Raridade do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemRarity).map((rarity: ItemRarity) => (
                                                <SelectItem key={rarity} value={rarity}>
                                                    {rarity}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Qualidade do Item</Label>
                                    <Select defaultValue={ItemQuality.FAIR} name="item-quality">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Qualidade do Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(ItemQuality).map(
                                                (quality: ItemQuality) => (
                                                    <SelectItem key={quality} value={quality}>
                                                        {quality}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Peso do Item</Label>
                                    <Input
                                        type="number"
                                        name="item-weight"
                                        placeholder="Peso do Item"
                                        step="0.1"
                                    />
                                </div>
                                {
                                    <div className="flex flex-row gap-3">
                                        <div className="flex flex-row gap-3">
                                            <Label>Modificadores de Atributos</Label>
                                            <Checkbox
                                                checked={changeAttributes}
                                                onCheckedChange={(e: boolean) => {
                                                    setChangeAttributes(e);
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <Label>Modificadores de Traços</Label>
                                            <Checkbox
                                                checked={changeTraits}
                                                onCheckedChange={(e: boolean) => {
                                                    setChangeTraits(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            </>
                        )}

                        {changeAttributes && (
                            <div className="gap-3 flex flex-col">
                                <div className="flex flex-col gap-3 w-full">
                                    <p>Modificadores de Atributos</p>
                                    {attributes.map((attribute, index) => (
                                        <div
                                            key={attribute.name + index}
                                            className="flex flex-row justify-between w-full gap-5"
                                        >
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label>Modificadores de Atributos</Label>
                                                <Select
                                                    onValueChange={(e: AttributeType) => {
                                                        const newAttributes = [...attributes];
                                                        newAttributes[index].path.name = e;
                                                        setAttributes(newAttributes);
                                                    }}
                                                    defaultValue={attribute.path.type}
                                                    name="item-change-attributes"
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Modificadores de Atributos" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(AttributeType).map(
                                                            (attribute: AttributeType) => (
                                                                <SelectItem key={attribute} value={attribute}>
                                                                    {attribute}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label>Valor do Modificador</Label>
                                                <Input
                                                    onChange={(e) => {
                                                        const newAttributes = [...attributes];
                                                        newAttributes[index].value = e.target.value;
                                                        setAttributes(newAttributes);
                                                    }}
                                                    defaultValue={attribute.value}
                                                    type="text"
                                                    name="item-change-attributes-value"
                                                    placeholder="Valor do Modificador"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setAttributes([
                                            ...attributes,
                                            {
                                                name: "Modificador da Arma",
                                                path: {
                                                    type: ItemModifierType.ATTRIBUTE,
                                                    name: AttributeType.Physical,
                                                },
                                                value: "0",
                                            },
                                        ])
                                    }
                                >
                                    Adicionar Modificador
                                </Button>
                            </div>
                        )}
                        {changeTraits && (
                            <div className="gap-3 flex flex-col">
                                <div className="flex flex-col gap-3 w-full">
                                    <p>Modificadores de Traços</p>
                                    {traits.map((trait, index) => (
                                        <div
                                            key={trait.name + index}
                                            className="flex flex-row justify-between w-full gap-5"
                                        >
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label>Modificadores de Traços</Label>
                                                <Select
                                                    onValueChange={(e: TraitsType) => {
                                                        const newTraits = [...traits];
                                                        newTraits[index].path.name = e;
                                                        setTraits(newTraits);
                                                    }}
                                                    defaultValue={trait.path.type}
                                                    name="item-change-traits"
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Modificadores de Atributos" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(TraitsType).map(
                                                            (trait: TraitsType) => (
                                                                <SelectItem key={trait} value={trait}>
                                                                    {trait}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-3 w-1/2">
                                                <Label>Valor do Modificador</Label>
                                                <Input
                                                    onChange={(e) => {
                                                        const newTraits = [...traits];
                                                        newTraits[index].value = e.target.value;
                                                        setTraits(newTraits);
                                                    }}
                                                    defaultValue={trait.value}
                                                    type="text"
                                                    name="item-change-traits-value"
                                                    placeholder="Valor do Modificador"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setTraits([
                                            ...traits,
                                            {
                                                name: "Modificador da Arma",
                                                path: {
                                                    type: ItemModifierType.TRAIT,
                                                    name: TraitsType.ActionPoints,
                                                },
                                                value: "0",
                                            },
                                        ])
                                    }
                                >
                                    Adicionar Modificador
                                </Button>
                            </div>
                        )}
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
    );
}

export function CharacterInventoryUpdateAmount({ item }: { item: Item }) {
    const { character, updateCharacter } = useCharacterContext();
    const [itemQuantity, setItemQuantity] = useState<number>(item.quantity);
    const [attributes, setAttributes] = useState<
        ItemModifier<ItemModifierType.ATTRIBUTE>[]
    >(
        item.itemModifiers.filter(
            (value) => value.path.type == ItemModifierType.ATTRIBUTE
        ) as ItemModifier<ItemModifierType.ATTRIBUTE>[]
    );
    const [traits, setTraits] = useState<ItemModifier<ItemModifierType.TRAIT>[]>(
        item.itemModifiers.filter(
            (value) => value.path.type == ItemModifierType.TRAIT
        ) as ItemModifier<ItemModifierType.TRAIT>[]
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const itemQuantity = formData.get("item-quantity") as string;
        const itemName = formData.get("item-name") as string;
        const itemDescription = formData.get("item-description") as string;
        const itemType = formData.get("item-type") as ItemType;
        const itemRarity = formData.get("item-rarity") as ItemRarity;
        const itemQuality = formData.get("item-quality") as ItemQuality;
        const itemWeight = formData.get("item-weight") as string;

        const changesModifiers = [...attributes, ...traits];

        if (itemName === "" || itemWeight === "") {
            toast.error("Preencha todos os campos obrigatórios: Nome e Peso");
            return;
        }

        const newItem = new Item(
            itemName,
            itemDescription,
            Number(itemQuantity),
            Number(itemWeight),
            item.value,
            itemQuality,
            itemType,
            itemRarity,
            item.isActive,
            changesModifiers

        );

        character.inventory = character.inventory.updateItem(newItem, item.name);
        updateCharacter(character);
        toast.success("Item atualizado com sucesso");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <AiOutlineEdit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50svw] overflow-y-auto max-h-[90vh]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Atualizar Quantidade</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <Label>Nome do Item</Label>
                        <Input
                            defaultValue={item.name}
                            type="text"
                            name="item-name"
                            placeholder="Nome do Item"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Descrição do Item</Label>
                        <Input
                            defaultValue={item.description}
                            type="text"
                            name="item-description"
                            placeholder="Descrição do Item"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Tipo do Item</Label>
                        <Select defaultValue={item.type} name="item-type">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tipo do Item" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ItemType).map((type: ItemType) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label>Raridade do Item</Label>
                        <Select defaultValue={item.rarity} name="item-rarity">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Raridade do Item" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ItemRarity).map((rarity: ItemRarity) => (
                                    <SelectItem key={rarity} value={rarity}>
                                        {rarity}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label>Qualidade do Item</Label>
                        <Select defaultValue={item.quality} name="item-quality">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Qualidade do Item" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ItemQuality).map((quality: ItemQuality) => (
                                    <SelectItem key={quality} value={quality}>
                                        {quality}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label>Peso do Item</Label>
                        <Input
                            defaultValue={item.weight}
                            type="number"
                            name="item-weight"
                            placeholder="Peso do Item"
                            step="0.1"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Quantidade</Label>
                        <Input
                            type="number"
                            name="item-quantity"
                            placeholder="Quantidade"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(Number(e.target.value))}
                        />
                    </div>

                    <div className="gap-3 flex flex-col">
                        <div className="flex flex-col gap-3 w-full">
                            <p>Modificadores de Atributos</p>
                            {attributes.map((attribute, index) => (
                                <div
                                    key={attribute.name + index}
                                    className="flex flex-row justify-between w-full gap-5"
                                >
                                    <div className="flex flex-col gap-3 w-1/2">
                                        <Label>Modificadores de Atributos</Label>
                                        <Select
                                            onValueChange={(e: AttributeType) => {
                                                const newAttributes = [...attributes];
                                                newAttributes[index].path.name = e;
                                                setAttributes(newAttributes);
                                            }}
                                            defaultValue={attribute.path.name}
                                            name="item-change-attributes"
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Modificadores de Atributos" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(AttributeType).map(
                                                    (attribute: AttributeType) => (
                                                        <SelectItem key={attribute} value={attribute}>
                                                            {attribute}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-3 w-1/2">
                                        <Label>Valor do Modificador</Label>
                                        <Input
                                            onChange={(e) => {
                                                const newAttributes = [...attributes];
                                                newAttributes[index].value = e.target.value;
                                                setAttributes(newAttributes);
                                            }}
                                            defaultValue={attribute.value}
                                            type="text"
                                            name="item-change-attributes-value"
                                            placeholder="Valor do Modificador"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={() =>
                                setAttributes([
                                    ...attributes,
                                    {
                                        name: "Modificador da Arma",
                                        path: {
                                            type: ItemModifierType.ATTRIBUTE,
                                            name: AttributeType.Physical,
                                        },
                                        value: "0",
                                    },
                                ])
                            }
                        >
                            Adicionar Modificador
                        </Button>
                    </div>

                    <div className="gap-3 flex flex-col">
                        <div className="flex flex-col gap-3 w-full">
                            <p>Modificadores de Traços</p>
                            {traits.map((trait, index) => (
                                <div
                                    key={trait.name + index}
                                    className="flex flex-row justify-between w-full gap-5"
                                >
                                    <div className="flex flex-col gap-3 w-1/2">
                                        <Label>Modificadores de Traços</Label>
                                        <Select
                                            onValueChange={(e: TraitsType) => {
                                                const newTraits = [...traits];
                                                newTraits[index].path.name = e;
                                                setTraits(newTraits);
                                            }}
                                            defaultValue={trait.path.name}
                                            name="item-change-traits"
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Modificadores de Atributos" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(TraitsType).map((trait: TraitsType) => (
                                                    <SelectItem key={trait} value={trait}>
                                                        {trait}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-3 w-1/2">
                                        <Label>Valor do Modificador</Label>
                                        <Input
                                            onChange={(e) => {
                                                const newTraits = [...traits];
                                                newTraits[index].value = e.target.value;
                                                setTraits(newTraits);
                                            }}
                                            defaultValue={trait.value}
                                            type="text"
                                            name="item-change-traits-value"
                                            placeholder="Valor do Modificador"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={() =>
                                setTraits([
                                    ...traits,
                                    {
                                        name: "Modificador da Arma",
                                        path: {
                                            type: ItemModifierType.TRAIT,
                                            name: TraitsType.ActionPoints,
                                        },
                                        value: "0",
                                    },
                                ])
                            }
                        >
                            Adicionar Modificador
                        </Button>
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
    );
}
