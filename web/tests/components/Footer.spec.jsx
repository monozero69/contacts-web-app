import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import { expect, test } from "vitest";

describe('Footer', () => {
    test('should render', () => {
        render(<Footer />);

        const footer = screen.getByRole('navigation');

        expect(footer).toBeInTheDocument();
        expect(footer).toHaveTextContent(/All Rights Reserved/i);
    });
});