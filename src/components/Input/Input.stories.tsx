import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["base", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "입력하세요",
  },
};

export const AllSizes: Story = {
  args: {
    placeholder: "입력하세요",
  },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {["base", "lg", "xl"].map((s) => (
        <Input key={s} {...args} size={s as InputProps["size"]} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화됨",
  },
};
