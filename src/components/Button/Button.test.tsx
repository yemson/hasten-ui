import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("children이 보여야 하고, 기본 설정에 해당하는 클래스가 들어있어야 함", () => {
    render(<Button>클릭해</Button>);
    const btn = screen.getByRole("button", { name: /클릭해/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-blue-500", "text-base");
  });

  it("variant, size에 맞는 클래스가 들어있어야 함", () => {
    render(
      <Button variant="danger" size="xl">
        위험
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /위험/i });
    expect(btn).toHaveClass("bg-red-500", "text-xl");
  });

  it("로딩 상태면 Spinner 나오고 비활성 상태에다가 aria-busy가 true여야 함", () => {
    render(<Button loading>로딩중</Button>);
    const btn = screen.getByRole("button", { name: /로딩중/i });
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("비활성 상태면 aria-disabled 와 disabled 속성이 true여야 함", () => {
    render(<Button disabled>비활성</Button>);
    const btn = screen.getByRole("button", { name: /비활성/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("비활성 상태가 아닐 땐 클릭 이벤트가 제대로 작동해야 함", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>눌러</Button>);
    const btn = screen.getByRole("button", { name: /눌러/i });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("비활성 상태면 클릭 이벤트 작동하면 안됌", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        못눌러
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /못눌러/i });
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("커스텀 class도 잘 들어있어야 함", () => {
    render(<Button className="custom-class">커스텀</Button>);
    const btn = screen.getByRole("button", { name: /커스텀/i });
    expect(btn).toHaveClass("custom-class");
  });

  it("focus 시에 ring 이 잘 들어가야 함", () => {
    render(<Button>포커스</Button>);
    const btn = screen.getByRole("button", { name: /포커스/i });
    btn.focus();
    expect(btn).toHaveClass(
      "focus-visible:ring-2",
      "focus-visible:ring-blue-500",
    );
  });
});
