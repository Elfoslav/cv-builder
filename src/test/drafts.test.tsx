import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { useDraftData } from "@/components/cv/drafts/useDraftData";
import { DraftInline } from "@/components/cv/drafts/DraftInline";
import { DraftDrawer } from "@/components/cv/drafts/DraftDrawer";
import { DraftFloating } from "@/components/cv/drafts/DraftFloating";
import DesignDrafts from "@/pages/DesignDrafts";

const Harness = ({ draft }: { draft: "inline" | "drawer" | "floating" }) => {
  const { data, helpers } = useDraftData();
  if (draft === "drawer") return <DraftDrawer data={data} h={helpers} />;
  if (draft === "floating") return <DraftFloating data={data} h={helpers} />;
  return <DraftInline data={data} h={helpers} />;
};

describe("DesignDrafts", () => {
  it("renders the drafts page shell", () => {
    render(
      <MemoryRouter>
        <DesignDrafts />
      </MemoryRouter>,
    );
    expect(screen.getByText("CV editor — design drafts")).toBeInTheDocument();
    expect(screen.getAllByRole("tab").length).toBe(14);
  });

  it("Draft A (inline) lets you add an entry and edit the section", async () => {
    const { container } = render(<Harness draft="inline" />);

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
  });

  it("Draft B (drawer) opens a section form and closes it", async () => {
    render(<Harness draft="drawer" />);

    const addButtons = screen.getAllByRole("button", { name: /^Add$/ });
    expect(addButtons.length).toBeGreaterThanOrEqual(4);

    fireEvent.click(addButtons[0]);
    await waitFor(() => {
      expect(screen.getByText("Edit Work Experience")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /^Done$/ }));
    await waitFor(() => {
      expect(screen.queryByText("Edit Work Experience")).not.toBeInTheDocument();
    });
  });

  it("Draft C (floating) opens a section popover from its Edit pill", async () => {
    render(<Harness draft="floating" />);

    const editPills = screen.getAllByRole("button", { name: /^Edit$/ });
    expect(editPills.length).toBe(8);

    // Experience is the 3rd section (hero, about, experience).
    fireEvent.click(editPills[2]);
    await waitFor(() => {
      expect(screen.getAllByText("Edit Work Experience").length).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getByRole("button", { name: /^Done$/ }));
    await waitFor(() => {
      expect(screen.queryByText("Edit Work Experience")).not.toBeInTheDocument();
    });
  });
});