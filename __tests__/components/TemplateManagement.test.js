import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import TemplateManagement from "../../components/dashboard/settings/TemplateManagement";
import { renderWithProviders, mockUser } from "../utils/test-utils";

// Mock the toast notifications
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the API call
jest.mock("../../lib/actions/store.action", () => ({
  updateStoreTemplate: jest.fn(),
}));

// Mock the InteractiveTemplateGrid component for focused testing
jest.mock("../../components/dashboard/settings/InteractiveTemplateGrid", () => {
  return function MockInteractiveTemplateGrid({
    initialTemplate,
    onTemplateChange,
    disabled,
  }) {
    return (
      <div data-testid="template-grid">
        <p>Current template: {initialTemplate}</p>
        <button
          data-testid="template-button-classic"
          onClick={() => onTemplateChange("classic")}
          disabled={disabled}
        >
          Select Classic Template
        </button>
        <button
          data-testid="template-button-modern"
          onClick={() => onTemplateChange("modern")}
          disabled={disabled}
        >
          Select Modern Template
        </button>
        {disabled && <p data-testid="updating-indicator">Updating...</p>}
      </div>
    );
  };
});

const { updateStoreTemplate } = require("../../lib/actions/store.action");

describe("TemplateManagement Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders template grid with current template", () => {
      renderWithProviders(<TemplateManagement />);

      expect(screen.getByTestId("template-grid")).toBeInTheDocument();
      expect(screen.getByText("Current template: modern")).toBeInTheDocument();
    });

    test("renders with custom user template", () => {
      const customUser = { ...mockUser, template_name: "classic" };

      renderWithProviders(<TemplateManagement />, { user: customUser });

      expect(screen.getByText("Current template: classic")).toBeInTheDocument();
    });
  });

  describe("Template Selection", () => {
    test("successfully updates template", async () => {
      // Mock successful API response
      updateStoreTemplate.mockResolvedValueOnce({ success: true });

      renderWithProviders(<TemplateManagement />);

      // Click to change template
      const classicButton = screen.getByTestId("template-button-classic");
      await user.click(classicButton);

      // Verify API was called with correct parameters
      await waitFor(() => {
        expect(updateStoreTemplate).toHaveBeenCalledWith({
          storeName: "test-store",
          templateName: "classic",
        });
      });

      // Verify success toast was shown
      expect(toast.success).toHaveBeenCalledWith(
        "Template updated successfully!",
        { description: "Your store template has been changed." }
      );
    });

    test("handles API errors gracefully", async () => {
      // Mock API error
      const errorMessage = "Network error occurred";
      updateStoreTemplate.mockRejectedValueOnce(new Error(errorMessage));

      renderWithProviders(<TemplateManagement />);

      // Click to change template
      const classicButton = screen.getByTestId("template-button-classic");
      await user.click(classicButton);

      // Verify error toast was shown
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to update template", {
          description: errorMessage,
        });
      });
    });

    test("disables template selection during API call", async () => {
      // Mock slow API response
      updateStoreTemplate.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      renderWithProviders(<TemplateManagement />);

      // Click to change template
      const classicButton = screen.getByTestId("template-button-classic");
      await user.click(classicButton);

      // Verify buttons are disabled during API call
      expect(classicButton).toBeDisabled();
      expect(screen.getByTestId("template-button-modern")).toBeDisabled();
      expect(screen.getByTestId("updating-indicator")).toBeInTheDocument();

      // Wait for API call to complete
      await waitFor(() => {
        expect(classicButton).not.toBeDisabled();
      });
    });
  });

  describe("User Context Integration", () => {
    test("updates user context after successful template change", async () => {
      updateStoreTemplate.mockResolvedValueOnce({ success: true });

      const { queryClient } = renderWithProviders(<TemplateManagement />);

      // Initial template should be 'modern'
      expect(screen.getByText("Current template: modern")).toBeInTheDocument();

      // Change to classic template
      const classicButton = screen.getByTestId("template-button-classic");
      await user.click(classicButton);

      await waitFor(() => {
        expect(updateStoreTemplate).toHaveBeenCalled();
      });

      // Note: In a real test, we'd verify the user context was updated
      // This would require access to the UserContext state
    });
  });

  describe("Edge Cases", () => {
    test("handles missing storeName gracefully", async () => {
      const userWithoutStore = { ...mockUser, storeName: null };

      renderWithProviders(<TemplateManagement />, { user: userWithoutStore });

      const classicButton = screen.getByTestId("template-button-classic");
      await user.click(classicButton);

      // Should still attempt API call (backend will handle auth)
      expect(updateStoreTemplate).toHaveBeenCalledWith({
        storeName: null,
        templateName: "classic",
      });
    });

    test("handles undefined template gracefully", () => {
      const userWithoutTemplate = { ...mockUser, template_name: undefined };

      renderWithProviders(<TemplateManagement />, {
        user: userWithoutTemplate,
      });

      expect(screen.getByText("Current template:")).toBeInTheDocument();
    });
  });
});
