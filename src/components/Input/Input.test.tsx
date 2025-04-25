import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("기본 설정에 해당하는 클래스가 들어있어야 함", () => {
    render(<Input placeholder="기본 입력" />);
    const input = screen.getByPlaceholderText("기본 입력");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("text-base");
    expect(input).not.toBeDisabled();
  });

  it("size에 맞는 클래스가 들어있어야 함", () => {
    render(
      <>
        <Input size="base" placeholder="base" />
        <Input size="lg" placeholder="lg" />
        <Input size="xl" placeholder="xl" />
      </>,
    );

    expect(screen.getByPlaceholderText("base")).toHaveClass("text-base");
    expect(screen.getByPlaceholderText("lg")).toHaveClass("text-lg");
    expect(screen.getByPlaceholderText("xl")).toHaveClass("text-xl");
  });

  it("비활성 상태면 aria-disabled, disabled 속성이 true여야 함", () => {
    render(<Input disabled placeholder="비활성화" />);
    const input = screen.getByPlaceholderText("비활성화");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("커스텀 class도 잘 들어있어야 함", () => {
    render(<Input className="custom-class" placeholder="커스텀" />);
    const input = screen.getByPlaceholderText("커스텀");
    expect(input).toHaveClass("custom-class");
  });

  it("사용자 입력도 잘 받아야 함", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="입력 테스트" />);
    const input = screen.getByPlaceholderText("입력 테스트");

    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });
});
