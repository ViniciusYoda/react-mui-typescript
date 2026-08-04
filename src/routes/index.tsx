import { lazy, Suspense, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then(({ Dashboard }) => ({ default: Dashboard })));
const DetalheDePessoas = lazy(() => import('../pages/pessoas/DetalheDePessoas').then(({ DetalheDePessoas }) => ({ default: DetalheDePessoas })));
const ListagemDePessoas = lazy(() => import('../pages/pessoas/ListagemDePessoas').then(({ ListagemDePessoas }) => ({ default: ListagemDePessoas })));
const DetalheDeCidades = lazy(() => import('../pages/cidades/DetalheDeCidades').then(({ DetalheDeCidades }) => ({ default: DetalheDeCidades })));
const ListagemDeCidades = lazy(() => import('../pages/cidades/ListagemDeCidades').then(({ ListagemDeCidades }) => ({ default: ListagemDeCidades })));

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            },
            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
            },
        ]);
    }, []);

    return (
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />

            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

            <Route path="/cidades" element={<ListagemDeCidades />} />
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
          </Routes>
        </Suspense>
    )

}
