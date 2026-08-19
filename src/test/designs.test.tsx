import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { defaultCV } from "@/lib/cv-types";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { ThemeSwitcher } from "@/components/cv/ThemeSwitcher";
import { type ThemeId } from "@/lib/themes";

const Harness = ({ theme = "indigo" }: { theme?: ThemeId }) => {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(defaultCV)));
  return <EditableCVPreview data={data} setData={setData} theme={theme} />;
};

const ThemeHarness = () => {
  const [theme, setTheme] = useState<ThemeId>("indigo");
  return <ThemeSwitcher theme={theme} setTheme={setTheme} />;
};

describe("color theme + section designs", () => {
  it("applies the color theme to the CV wrapper", () => {
    render(<Harness theme="forest" />);
    const themed = document.querySelector('[data-theme="forest"]');
    expect(themed).toBeInTheDocument();
    expect(themed).toHaveClass("cv-theme");
  });

  it("lets you pick a section design from the section's edit panel", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(document.querySelector(".cv-skillbar")).toBeInTheDocument();

    // Skills is the 5th editable section (hero, about, experience, education, skills).
    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[4]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Skills/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Dot list" }));

    await waitFor(() => {
      expect(document.querySelector(".cv-skill-dot")).toBeInTheDocument();
      expect(document.querySelector(".cv-skillbar")).not.toBeInTheDocument();
    });
  });

  it("switches the whole-resume color theme from the topbar switcher", async () => {
    const user = userEvent.setup();
    render(<ThemeHarness />);

    const trigger = screen.getByRole("button", { name: /Modern Indigo/ });
    await user.click(trigger);

    await user.click(screen.getByRole("menuitem", { name: /Minimal Mono/ }));

    expect(screen.getByRole("button", { name: /Minimal Mono/ })).toBeInTheDocument();
  });

  it("switches projects to the card-free plain-rows design", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(document.querySelector(".cv-project-card")).toBeInTheDocument();

    // Projects is the 6th editable section (hero, about, experience, education, skills, projects).
    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Plain rows" }));

    await waitFor(() => {
      expect(document.querySelector(".cv-project-card")).not.toBeInTheDocument();
      expect(document.querySelector(".cv-project-row")).toBeInTheDocument();
    });
  });

  it("switches projects to the timeline design", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Timeline" }));

    await waitFor(() => {
      const projectsSection = screen.getByText("Featured Projects").closest("section");
      expect(projectsSection?.querySelector(".cv-timeline-item")).toBeInTheDocument();
      expect(projectsSection?.querySelector(".cv-project-card")).not.toBeInTheDocument();
    });
  });

  it("switches projects to the accent card design", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Accent cards" }));

    await waitFor(() => {
      const projectsSection = screen.getByText("Featured Projects").closest("section");
      expect(projectsSection?.querySelector(".bg-gradient-primary")).toBeInTheDocument();
    });
  });

  it("switches experience to accent cards", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[2]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Work Experience/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Accent cards" }));

    await waitFor(() => {
      const expSection = screen.getByText("Work Experience").closest("section");
      expect(expSection?.querySelector(".cv-timeline-card")).toBeInTheDocument();
      expect(expSection?.querySelector(".cv-timeline-item")).not.toBeInTheDocument();
      expect(expSection?.querySelector(".bg-gradient-primary")).toBeInTheDocument();
    });
  });

  it("switches hobbies to flat tiles", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[6]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Interests/).length).toBeGreaterThan(0);
    });

    const combobox = screen.getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Flat tiles" }));

    await waitFor(() => {
      const hobbiesSection = screen.getByText("Interests").closest("section");
      expect(hobbiesSection?.querySelector(".cv-hobby-tile")).toBeInTheDocument();
      expect(hobbiesSection?.querySelector(".cv-hobby-pill")).not.toBeInTheDocument();
    });
  });
});