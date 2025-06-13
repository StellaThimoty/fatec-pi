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
import MultipleSelector, { Option } from '@/components/ui/multiselect';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cards',
        href: '/cards',
    },
    {
        title: 'Create',
        href: '/cards/create'
    }
];

export default function Create() {
        type CardsFields = {
            game: string,
            name: string,
            price: number,
            setNumber: string,
            rarity: string,
            state: string,
            altart: string | boolean,
            color: string,
            quantity: number,
            // pics: string,
            observations: string
        }

        const {data, setData, post, processing, errors} = useForm<CardsFields>({
            game: '',
            name: '',
            price: 0.00,
            setNumber: '',
            rarity: '',
            state: '',
            altart: false,
            color: '',
            quantity: 0,
            // pics: '',
            observations: ''
        }) 

        const optionsDcg: Option[] = [
            {label: 'Azul', value: 'Azul'},
            {label: 'Verde', value: 'Verde'},
            {label: 'Branca', value: 'Branca'},
            {label: 'Preta', value: 'Preta'},
            {label: 'Roxa', value: 'Roxa'},
            {label: 'Amarela', value: 'Amarela'},
            {label: 'Vermelha', value: 'Vermelha'},
        ]

        const optionsMtg: Option[] = [
            {label: 'Azul', value: 'Azul'},
            {label: 'Verde', value: 'Verde'},
            {label: 'Branca', value: 'Branca'},
            {label: 'Preta', value: 'Preta'},
            {label: 'Vermelha', value: 'Vermelha'},
        ]

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            post(route('cards.store'))
        }
        
        const handleMultiSelect = (values: Option[]) => {
            let color = '';
            values.map((value, key) => {
                color += value.value + ' ';
            })
            
            setData('color', color.trimEnd());
        }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create" />
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
                    <Select onValueChange={(value)=>setData('game', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Jogos</SelectLabel>
                                <SelectItem value='Digimon'>Digimon Card Game</SelectItem>
                                <SelectItem value='Magic'>Magic: The Gathering</SelectItem>
                                <SelectItem value='Pokemon'>Pokémon</SelectItem>
                                <SelectItem value='Yugioh'>Yu-Gi-Oh! TCG</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card name'>Nome da Carta</Label>
                    <Input placeholder='Nome da Carta' className="w-[280px]" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                </div>
                    <div className="flex flex-col gap-2">
                    <Label>Quantidade</Label>
                    <Input placeholder='Quantidade' className="w-[280px]" type='number' value={data.quantity} onChange={(e) => setData('quantity', parseInt(e.target.value))}/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Preço</Label>
                    <Input placeholder='Preço' className="w-[280px]" type='number' value={data.price} pattern="^\d*(\.\d{0,2})?$" step=".01" onChange={(e) => setData('price', parseFloat(e.target.value))}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card set and number'>Set e número</Label>
                    <Input placeholder='Set e Numero' className="w-[280px]" value={data.setNumber} onChange={(e) => setData('setNumber', e.target.value)}/>
                </div>
                {data.game === "Digimon" && 
                <div className="flex flex-col gap-2">
                    <Label>Cor</Label>
                        <MultipleSelector  className="w-[280px]" onChange={(values) => handleMultiSelect(values)} defaultOptions={optionsDcg} placeholder='Selecione uma cor'/>
                </div>}
                {data.game === "Magic" && 
                <div className="flex flex-col gap-2">
                    <Label>Cor</Label>
                        <MultipleSelector  className="w-[280px]" onChange={(values) => handleMultiSelect(values)} defaultOptions={optionsMtg} placeholder='Selecione uma cor'/>
                </div>}
                {data.game === "Pokemon" && <div className="flex flex-col gap-2">
                    <Label>Cor/Tipo</Label>
                    <Select onValueChange={(value)=>setData('color', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione a cor/tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='underline'>Cor/Tipo da carta</SelectLabel>
                                <SelectItem value='Grass'>Grass</SelectItem>
                                <SelectItem value='Fire'>Fire</SelectItem>    
                                <SelectItem value='Water'>Water</SelectItem>
                                <SelectItem value='Lightning'>Lightning</SelectItem>
                                <SelectItem value='Fighting'>Fighting</SelectItem>
                                <SelectItem value='Psychic'>Psychic</SelectItem>
                                <SelectItem value='Darkness'>Darkness</SelectItem>
                                <SelectItem value='Metal'>Metal</SelectItem>
                                <SelectItem value='Dragon'>Dragon</SelectItem>
                                <SelectItem value='Fairy'>Fairy</SelectItem>
                                <SelectItem value='Normal'>Normal</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>}
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='card rarity'>Raridade</Label>
                    <Select value={data.rarity} onValueChange={(value) => setData('rarity', value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Selecione um jogo" />
                        </SelectTrigger>
                        <SelectContent>
                            {data.game === "Digimon" && <SelectGroup>
                                <SelectLabel className='underline'>Digimon Card Game</SelectLabel>
                                <SelectItem value='dcg common'>Comum - DCG</SelectItem>
                                <SelectItem value='dcg uncommon'>Incomum - DCG</SelectItem>
                                <SelectItem value='dcg rare'>Rara - DCG</SelectItem>
                                <SelectItem value='dcg super rare'>Super Rara - DCG</SelectItem>
                                <SelectItem value='dcg secret rare'>Secreta - DCG</SelectItem>
                                <SelectItem value='dcg promo'>Promocional - DCG</SelectItem>
                            </SelectGroup>}
                            {data.game === "Magic" && <SelectGroup>
                                <SelectLabel className='underline'>Magic: The Gathering</SelectLabel>
                                <SelectItem value='mtg common'>Comum - MTG</SelectItem>
                                <SelectItem value='mtg uncommon'>Incomum - MTG</SelectItem>
                                <SelectItem value='mtg rare'>Rara - MTG</SelectItem>
                                <SelectItem value='mtg mythic'>Mítica - MTG</SelectItem>
                                <SelectItem value='mtg promo'>Promocional - MTG</SelectItem>
                            </SelectGroup>}
                            {data.game === "Pokemon" && <SelectGroup>
                                <SelectLabel className='underline'>Pokémon</SelectLabel>
                                <SelectItem value='ptcg common'>Comum - PCG</SelectItem>
                                <SelectItem value='ptcg uncommon'>Incomum - PCG</SelectItem>
                                <SelectItem value='ptcg rare'>Rara - PCG</SelectItem>
                                <SelectItem value='ptcg super rare'>Super Rara - PCG</SelectItem>
                                <SelectItem value='ptcg ultra rare'>Ultra Rara - PCG</SelectItem>
                                <SelectItem value='ptcg promo'>Promocional - PCG</SelectItem>
                            </SelectGroup>}
                            {data.game === "Yugioh" && <SelectGroup>
                                <SelectLabel className='underline'>Yu-Gi-Oh!</SelectLabel>
                                <SelectItem value='ygo common'>Comum - YGO</SelectItem>
                                <SelectItem value='ygo rare'>Rara - YGO</SelectItem>
                                <SelectItem value='ygo super rare'>Super Rara - YGO</SelectItem>
                                <SelectItem value='ygo ultra rare'>Ultra Rara - YGO</SelectItem>
                                <SelectItem value='ygo secret rare'>Secreta - YGO</SelectItem>
                                <SelectItem value='ygo starlight rare'>Rara Estelar - YGO</SelectItem>
                                <SelectItem value='ygo ghost rare'>Rara Fantasma - YGO</SelectItem>
                                <SelectItem value='ygo promo'>Promocional - YGO</SelectItem>
                            </SelectGroup>}
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
                                <SelectItem value='sp'>Slightly Played - SP</SelectItem>
                                <SelectItem value='hp'>Heavy Played - HP</SelectItem>
                                <SelectItem value='d'>Damaged - D</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-row gap-2'>
                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                    >Alternate art
                    <Checkbox id='card altart' checked={data.altart as boolean} onCheckedChange={(value)=>setData('altart', value)}/>
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
                <Button type='submit'disabled={processing}  className="w-[180px]">Cadastrar</Button>
            </form>
        </AppLayout>
    );
}
