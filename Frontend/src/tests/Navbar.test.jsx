import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar.jsx";

// Mock react-router-dom <Link> to prevent navigation errors in tests
jest.mock("react-router-dom", () => ({
  Link: ({ children, to, style }) => <a href={to} style={style}>{children}</a>
}));

// Mock useUser() from your UserContext
jest.mock("../contexts/UserContext.jsx", () => ({
  useUser: () => ({
    user: { name: "Test User" },
    logout: jest.fn()
  })
}));

test("renders navbar links correctly", () => {
  render(<Navbar />);

  // Title
  expect(screen.getByText("🎬 Movie Review")).toBeInTheDocument();

  // Basic links
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Reviews")).toBeInTheDocument();

  // Logged-in user links
  expect(screen.getByText("Add Review")).toBeInTheDocument();
  expect(screen.getByText("My Profile")).toBeInTheDocument();
  expect(screen.getByText("Sign Out")).toBeInTheDocument();
});
