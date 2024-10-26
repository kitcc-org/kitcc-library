import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

vi.mock("@remix-run/react", () => {
  const useNavigate = vi.fn();
  const form = vi
    .fn()
    .mockImplementation(({ children }: { children: React.ReactElement }) => {
      return children;
    });
  return {
    useNavigate: useNavigate,
    Form: form,
  };
});

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  server.close();
});
