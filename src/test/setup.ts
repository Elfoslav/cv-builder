import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Radix UI Select measures its content with a ResizeObserver.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

// Radix UI pointer capture helpers aren't implemented in jsdom.
Object.defineProperty(window.Element.prototype, "hasPointerCapture", {
  configurable: true,
  value: () => false,
});
Object.defineProperty(window.Element.prototype, "setPointerCapture", {
  configurable: true,
  value: () => {},
});
Object.defineProperty(window.Element.prototype, "releasePointerCapture", {
  configurable: true,
  value: () => {},
});

// Radix UI scrolls the highlighted option into view on open.
Object.defineProperty(window.Element.prototype, "scrollIntoView", {
  configurable: true,
  value: () => {},
});
