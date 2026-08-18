import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "@/components/cv/LanguageSwitcher";
import { DraftLangIcon } from "@/components/cv/language-drafts/DraftLangIcon";
import { DraftLangPills } from "@/components/cv/language-drafts/DraftLangPills";
import { useLangDraft, toDraftProps, type DraftLangProps } from "@/components/cv/language-drafts/useLangDraft";
import { type ComponentType } from "react";

const MockLangDraft = ({ Draft }: { Draft: ComponentType<DraftLangProps> }) => {
  const m = useLangDraft();
  return <Draft {...toDraftProps(m)} />;
};

const ALL_LANGS = ["English", "Deutsch", "Français", "日本語"];

describe("language switcher drafts", () => {
  it("pills draft shows all languages and switches active on click", async () => {
    const user = userEvent.setup();
    render(<MockLangDraft Draft={DraftLangPills} />);

    for (const name of ALL_LANGS) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "English" }).className).toContain("border-primary");

    await user.click(screen.getByRole("button", { name: "Deutsch" }));

    expect(screen.getByRole("button", { name: "Deutsch" }).className).toContain("border-primary");
    expect(screen.getByRole("button", { name: "English" }).className).not.toContain("border-primary");
  });

  it("menu draft shows the active language in the trigger and adds a language", async () => {
    const user = userEvent.setup();
    render(<MockLangDraft Draft={LanguageSwitcher} />);

    await user.click(screen.getByRole("button", { name: /English/ }));
    await screen.findByText("Add language…");

    // The action icons must be spaced from their labels.
    const plusIcon = document.body.querySelector(".lucide-plus");
    const pencilIcon = document.body.querySelector(".lucide-pencil");
    const trashIcon = document.body.querySelector(".lucide-trash2");
    expect(plusIcon?.classList.toString()).toContain("mr-2");
    expect(pencilIcon?.classList.toString()).toContain("mr-2");
    expect(trashIcon?.classList.toString()).toContain("mr-2");

    await user.click(screen.getByText("Add language…"));
    await screen.findByRole("dialog");

    await user.type(screen.getByPlaceholderText(/e\.g\. Deutsch/), "Español");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    // Reopen the menu — the new language should be listed.
    await user.click(screen.getByRole("button", { name: /English/ }));
    await screen.findByText("Español");
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("icon draft renders a compact trigger", () => {
    render(<MockLangDraft Draft={DraftLangIcon} />);
    expect(screen.getByTitle(/Language — English/)).toBeInTheDocument();
  });
});