import { render, screen } from "@testing-library/react";
import Address from "../../src/components/Address";
import { renderAndSetupUser } from "../test-helper";

describe('Address', () => {
    test('should render with only Show Address button', () => {
        render(<Address />);

        expect(screen.getByRole('button', {name: 'Show Address'})).toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Address line 3'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'City'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'County'})).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', {name: 'Postcode'})).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', {name: 'Country'})).not.toBeInTheDocument();
    });

    test('should display fields when Show Address button is clicked', async () => {
        const { user } = renderAndSetupUser(<Address />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('button', {name: 'Hide Address'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Show Address'})).not.toBeInTheDocument();

        expect(screen.getByRole('textbox', {name: 'Address line 1'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Address line 2'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Address line 3'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'City'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'County'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'Postcode'})).toBeInTheDocument();
        expect(screen.getByRole('combobox', {name: 'Country'})).toBeInTheDocument();
    });

    test('should display correct options for Country field', async () => {
        const { user } = renderAndSetupUser(<Address />);

        await user.click(screen.getByRole('button', {name: 'Show Address'}));

        expect(screen.getByRole('option', {name: /select/i})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'England'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Scotland'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Wales'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Northern Ireland'})).toBeInTheDocument();
    });
});
