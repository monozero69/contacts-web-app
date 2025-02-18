import { render, screen } from "@testing-library/react";
import ContactDetails from "../../src/components/ContactDetails";
import { expect, test } from "vitest";

describe('ContactDetails', () => {
    test('should render', () => {
        render(<ContactDetails />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Email address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
    });
});