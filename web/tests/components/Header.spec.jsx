import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";
import { expect, test } from "vitest";

describe('Header', () => {
    test('should render', () => {
        render(<Header />);

        const header = screen.getByRole('navigation');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('ContactsApp');
    });

    test('should have a search box', () => {
        render(<Header />);

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
    
    test('should have add contact button', () => {
        render(<Header />);

        expect(screen.getByRole('button')).toHaveTextContent(/add contact/i);
    });
});
