import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApolloProvider } from '@apollo/client/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { queryClient } from './lib/queryClient';
import { apolloClient } from './lib/apolloClient';
import './index.css';
import { Layout } from './features/shared';
import { ClientsPetsPage, AppointmentsPage, PetDetailPage } from './features/vet-management';
import { Users, Calendar, Stethoscope } from 'lucide-react';

/**
 * Enable MSW Mocking
 * Initializes Mock Service Worker in development mode
 */
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-primary p-4 rounded-2xl">
            <Stethoscope className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
          Veterinaria Cuidado Animal
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-8">
          Sistema de gestion para la veterinaria. Administra clientes, mascotas y citas de manera eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/clients"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Users className="w-5 h-5" />
            Ver Clientes
          </Link>
          <Link
            to="/appointments"
            className="inline-flex items-center justify-center gap-2 bg-secondary-600 text-white px-6 py-3 rounded-xl hover:bg-secondary-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Ver Citas
          </Link>
        </div>
        <p className="text-base text-neutral-500 mt-8">
          React + TypeScript + Redux + Tailwind CSS + REST + GraphQL
        </p>
      </div>
    </div>
  );
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/clients" element={<ClientsPetsPage />} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  <Route path="/pets/:id" element={<PetDetailPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </ApolloProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
});
