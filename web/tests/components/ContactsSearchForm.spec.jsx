import { render, screen } from "@testing-library/react";
import ContactsSearchForm from "../../src/components/ContactsSearchForm";

describe('ContactsSearchForm', () => {
    test('should render', () => {
        render(<ContactsSearchForm />);

        const searchbox = screen.getByRole('searchbox');

        expect(searchbox).toBeInTheDocument();
        expect(searchbox).toHaveAttribute('placeholder', 'Search contacts by last or first or both name(s)');
    });
});