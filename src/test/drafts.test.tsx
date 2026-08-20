import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DesignDrafts from "@/pages/DesignDrafts";

describe("DesignDrafts", () => {
  it("renders the drafts page shell", () => {
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );
    expect(screen.getByText("Design drafts")).toBeInTheDocument();
    expect(screen.getByText("No drafts yet.")).toBeInTheDocument();
  });

  it("has a back link to the editor", () => {
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /Editor/ });
    expect(link).toHaveAttribute("href", "/");
  });
});
