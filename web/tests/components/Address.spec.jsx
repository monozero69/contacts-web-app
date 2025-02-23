import { render, screen } from "@testing-library/react";
import Address from "../../src/components/Address";
import { renderAndSetupUser, TEST_RUBY_MAY_CONTACT } from "../test-helper";
import { ContactFormType, EMPTY_CONTACT } from "../../src/constants";

const handleChangeDoNothing = (e) => e;

describe('New Address', () => {
    test('should render with only Show Address button', () => {
        render(<Address handleChange={handleChangeDoNothing} contact={EMPTY_CONTACT} contactFormType={ContactFormType.ADD} />);

        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 3'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'City'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'County'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Postcode'})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: 'Country'})).not.toBeInTheDocument();
    });

    test('should display fields with empty values when Show Address button is clicked', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={EMPTY_CONTACT} contactFormType={ContactFormType.ADD} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('button', {name: 'Hide Address'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Show Address'})).not.toBeInTheDocument();

        expect(screen.getByRole('textbox', {name: 'Address line 1'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.firstLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 2'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.secondLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 3'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.thirdLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'City'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.city)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'County'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.county)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Postcode'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.postcode)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('combobox', {name: 'Country'}))
            .toBeInTheDocument()
            .toHaveValue(EMPTY_CONTACT.country)
            .not.toHaveAttribute('disabled');
    });

    test('should display correct options for Country field', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={EMPTY_CONTACT} contactFormType={ContactFormType.ADD} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('option', {name: /select/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'England'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Scotland'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Wales'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Northern Ireland'})).toBeInTheDocument();
    });
});

describe('Existing Address, which is editable', () => {
    test('should render with only Show Address button', () => {
        render(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.UPDATE} />);

        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 3'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'City'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'County'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Postcode'})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: 'Country'})).not.toBeInTheDocument();
    });

    test('should display fields with correct values when Show Address button is clicked', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.UPDATE} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('button', {name: 'Hide Address'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Show Address'})).not.toBeInTheDocument();

        expect(screen.getByRole('textbox', {name: 'Address line 1'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.firstLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 2'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.secondLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 3'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.thirdLineOfAddress)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'City'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.city)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'County'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.county)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Postcode'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.postcode)
            .not.toHaveAttribute('readOnly');
        expect(screen.getByRole('combobox', {name: 'Country'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.country)
            .not.toHaveAttribute('disabled');
    });

    test('should display correct options for Country field', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.UPDATE} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('option', {name: /select/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'England'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Scotland'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Wales'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Northern Ireland'})).toBeInTheDocument();
    });
});

describe('Existing Address, which is not editable', () => {
    test('should render with only Show Address button', () => {
        render(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.VIEW} />);

        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 3'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'City'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'County'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Postcode'})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: 'Country'})).not.toBeInTheDocument();
    });

    test('should display fields with correct values when Show Address button is clicked', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.VIEW} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('button', {name: 'Hide Address'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Show Address'})).not.toBeInTheDocument();

        expect(screen.getByRole('textbox', {name: 'Address line 1'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.firstLineOfAddress)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 2'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.secondLineOfAddress)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 3'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.thirdLineOfAddress)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'City'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.city)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'County'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.county)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Postcode'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.postcode)
            .toHaveAttribute('readOnly');
        expect(screen.getByRole('combobox', {name: 'Country'}))
            .toBeInTheDocument()
            .toHaveValue(TEST_RUBY_MAY_CONTACT.country)
            .toHaveAttribute('disabled');
    });

    test('should display correct options for Country field', async () => {
        const { user } = renderAndSetupUser(<Address handleChange={handleChangeDoNothing} contact={TEST_RUBY_MAY_CONTACT} contactFormType={ContactFormType.VIEW} />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('option', {name: /select/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'England'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Scotland'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Wales'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Northern Ireland'})).toBeInTheDocument();
    });
});