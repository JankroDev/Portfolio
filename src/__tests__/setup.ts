import { vi } from 'vitest'

// jsdom does not implement scrollTo; the router's scrollBehavior calls it on navigation.
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true })
