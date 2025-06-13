import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cards',
        href: '/cards',
    },
    {
        title: 'Edit',
        href: '/cards/edit'
    }
];

        type CardsFields = {
            id: number,
            game: string,
            name: string,
            setNumber: string,
            rarity: string,
            state: string,
            altart: string | boolean,
            color: string,
            quantity: number,
            // pics: string,
            observations: string
        }

        

        type Props = {
            card: CardsFields
        }

export default function Edit({card}: Props) {


        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            put(route('cards.update', card.id))
        }
        const {data, setData, put, processing, errors} = useForm<CardsFields>({
            id: card.id,
            game: card.game,
            name: card.name,
            setNumber: card.setNumber,
            rarity: card.rarity,
            state: card.state,
            altart: card.altart,
            color: card.color,
            quantity: card.quantity,
            // pics: '',
            observations: card.observations
        }) 

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit" />
                <form onSubmit={handleSubmit} className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {Object.keys(errors).length > 0 && (
                    <Alert>
                        <CircleAlert/>
                        <AlertTitle>Opa pera lá</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, error]) => (
                                    <li key={key}>{error as string}</li>  
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card game'>Jogo</Label>
                    <Select onValueChange={(value)=>setData('game', value)} value={data.game}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Jogos</SelectLabel>
                                <SelectItem value='digimon'>Digimon Card Game</SelectItem>
                                <SelectItem value='magic'>Magic: The Gathering</SelectItem>
                                <SelectItem value='pokemon'>Pokémon</SelectItem>
                                <SelectItem value='yugioh'>Yu-Gi-Oh! TCG</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card name'>Nome da Carta</Label>
                    <Input placeholder='card name' className="w-[280px]" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                </div>
                    <div className="flex flex-col gap-2">
                    <Label>Quantidade</Label>
                    <Input placeholder='Quantidade' className="w-[280px]" type='number' value={data.quantity} onChange={(e) => setData('quantity', parseInt(e.target.value))}/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Cor</Label>
                    <Select value={data.color} onValueChange={(value)=>setData('color', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione uma cor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Cor da carta</SelectLabel>
                                <SelectItem value='Azul'>Azul</SelectItem>
                                <SelectItem value='Verde'>Verde</SelectItem>
                                <SelectItem value='Branca/Amarela'>Branca/Amarela</SelectItem>
                                <SelectItem value='Preta'>Preta</SelectItem>
                                <SelectItem value='Roxa'>Roxa</SelectItem>
                                <SelectItem value='Vermelha'>Vermelha</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card set and number'>Set e número</Label>
                    <Input placeholder='card set and number' value={data.setNumber} className="w-[280px]" onChange={(e) => setData('setNumber', e.target.value)}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card rarity'>Raridade</Label>
                    <Select value={data.rarity} onValueChange={(value) => setData('rarity', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Digimon Card Game</SelectLabel>
                                <SelectItem value='dcg common'>Comum - DCG</SelectItem>
                                <SelectItem value='dcg uncommon'>Incomum - DCG</SelectItem>
                                <SelectItem value='dcg rare'>Rara - DCG</SelectItem>
                                <SelectItem value='dcg super rare'>Super Rara - DCG</SelectItem>
                                <SelectItem value='dcg secret rare'>Secreta - DCG</SelectItem>
                                <SelectItem value='dcg promo'>Promocional - DCG</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel className='underline'>Magic: The Gathering</SelectLabel>
                                <SelectItem value='mtg common'>Comum - MTG</SelectItem>
                                <SelectItem value='mtg uncommon'>Incomum - MTG</SelectItem>
                                <SelectItem value='mtg rare'>Rara - MTG</SelectItem>
                                <SelectItem value='mtg mythic'>Mítica - MTG</SelectItem>
                                <SelectItem value='mtg promo'>Promocional - MTG</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel className='underline'>Pokémon</SelectLabel>
                                <SelectItem value='ptcg common'>Comum - PCG</SelectItem>
                                <SelectItem value='ptcg uncommon'>Incomum - PCG</SelectItem>
                                <SelectItem value='ptcg rare'>Rara - PCG</SelectItem>
                                <SelectItem value='ptcg super rare'>Super Rara - PCG</SelectItem>
                                <SelectItem value='ptcg ultra rare'>Ultra Rara - PCG</SelectItem>
                                <SelectItem value='ptcg promo'>Promocional - PCG</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel className='underline'>Yu-Gi-Oh!</SelectLabel>
                                <SelectItem value='ygo common'>Comum - YGO</SelectItem>
                                <SelectItem value='ygo rare'>Rara - YGO</SelectItem>
                                <SelectItem value='ygo super rare'>Super Rara - YGO</SelectItem>
                                <SelectItem value='ygo ultra rare'>Ultra Rara - YGO</SelectItem>
                                <SelectItem value='ygo secret rare'>Secreta - YGO</SelectItem>
                                <SelectItem value='ygo starlight rare'>Rara Estelar - YGO</SelectItem>
                                <SelectItem value='ygo ghost rare'>Rara Fantasma - YGO</SelectItem>
                                <SelectItem value='ygo promo'>Promocional - YGO</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card state'>Estado</Label>
                    <Select value={data.state} onValueChange={(value) => setData('state', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Estado da carta" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Estado</SelectLabel>
                                <SelectItem value='m'>Mint - M</SelectItem>
                                <SelectItem value='nm'>Near Mint - NM</SelectItem>
                                <SelectItem value='lp'>Light Played - LP</SelectItem>
                                <SelectItem value='hp'>Heavy Played - HP</SelectItem>
                                <SelectItem value='d'>Damaged - D</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-row gap-2'>
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                    >Alternate art
                    <Checkbox checked={data.altart as boolean} id='card altart' onCheckedChange={(value)=>setData('altart', value)}/>
                    </Label>
                </div>
                {/* <div className="flex flex-col gap-2">
                    <Label>Fotos</Label>
                    <Input placeholder='card pics' className="w-[280px]" type='file' accept='image/*,.pdf' multiple onChange={(e)=> setData('pics', e.target.value)}/>
                </div> */}
                <div className="flex flex-col gap-2">
                    <Label>Observações</Label>
                    <Textarea placeholder='Observações' className='w-[280px]' value={data.observations} onChange={(e)=>setData('observations', e.target.value)}></Textarea>
                </div>
                <Button type='submit' disabled={processing} className="w-[180px]">Editar</Button>
            </form>
        </AppLayout>
    );
}
