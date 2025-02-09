import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe('App', () => {
    test('should render', () => {
        render(<App />);
        expect(screen.getByText(/Vite and React/)).toBeInTheDocument();
    });
});