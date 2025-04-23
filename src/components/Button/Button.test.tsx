import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button 컴포넌트", () => {
  it("기본 렌더링: children이 보여야 하고, primary variant, base size 클래스가 들어있어야 해", () => {
    render(<Button>클릭해</Button>);
    const btn = screen.getByRole("button", { name: /클릭해/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-blue-500");
    expect(btn).toHaveClass("text-base");
  });

  it("variant, size prop에 맞는 클래스가 붙어야 돼", () => {
    render(
      <Button variant="danger" size="xl">
        위험
      </Button>
    );
    const btn = screen.getByRole("button", { name: /위험/i });
    expect(btn).toHaveClass("bg-red-500");
    expect(btn).toHaveClass("text-xl");
  });

  it("loading=true 면 Spinner가 나오고, cursor-wait opacity-75 클래스 있어야 함", () => {
    render(<Button loading>로딩중</Button>);
    const btn = screen.getByRole("button", { name: /로딩중/i });
    const spinner = screen.getByRole("status", { hidden: true });
    expect(spinner).toBeInTheDocument();
    expect(btn).toHaveClass("cursor-wait");
  });

  it("disabled=true 면 aria-disabled 와 disabled 속성이 제대로 세팅돼야 돼", () => {
    render(<Button disabled>비활성</Button>);
    const btn = screen.getByRole("button", { name: /비활성/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("onClick 이벤트 핸들러가 disabled 아닐 때만 호출돼야 한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>눌러</Button>);
    const btn = screen.getByRole("button", { name: /눌러/i });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태면 onClick 절대 호출 안 돼야 함", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        못눌러
      </Button>
    );
    const btn = screen.getByRole("button", { name: /못눌러/i });
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
