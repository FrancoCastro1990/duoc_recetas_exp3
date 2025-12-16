/**
 * MSW Browser Worker Setup
 * Configures the Service Worker for intercepting requests in the browser (development mode)
 */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Create and export the browser worker
 * This worker will intercept network requests in development mode
 */
export const worker = setupWorker(...handlers);
