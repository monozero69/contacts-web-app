import { render, screen } from "@testing-library/react";
import ContactForm from "../../src/components/ContactForm";
import { expect, test } from "vitest";

describe('Add contact form', () => {
    test('should render', () => {
        render(<ContactForm show='true'/>);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/Add Contact/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'First Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Email address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
    });
});