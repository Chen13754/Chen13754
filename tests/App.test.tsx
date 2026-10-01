import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

const preference = vi.hoisted(() => ({ reduced: false }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => preference.reduced };
});

beforeEach(() => {
  preference.reduced = false;
});

describe("Research garden", () => {
  it("makes the homepage a short introduction with one real CV navigation link", () => {
    render(<App page="home" />);
    expect(
      screen.getByRole("heading", { name: /Hi, I’m Yuyang/ }),
    ).not.toBeNull();
    expect(screen.getByRole("link", { name: "CV" }).getAttribute("href")).toBe(
      "/Chen13754/cv/",
    );
    expect(
      screen.getByRole("link", { name: /Email/ }).getAttribute("href"),
    ).toBe("mailto:ychenli@connect.ust.hk");
    expect(
      screen.getByRole("link", { name: /GitHub/ }).getAttribute("href"),
    ).toBe("https://github.com/Chen13754");
    expect(screen.queryByRole("heading", { name: /Questions I’m/ })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Open navigation" }),
    ).toBeNull();
    expect(screen.queryByRole("link", { name: "Research" })).toBeNull();
  });

  it("shares motion preference between the homepage and CV and provides a way home", async () => {
    const home = render(<App page="home" />);
    fireEvent.click(screen.getByRole("button", { name: "Enable animations" }));
    await waitFor(() =>
      expect(document.documentElement.dataset.motion).toBe("off"),
    );
    home.unmount();
    const cv = render(<App page="cv" />);
    expect(screen.getByText("Motion off")).not.toBeNull();
    expect(
      screen
        .getByRole("link", { name: "Yuyang, back to home" })
        .getAttribute("href"),
    ).toBe("/Chen13754/");
    fireEvent.click(screen.getByRole("button", { name: "Enable animations" }));
    cv.unmount();
    render(<App page="home" />);
    expect(screen.getByText("Motion on")).not.toBeNull();
  });

  it("exposes the complete homepage when the system reduces motion", () => {
    preference.reduced = true;
    render(<App page="home" />);
    expect(document.documentElement.dataset.motion).toBe("off");
    expect(document.querySelector(".ambient-garden")).toBeNull();
    expect(screen.getByRole("link", { name: "CV" })).not.toBeNull();
    expect(
      screen.getByText(/My interests span embodied intelligence/),
    ).not.toBeNull();
  });

  it("keeps motion off across a remount and exposes all content without entrance hiding", async () => {
    const first = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Enable animations" }));
    await waitFor(() =>
      expect(document.documentElement.dataset.motion).toBe("off"),
    );
    expect(localStorage.getItem("garden-motion")).toBe("off");
    expect(document.querySelector(".ambient-garden")).toBeNull();
    first.unmount();
    render(<App />);
    expect(screen.getByText("Motion off")).not.toBeNull();
    expect(
      screen.getByRole("heading", { name: /Good things begin/ }),
    ).not.toBeNull();
    expect(
      [...document.querySelectorAll("main > section > div")].every(
        (element) => (element as HTMLElement).style.opacity !== "0",
      ),
    ).toBe(true);
  });

  it("prioritizes the system reduced-motion preference over a saved motion-on setting", () => {
    preference.reduced = true;
    localStorage.setItem("garden-motion", "on");
    render(<App />);
    const toggle = screen.getByRole("button", {
      name: /disabled by your system/,
    }) as HTMLButtonElement;
    expect(toggle.disabled).toBe(true);
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(document.documentElement.dataset.motion).toBe("off");
    expect(document.querySelector(".ambient-garden")).toBeNull();
    expect(
      screen.getByRole("heading", { name: /Questions I’m/ }),
    ).not.toBeNull();
  });

  it("opens research details while preserving the distinction between completed and planned work", async () => {
    localStorage.setItem("garden-motion", "off");
    render(<App />);
    const fyp = screen.getByRole("button", {
      name: /From the real world to simulation/,
    });
    expect(fyp.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("heading", { name: "Further planned work" }),
    ).not.toBeNull();
    const multimodal = screen.getByRole("button", {
      name: /Understanding movement, across modalities/,
    });
    fireEvent.click(multimodal);
    expect(multimodal.getAttribute("aria-expanded")).toBe("true");
    expect(fyp.getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByText("Supervisor · Xiaomin Ouyang")).not.toBeNull();
    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "Further planned work" }),
      ).toBeNull(),
    );
    expect(
      screen.getByText("Completed exchange · Munich, Germany"),
    ).not.toBeNull();
  });

  it("uses the Pages subpath for CV downloads and copies the advertised email", async () => {
    localStorage.setItem("garden-motion", "off");
    render(<App />);
    for (const link of screen.getAllByRole("link", { name: "Download CV" })) {
      expect(link.getAttribute("href")).toBe(
        "/Chen13754/documents/yuyang-chen-cv.pdf",
      );
      expect(link.hasAttribute("download")).toBe(true);
    }
    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain("copied"),
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "ychenli@connect.ust.hk",
    );
  });
});
