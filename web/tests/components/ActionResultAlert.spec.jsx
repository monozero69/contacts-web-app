import { render, screen } from "@testing-library/react";
import ActionResultAlert from "../../src/components/ActionResultAlert";
import { expect, test } from "vitest";
import { ActionResultType } from "../../src/constants";

describe('ActionResultAlert', () => {
    test('should render', () => {
        render(<ActionResultAlert show={true}/>);

        const alert = screen.getByRole('alert');

        expect(alert).toBeInTheDocument();
    });

    test('should render generic error by default', () => {
        render(<ActionResultAlert show={true}/>);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent(/^Oops, something went wrong.$/);
    });

    test('should render success add with firstname only', () => {
        render(<ActionResultAlert show={true} firstname='Jack' resultType={ActionResultType.SUCCESS_ADD} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved Jack contact details.');
    });

    test('should render success add with firstname and lastname', () => {
        render(<ActionResultAlert show={true} firstname='Ruby' lastname='May' resultType={ActionResultType.SUCCESS_ADD} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved Ruby May contact details.');
    });

    test('should render success add without firstname and lastname', () => {
        render(<ActionResultAlert show={true} resultType={ActionResultType.SUCCESS_ADD} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Saved contact details.');
    });

    test('should render success delete with firstname only', () => {
        render(<ActionResultAlert show={true} firstname='Jack' resultType={ActionResultType.SUCCESS_DELETE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Deleted Jack contact details.');
    });

    test('should render success delete with firstname and lastname', () => {
        render(<ActionResultAlert show={true} firstname='Ruby' lastname='May' resultType={ActionResultType.SUCCESS_DELETE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Deleted Ruby May contact details.');
    });

    test('should render success delete without firstname and lastname', () => {
        render(<ActionResultAlert show={true} resultType={ActionResultType.SUCCESS_DELETE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Deleted contact details.');
    });

    test('should render success update with firstname only', () => {
        render(<ActionResultAlert show={true} firstname='Jack' resultType={ActionResultType.SUCCESS_UPDATE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Updated Jack contact details.');
    });

    test('should render success update with firstname and lastname', () => {
        render(<ActionResultAlert show={true} firstname='Ruby' lastname='May' resultType={ActionResultType.SUCCESS_UPDATE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Updated Ruby May contact details.');
    });

    test('should render success update without firstname and lastname', () => {
        render(<ActionResultAlert show={true} resultType={ActionResultType.SUCCESS_UPDATE} />);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('Updated contact details.');
    });

});