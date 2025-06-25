import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cards',
        href: '/cards',
    }
];

 type Cards = {
            id: number,
            game: string,
            name: string,
            price: number,
            setNumber: string,
            rarity: string,
            state: string,
            altart: string | boolean,
            color: string,
            quantity: number,
            image: string,
            observations: string
        }

type PageProps = {
    flash: {
        message?: string
    },
    cards: Cards[]
}

export default function Cards() {
    const { cards, flash } = usePage().props as unknown as PageProps;
    const { processing, delete:destroy } = useForm();
    
    cards.map((card) => (console.log(card)))
    const handleDelete = (id: number) => {
        if (confirm('Você quer deletar esta carta?')) {
            destroy(route('cards.destroy', id));    
        }
}


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cards" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                 <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <Link href={route('cards.create')}><Button>Cadastrar</Button></Link>{/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                                    <div className="m-4">
                {flash.message && (
                    <Alert>
                        <CircleAlert/>
                        <AlertTitle>Notificação</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>)}
                </div>
                    <div className="m-4">
                    {cards.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Jogo</TableHead>
                                    <TableHead className="w-[100px]">Nome</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead>Raridade</TableHead>
                                    <TableHead>Número</TableHead>
                                    <TableHead>Cor</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Fotos</TableHead>
                                    <TableHead>Observações</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {cards.map((card, key) => (
                                <TableRow key={key}>
                                    <TableCell>{card.game}</TableCell>
                                    <TableCell>{card.name}</TableCell>
                                    <TableCell>R$ {card.price}</TableCell>
                                    <TableCell>{card.rarity}</TableCell>
                                    <TableCell>{card.setNumber}</TableCell>
                                    <TableCell>{card.color}</TableCell>
                                    <TableCell>{card.quantity}</TableCell>  
                                    <TableCell><img src={card.image}></img></TableCell>
                                    <TableCell>{card.observations}</TableCell>
                                    <TableCell className='flex flex-row justify-end gap-4'>
                                        <Link href={route('cards.edit', card.id)}><Button disabled={processing} variant={'secondary'}>Editar</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(card.id)} variant={'destructive'}>Deletar</Button></TableCell>
                                </TableRow>
                            ))}                             
                            </TableBody>
                        </Table>
                    )}
                </div>
                </div>
            </div>
        </AppLayout>
    );
}
