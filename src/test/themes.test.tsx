import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DesignDrafts from "@/pages/DesignDrafts";

describe("resume theme drafts", () => {
  it("renders a theme tab for every draft and shows the full CV with all sections", () => {
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );

    for (const name of [
      "Modern Indigo", "Classic Serif", "Minimal Mono", "Earthy Warm",
      "Oceanic", "Sunset", "Forest", "Slate",
    ]) {
      expect(screen.getByRole("tab", { name })).toBeInTheDocument();
    }

    // Default tab renders the whole resume, every section included.
    const themed = document.querySelector('[data-theme="indigo"]');
    expect(themed).toBeInTheDocument();
    expect(themed).toHaveClass("cv-theme");

    for (const text of [
      "Alex Morgan",
      "About Me",
      "Work Experience",
      "Education",
      "Skills",
      "Featured Projects",
      "Interests",
      "Thanks for taking the time to read my CV.",
    ]) {
      expect(themed).toHaveTextContent(text);
    }
  });

  it("switches between theme designs", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );

    expect(document.querySelector('[data-theme="indigo"]')).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Classic Serif" }));
    expect(document.querySelector('[data-theme="classic"]')).toBeInTheDocument();
    expect(document.querySelector('[data-theme="minimal"]')).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Earthy Warm" }));
    expect(document.querySelector('[data-theme="earthy"]')).toBeInTheDocument();
  });

  it("renders every new theme design", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );

    const newThemes = [
      ["ocean", "Oceanic"],
      ["sunset", "Sunset"],
      ["forest", "Forest"],
      ["slate", "Slate"],
    ] as const;

    for (const [id, name] of newThemes) {
      await user.click(screen.getByRole("tab", { name }));
      const themed = document.querySelector(`[data-theme="${id}"]`);
      expect(themed).toBeInTheDocument();
      expect(themed).toHaveTextContent("Alex Morgan");
    }
  });

  it("renders palette swatch chips on the theme cards", () => {
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );

    const card = screen
      .getByRole("tab", { name: "Minimal Mono" })
      .closest("div")?.parentElement?.parentElement;
    const chips = card?.querySelectorAll("span[style]");
    expect(chips?.length).toBeGreaterThanOrEqual(4);
  });

  it("renders distinct section designs per theme", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );

    // Indigo — the reference design (bars / cards / timeline / cards).
    expect(document.querySelector('[data-theme="indigo"] .cv-skillbar')).toBeInTheDocument();

    // Minimal — dot-list skills + row projects/timeline + interest pills.
    await user.click(screen.getByRole("tab", { name: "Minimal Mono" }));
    const minimal = document.querySelector('[data-theme="minimal"]')!;
    expect(minimal.querySelector(".cv-skill-dot")).toBeInTheDocument();
    expect(minimal.querySelector(".cv-skillbar")).not.toBeInTheDocument();
    expect(minimal.querySelector(".cv-project-row")).toBeInTheDocument();
    expect(minimal.querySelector(".cv-timeline-row")).toBeInTheDocument();
    expect(minimal.querySelector(".cv-timeline-card")).not.toBeInTheDocument();
    expect(minimal.querySelector(".cv-hobby-pill")).toBeInTheDocument();
    expect(minimal.querySelector(".cv-hobby-check")).not.toBeInTheDocument();

    // Forest — bars + row projects + cards timeline + checklist interests.
    await user.click(screen.getByRole("tab", { name: "Forest" }));
    const forest = document.querySelector('[data-theme="forest"]')!;
    expect(forest.querySelector(".cv-skillbar")).toBeInTheDocument();
    expect(forest.querySelector(".cv-project-row")).toBeInTheDocument();
    expect(forest.querySelector(".cv-timeline-card")).toBeInTheDocument();
    expect(forest.querySelector(".cv-hobby-check")).toBeInTheDocument();

    // Earthy — chips skills + card timeline.
    await user.click(screen.getByRole("tab", { name: "Earthy Warm" }));
    const earthy = document.querySelector('[data-theme="earthy"]')!;
    expect(earthy.querySelector(".cv-skill-chip")).toBeInTheDocument();
    expect(earthy.querySelector(".cv-timeline-card")).toBeInTheDocument();
  });
});