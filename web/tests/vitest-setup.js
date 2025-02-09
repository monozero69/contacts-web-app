/**
 * Add anything here that needs to run for each test.
 */
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
    cleanup();
});