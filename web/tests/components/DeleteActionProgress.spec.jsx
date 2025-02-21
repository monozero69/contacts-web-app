import { render, screen } from "@testing-library/react";
import DeleteActionProgress from "../../src/components/DeleteActionProgress";

describe('DeleteActionProgress', () => {
    test('should render and show by default', () => {
        render(<DeleteActionProgress />);

        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByRole('status')).toBeVisible();
        expect(screen.getByText('Delete in progress ...')).toBeVisible();
    });

    test('should be hideable when required', () => {
        render(<DeleteActionProgress show={false} />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});