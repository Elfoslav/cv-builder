import { render, screen, waitFor, within } from "@testing-library/react";
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
    const { container } = render(<Harness theme="forest" />);
    const themed = container.querySelector('[data-theme="forest"]');
    expect(themed).toBeInTheDocument();
    expect(themed).toHaveClass("cv-theme");
  });

  it("lets you pick a section design from the section's edit panel", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    expect(container.querySelector(".cv-skillbar")).toBeInTheDocument();

    // Skills is the 5th editable section (hero, about, experience, education, skills).
    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[4]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Skills/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Dot list" }));

    await waitFor(() => {
      expect(container.querySelector(".cv-skill-dot")).toBeInTheDocument();
      expect(container.querySelector(".cv-skillbar")).not.toBeInTheDocument();
    });
  });

  it("switches the whole-resume color theme from the topbar switcher", async () => {
    const user = userEvent.setup();
    const { container } = render(<ThemeHarness />);

    const trigger = within(container).getByRole("button", { name: /Modern Indigo/ });
    await user.click(trigger);

    await user.click(screen.getByRole("menuitem", { name: /Minimal Mono/ }));

    expect(within(container).getByRole("button", { name: /Minimal Mono/ })).toBeInTheDocument();
  });

  it("switches projects to the card-free plain-rows design", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    expect(container.querySelector(".cv-project-card")).toBeInTheDocument();

    // Projects is the 6th editable section (hero, about, experience, education, skills, projects).
    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Plain rows" }));

    await waitFor(() => {
      expect(container.querySelector(".cv-project-card")).not.toBeInTheDocument();
      expect(container.querySelector(".cv-project-row")).toBeInTheDocument();
    });
  });

  it("switches projects to the timeline design", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Timeline" }));

    await waitFor(() => {
      const projectsSection = within(container).getByText("Featured Projects").closest("section");
      expect(projectsSection?.querySelector(".cv-timeline-item")).toBeInTheDocument();
      expect(projectsSection?.querySelector(".cv-project-card")).not.toBeInTheDocument();
    });
  });

  it("switches projects to the accent card design", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[5]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Featured Projects/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Accent cards" }));

    await waitFor(() => {
      const projectsSection = within(container).getByText("Featured Projects").closest("section");
      expect(projectsSection?.querySelector(".bg-gradient-primary")).toBeInTheDocument();
    });
  });

  it("expands the CV to full width while a section is being edited", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    const wrapper = container.querySelector(".cv-theme")!;
    expect(wrapper).not.toHaveClass("cv-editing");

    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[3]); // education

    await waitFor(() => {
      expect(wrapper).toHaveClass("cv-editing");
    });

    await user.click(within(container).getByRole("button", { name: /^Done$/ }));
    await waitFor(() => {
      expect(wrapper).not.toHaveClass("cv-editing");
    });
  });

  it("switches experience to accent cards", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[2]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Work Experience/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Accent cards" }));

    await waitFor(() => {
      const expSection = within(container).getByText("Work Experience").closest("section");
      expect(expSection?.querySelector(".cv-timeline-card")).toBeInTheDocument();
      expect(expSection?.querySelector(".cv-timeline-item")).not.toBeInTheDocument();
      expect(expSection?.querySelector(".bg-gradient-primary")).toBeInTheDocument();
    });
  });

  it("switches hobbies to flat cards", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    const editButtons = within(container).getAllByRole("button", { name: /^Edit$/ });
    await user.click(editButtons[6]);

    await waitFor(() => {
      expect(within(container).getAllByText(/Editing — Interests/).length).toBeGreaterThan(0);
    });

    const combobox = within(container).getByRole("combobox", { name: "Section design" });
    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Flat cards" }));

    await waitFor(() => {
      const hobbiesSection = within(container).getByText("Interests").closest("section");
      expect(hobbiesSection?.querySelector(".cv-hobby-tile")).toBeInTheDocument();
      expect(hobbiesSection?.querySelector(".cv-hobby-pill")).not.toBeInTheDocument();
    });
  });
});
