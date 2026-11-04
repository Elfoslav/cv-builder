import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { HobbyPills } from "@/components/cv/themed/hobbies/HobbyPills";
import { HobbyCardContent } from "@/components/cv/themed/hobbies/HobbyCardContent";
import { defaultCV } from "@/lib/cv-types";

describe("interest icons", () => {
  it("offers the expanded icons and no icon in the interests editor", async () => {
    const user = userEvent.setup();
    const Harness = () => {
      const [data, setData] = useState(defaultCV);
      return <EditableCVPreview data={data} setData={setData} />;
    };
    render(<Harness />);
    await user.click(screen.getAllByRole("button", { name: "Edit" })[6]);
    await user.click(await screen.findByRole("combobox", { name: `Icon for ${defaultCV.hobbies[0].label}` }));
    await user.type(screen.getByRole("combobox", { name: "Search interest icons" }), "paw");
    expect(screen.queryByRole("option", { name: "ChefHat" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: "PawPrint" }));
    expect(screen.getByRole("combobox", { name: `Icon for ${defaultCV.hobbies[0].label}` })).toHaveTextContent("PawPrint");
    await user.click(screen.getByRole("combobox", { name: `Icon for ${defaultCV.hobbies[0].label}` }));
    await user.type(screen.getByRole("combobox", { name: "Search interest icons" }), "no icon");
    await user.click(screen.getByRole("option", { name: "No icon" }));
    expect(screen.getByRole("combobox", { name: `Icon for ${defaultCV.hobbies[0].label}` })).toHaveTextContent("No icon");
  });

  it("renders selected icons and omits the icon and badge when none is selected", () => {
    const hobby = { id: "1", label: "Animals", icon: "PawPrint" as const };
    const { container, rerender } = render(<HobbyPills hobbies={[hobby]} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    rerender(<HobbyPills hobbies={[{ ...hobby, icon: "none" }]} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    rerender(<HobbyCardContent hobby={{ ...hobby, icon: "none" }} horizontal />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(screen.getByText("Animals")).toBeInTheDocument();
  });
});
