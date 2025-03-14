/**
 * Add anything here that needs to run for each test.
 */
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => server.close());