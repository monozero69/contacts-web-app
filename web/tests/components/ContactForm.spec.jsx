import { render, screen, within } from "@testing-library/react";
import ContactForm from "../../src/components/ContactForm";
import { expect, test } from "vitest";
import { ContactFormType, EMPTY_CONTACT } from "../../src/constants";
import { TEST_RUBY_MAY_CONTACT } from "../test-helper";

describe('Add contact form', () => {
    test('should render', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.ADD} />);

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

    test('should initial display empty field values', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.ADD} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(EMPTY_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(EMPTY_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(EMPTY_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(EMPTY_CONTACT.email);
    });

    test('should be editable', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.ADD} contact={TEST_RUBY_MAY_CONTACT} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Last Name'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Phone number'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Email address'})).not.toHaveAttribute('readOnly');
    });
});

describe('Edit contact form', () => {
    test('should render', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.UPDATE} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/Edit Contact/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'First Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Email address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
    });

    test('should initial show contact values', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.UPDATE} contact={TEST_RUBY_MAY_CONTACT} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(TEST_RUBY_MAY_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(TEST_RUBY_MAY_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(TEST_RUBY_MAY_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(TEST_RUBY_MAY_CONTACT.email);
    });

    test('should be editable', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.UPDATE} contact={TEST_RUBY_MAY_CONTACT} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Last Name'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Phone number'})).not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Email address'})).not.toHaveAttribute('readOnly');
    });
});

describe('More info form', () => {
    test('should render', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.VIEW} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/More info/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'First Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Email address'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(within(screen.getByTestId('contact-form-main-btns')).getByRole('button', {name: 'Close'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Save'})).not.toBeInTheDocument();
    });

    test('should initial show contact values', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.VIEW} contact={TEST_RUBY_MAY_CONTACT} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(TEST_RUBY_MAY_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(TEST_RUBY_MAY_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(TEST_RUBY_MAY_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(TEST_RUBY_MAY_CONTACT.email);
    });

    test('should not be editable', () => {
        render(<ContactForm show='true' contactFormType={ContactFormType.VIEW} contact={TEST_RUBY_MAY_CONTACT} />);

        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveAttribute('readOnly');
    });
});