import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApolloProvider } from '@apollo/client/react';
import { queryClient } from './lib/queryClient';
import { apolloClient } from './lib/apolloClient';
import '@fontsource-variable/ibm-plex-sans';
import './index.css';
import { Layout } from './features/shared';
import { RecipesExplorer, RecipeDetail } from './features/recipes-explorer';

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

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={
                  <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="text-center max-w-2xl">
                      <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                        Bienvenido a Recetas App
                      </h1>
                      <p className="text-lg md:text-xl text-neutral-600 mb-8">
                        Tu aplicación para explorar y guardar deliciosas recetas. Navega al explorador para descubrir nuevas recetas.
                      </p>
                      <p className="text-base text-neutral-500">
                        Este proyecto utiliza React, TypeScript, Tailwind CSS, y arquitectura híbrida REST + GraphQL.
                      </p>
                    </div>
                  </div>
                } />
                <Route path="/recipes" element={<RecipesExplorer />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </ApolloProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
