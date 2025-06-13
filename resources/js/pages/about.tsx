import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FatecLogo from '../../../public/fatec_ra_campinas_indaiatuba_cor.png'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'About',
        href: '/about',
    },
];

const alunos: {aluno: string, ra: string}[] = [
    {
        aluno: 'Guilherme Moreno Thimóteo da Cunha',
        ra: '1050482223032',
    },
    {
        aluno: 'Henrique Moller',
        ra: '1050482223051',
    },
    {
        aluno: 'Murilo Gruthner',
        ra: '10504822230XX',
    }
]

export default function About() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 grid-cols-3 items-center">
                    <h1 className="text-4xl text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100">Projeto feito pelos alunos da Fatec Indaiatuba 6o semestre</h1>
                    <a href="https://fatecid.com.br/cursos/" className='col-3'><img src={FatecLogo} alt="Logo da Fatec" height={400} width={500}/></a>
                </div>
                <div className="flex flex-col-reverse min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <ul className='flex flex-col'>
                        {alunos.map((aluno) => 
                        <li className="text-2xl text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100">{aluno.aluno} - {aluno.ra}</li>
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
