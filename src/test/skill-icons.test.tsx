import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { SkillsSection } from "@/components/cv/SkillsSection";
import { SkillsView } from "@/components/cv/themed/skills/SkillsView";
import { defaultCV, type CVData } from "@/lib/cv-types";
import { type SkillLayout } from "@/lib/section-designs";

const skill = { ...defaultCV.skills[0], icon: "Code2" as const };
const groups = [{ group: defaultCV.skillGroups[0], items: [skill] }];

describe("skill icons", () => {
  it.each(["bars", "chips", "dots"] as SkillLayout[])("renders optional icons in %s", (variant) => {
    const { container, rerender } = render(<SkillsView groups={groups} variant={variant} columns={defaultCV.skillColumns} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    rerender(<SkillsView groups={[{ ...groups[0], items: [{ ...skill, icon: undefined }] }]} variant={variant} columns={defaultCV.skillColumns} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("lets a skill icon be selected and removed", async () => {
    const user = userEvent.setup();
    const Harness = () => {
      const [data, setData] = useState<CVData>(defaultCV);
      return <><SkillsSection data={data} setData={setData} /><output data-testid="icon">{data.skills[0].icon ?? "none"}</output></>;
    };
    render(<Harness />);
    const picker = screen.getByRole("combobox", { name: `Icon for ${skill.name}` });
    await user.click(picker);
    await user.click(screen.getByRole("option", { name: "Code2" }));
    expect(screen.getByTestId("icon")).toHaveTextContent("Code2");
    await user.click(picker);
    await user.click(screen.getByRole("option", { name: "No icon" }));
    expect(screen.getByTestId("icon")).toHaveTextContent("none");
  });
});
