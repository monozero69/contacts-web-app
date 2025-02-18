import { render, screen } from "@testing-library/react";
import Contacts from "../../src/components/Contacts";
import { expect, test } from "vitest";

describe('Contacts', () => {
    test('should render alert when it has zero contacts', () => {
        render(<Contacts contacts={[]}/>);

        const alert = screen.getByRole('alert');

        expect(alert).toHaveTextContent('No saved contacts');
    });

    test('should render table with correct headings when it has contacts', () => {
        render(<Contacts contacts={[{id: 1}]}/>);
        
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: '#'})).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: 'First Name'})).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: 'Last Name'})).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: 'Phone'})).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: 'Email'})).toBeInTheDocument();
        expect(screen.getByRole('columnheader', {name: ''})).toBeInTheDocument();
    });

    test('should render table with correct cell content when it has contacts', () => {
        render(<Contacts contacts={[{id: 1, firstname: 'Ruby', lastname: 'May', phonenumber: '01535663322', email: 'rubymay@test.com'}]}/>);
        
        expect(screen.getByRole('cell', {name: '1'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'Ruby'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'May'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: '01535663322'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'rubymay@test.com'})).toBeInTheDocument();
    });
});