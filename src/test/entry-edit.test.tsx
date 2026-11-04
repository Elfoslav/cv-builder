import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { CVPreview } from "@/components/cv/CVPreview";
import { defaultCV } from "@/lib/cv-types";
import { SECTION_DESIGN_OPTIONS, type ListLayout } from "@/lib/section-designs";

const Harness = ({ variant }: { variant?: ListLayout }) => {
  const [data, setData] = useState(() => ({ ...defaultCV, sectionDesigns: { ...defaultCV.sectionDesigns, experience: variant ?? defaultCV.sectionDesigns.experience } }));
  return <EditableCVPreview data={data} setData={setData} />;
};

describe("individual experience and education editing", () => {
  it.each(SECTION_DESIGN_OPTIONS.experience.map((option) => option.id))("offers entry controls in %s", (variant) => {
    render(<Harness variant={variant} />);
    expect(screen.getByRole("button", { name: `Edit ${defaultCV.experience[0].title}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `Edit ${defaultCV.education[0].title}` })).toBeInTheDocument();
  });

  it("edits only the chosen entry and can cancel changes", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: `Edit ${defaultCV.experience[0].title}` }));
    const dialog = screen.getByRole("dialog", { name: /Edit Work Experience/ });
    expect(within(dialog).getByDisplayValue(defaultCV.experience[0].company)).toBeInTheDocument();
    expect(within(dialog).queryByDisplayValue(defaultCV.experience[1].company)).not.toBeInTheDocument();
    await user.clear(within(dialog).getByPlaceholderText("Company"));
    await user.type(within(dialog).getByPlaceholderText("Company"), "Example Corp");
    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.getByText(defaultCV.experience[0].company)).toBeInTheDocument();
    expect(screen.queryByText("Example Corp")).not.toBeInTheDocument();
  });

  it("saves changes to a selected education entry", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: `Edit ${defaultCV.education[0].title}` }));
    const dialog = screen.getByRole("dialog", { name: /Edit Education/ });
    const school = within(dialog).getByPlaceholderText("School");
    await user.clear(school);
    await user.type(school, "Example University");
    await user.click(within(dialog).getByRole("button", { name: "Done" }));
    expect(screen.getByText("Example University")).toBeInTheDocument();
  });

  it("does not include entry edit actions in the export renderer", () => {
    render(<CVPreview data={defaultCV} />);
    expect(screen.queryByRole("button", { name: /Edit / })).not.toBeInTheDocument();
  });
});
