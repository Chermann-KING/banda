import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// globals:false (imports explicites) : l'auto-cleanup de Testing Library
// repose sur un afterEach global — on l'enregistre donc manuellement.
afterEach(cleanup);
