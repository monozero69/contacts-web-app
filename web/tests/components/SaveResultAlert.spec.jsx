import { render, screen } from "@testing-library/react";
import SaveResultAlert from "../../src/components/SaveResultAlert";
import { expect, test } from "vitest";

describe('SaveResultAlert', () => {
    test('should render', () => {
        render(<SaveResultAlert show={true}/>);

        const alert = screen.getByRole('alert');

        expect(alert).toBeInTheDocument();
    });

    test('should render error', () => {
        render(<SaveResultAlert show={true}/>);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent(/Something went wrong/i);
    });

    test('should render success with firstname only', () => {
        render(<SaveResultAlert show={true} firstname='Jack' resultType='success' />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved Jack contact details.');
    });

    test('should render success with firstname and lastname', () => {
        render(<SaveResultAlert show={true} firstname='Ruby' lastname='May' resultType='success' />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved Ruby May contact details.');
    });

    test('should render success without firstname and lastname', () => {
        render(<SaveResultAlert show={true} resultType='success' />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved contact details.');
    });

});