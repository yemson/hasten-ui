import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "danger", "outline", "ghost", "link"],
    },
    size: {
      control: "radio",
      options: ["base", "lg", "xl"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: {
      control: "text",
      defaultValue: "버튼",
    },
  },
  args: {
    variant: "primary",
    size: "base",
    loading: false,
    disabled: false,
    children: "버튼",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      {["primary", "secondary", "danger", "outline", "ghost", "link"].map(
        (v) => (
          <Button key={v} {...args} variant={v as ButtonProps["variant"]}>
            {v}
          </Button>
        )
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex gap-3">
      {["base", "lg", "xl"].map((s) => (
        <Button key={s} {...args} size={s as ButtonProps["size"]}>
          {s}
        </Button>
      ))}
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    loading: true,
    children: "로딩중",
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    children: "비활성화",
  },
};
