import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { defaultCV } from "@/lib/cv-types";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { CVPreview } from "@/components/cv/CVPreview";

const Harness = () => {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(defaultCV)));
  return <EditableCVPreview data={data} setData={setData} />;
};

describe("EditableCVPreview", () => {
  it("shows an always-visible editable section for every CV section", () => {
    const { container } = render(<Harness />);
    // hero, about, experience, education, skills, projects, hobbies, footer
    expect(screen.getAllByRole("button", { name: /^Edit$/ }).length).toBe(8);
    // each list section shows an always-visible "Add …" chip
    expect(
      container.querySelectorAll("button").length,
    ).toBeGreaterThan(screen.getAllByRole("button", { name: /^Edit$/ }).length);
  });

  it("lets you add a list item and edit the section inline", async () => {
    const { container } = render(<Harness />);

    const addChip = screen.getAllByRole("button").find((b) =>
      b.textContent?.includes("Add experience entry"),
    );
    expect(addChip).toBeInTheDocument();
    fireEvent.click(addChip!);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Work Experience/).length).toBeGreaterThan(0);
    });

    const formAdd = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.trim().includes("Add experience"),
    );
    fireEvent.click(formAdd!);

    await waitFor(() => {
      expect(screen.getAllByText("Role").length).toBeGreaterThan(0);
    });

    // Close the inline editor again.
    fireEvent.click(screen.getByRole("button", { name: /^Done$/ }));
    await waitFor(() => {
      expect(screen.queryByText(/Editing — Work Experience/)).not.toBeInTheDocument();
    });
  });

  it("edits section title/subtitle labels through the form", async () => {
    const { container } = render(<Harness />);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    // Experience section is the 3rd editable section (hero, about, experience).
    fireEvent.click(editButtons[2]);

    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Work Experience/).length).toBeGreaterThan(0);
    });

    const titleInput = Array.from(container.querySelectorAll("input")).find((i) =>
      i.parentElement?.textContent?.includes("Section title"),
    );
    expect(titleInput).toBeTruthy();

    fireEvent.change(titleInput!, { target: { value: "Career" } });

    await waitFor(() => {
      expect(
        Array.from(container.querySelectorAll("h2")).some((h) => h.textContent?.includes("Career")),
      ).toBe(true);
    });
  });

  it("reorders sections up/down with Edit always last and hero/footer pinned", () => {
    const { container } = render(<Harness />);

    const titles = () =>
      Array.from(container.querySelectorAll("h2"))
        .map((h) => h.textContent?.trim())
        .filter(Boolean);

    expect(titles()).toEqual([
      "About Me", "Work Experience", "Education", "Skills", "Featured Projects", "Interests",
    ]);

    // Every movable section gets an up/down button; hero & footer get none.
    expect(screen.getAllByTitle("Move section up")).toHaveLength(6);
    expect(screen.getAllByTitle("Move section down")).toHaveLength(6);
    expect(screen.getAllByRole("button", { name: /^Edit$/ })).toHaveLength(8);

    // First section can't move up, last can't move down.
    expect(screen.getAllByTitle("Move section up")[0]).toBeDisabled();
    expect(screen.getAllByTitle("Move section down")[5]).toBeDisabled();

    // Move "About Me" (first movable section) down below Work Experience.
    fireEvent.click(screen.getAllByTitle("Move section down")[0]);
    expect(titles()).toEqual([
      "Work Experience", "About Me", "Education", "Skills", "Featured Projects", "Interests",
    ]);

    // Move it back up again.
    fireEvent.click(screen.getAllByTitle("Move section up")[1]);
    expect(titles()).toEqual([
      "About Me", "Work Experience", "Education", "Skills", "Featured Projects", "Interests",
    ]);

    // Within a section's button cluster the Edit button is the last one.
    const sectionEl = screen.getByText("About Me").closest("section")!.parentElement!;
    const cluster = Array.from(sectionEl.querySelectorAll("button")).filter((b) =>
      ["Move section up", "Move section down", "Edit"].some((n) => b.getAttribute("title") === n || b.textContent?.trim() === "Edit"),
    );
    expect(cluster.at(-1)!.textContent?.trim()).toBe("Edit");
  });

  it("marks empty sections so they are hidden in print/export", () => {
    const { container } = render(
      <EditableCVPreview
        data={{ ...defaultCV, projects: [] }}
        setData={() => {}}
      />,
    );

    const wrapperOf = (title: string) => {
      const header = Array.from(container.querySelectorAll("h2")).find((h) =>
        h.textContent?.includes(title),
      );
      expect(header).toBeTruthy();
      return header!.closest(".group\\/section") as HTMLElement;
    };

    expect(wrapperOf("Featured Projects").className).toContain("empty-section");
    expect(wrapperOf("Work Experience").className).not.toContain("empty-section");
  });

  it("export renderer respects the persisted section order", () => {
    const reordered = {
      ...defaultCV,
      sectionOrder: [
        "hero", "projects", "hobbies", "about", "experience", "education", "skills", "footer",
      ] as const,
    };
    const { container } = render(<CVPreview data={reordered} />);
    const titles = Array.from(container.querySelectorAll("h2"))
      .map((h) => h.textContent?.trim())
      .filter(Boolean);
    expect(titles).toEqual([
      "Featured Projects", "Interests", "About Me", "Work Experience", "Education", "Skills",
    ]);
  });

  it("export renders the same section layouts as the on-screen editor", () => {
    const { container: page } = render(
      <EditableCVPreview data={defaultCV} setData={() => {}} />,
    );
    const { container: exportBox } = render(<CVPreview data={defaultCV} />);

    const sectionOf = (container: HTMLElement, title: string) => {
      const header = Array.from(container.querySelectorAll("h2")).find((h) =>
        h.textContent?.includes(title),
      );
      expect(header).toBeTruthy();
      return header!.closest("section") as HTMLElement;
    };

    // Skills, projects and hobbies must keep the exact same grid markup
    // on screen and in print/export.
    for (const title of ["Skills", "Featured Projects", "Interests"]) {
      expect(sectionOf(exportBox, title).outerHTML).toBe(
        sectionOf(page, title).outerHTML,
      );
    }
    // The footer must match too.
    expect(exportBox.querySelector("footer")!.outerHTML).toBe(
      page.querySelector("footer")!.outerHTML,
    );
  });

  it("shows Cancel to the left of Done while editing", async () => {
    render(<Harness />);
    fireEvent.click(screen.getAllByRole("button", { name: /^Edit$/ })[2]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /^Cancel$/ })).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /^Done$/ })).toBeInTheDocument();

    // Cancel must come before Done in the button group (left of it).
    const cancel = screen.getByRole("button", { name: /^Cancel$/ });
    const done = screen.getByRole("button", { name: /^Done$/ });
    expect(cancel.compareDocumentPosition(done) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("cancel discards edits made while the section was open", async () => {
    const { container } = render(<Harness />);

    fireEvent.click(screen.getAllByRole("button", { name: /^Edit$/ })[2]);
    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Work Experience/).length).toBeGreaterThan(0);
    });

    const titleInput = Array.from(container.querySelectorAll("input")).find((i) =>
      i.parentElement?.textContent?.includes("Section title"),
    );
    fireEvent.change(titleInput!, { target: { value: "Career" } });
    await waitFor(() => {
      expect(
        Array.from(container.querySelectorAll("h2")).some((h) => h.textContent?.includes("Career")),
      ).toBe(true);
    });

    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/ }));
    await waitFor(() => {
      expect(
        Array.from(container.querySelectorAll("h2")).some((h) => h.textContent?.includes("Career")),
      ).toBe(false);
      expect(
        Array.from(container.querySelectorAll("h2")).some((h) =>
          h.textContent?.includes("Work Experience"),
        ),
      ).toBe(true);
    });
  });

  it("edits the footer copyright line", async () => {
    const { container } = render(<Harness />);

    const year = new Date().getFullYear();
    expect(
      Array.from(container.querySelectorAll("footer")).some((f) =>
        f.textContent?.includes(`© ${year} Alex Morgan`),
      ),
    ).toBe(true);

    const editButtons = screen.getAllByRole("button", { name: /^Edit$/ });
    fireEvent.click(editButtons[editButtons.length - 1]);
    await waitFor(() => {
      expect(screen.getAllByText(/Editing — Footer/).length).toBeGreaterThan(0);
    });

    const copyrightInput = Array.from(container.querySelectorAll("input")).find((i) =>
      i.parentElement?.textContent?.includes("copyright line"),
    );
    expect(copyrightInput).toBeTruthy();
    fireEvent.change(copyrightInput!, { target: { value: "© 2026 ACME Co." } });

    await waitFor(() => {
      expect(
        Array.from(container.querySelectorAll("footer")).some((f) =>
          f.textContent?.includes("© 2026 ACME Co."),
        ),
      ).toBe(true);
    });
  });
});