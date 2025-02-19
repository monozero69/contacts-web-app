import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { renderAndSetupUser } from "./test-helper";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";
import { REST_API_ENDPOINT } from "../src/constants";

describe('App', () => {
    test('should render',  async () => {
        render(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        expect(screen.getByText(/ContactsApp/i)).toBeInTheDocument();
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Contact/i })).toBeInTheDocument();
    });

    test('should show a success alert when the user successful adds a new contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), 'Ruby');
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), 'May');
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), '01274336699');
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findByRole('alert');

        expect(screen.getByRole('alert')).toHaveTextContent('Saved Ruby May contact details.');
    });

    test('should show a error alert when the user can not save a new contact', async () => {
        server.use(http.post(REST_API_ENDPOINT, () => new HttpResponse(null, { status: 500 })));
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), 'Ruby');
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), 'May');
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), '01274336699');
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findAllByRole('alert');

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    test('should allow the user to close the save result alert', async () => {
        server.use(http.post(REST_API_ENDPOINT, () => new HttpResponse(null, { status: 500 })));
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.click(screen.getByRole('button', {name: 'Save'}));
        await screen.findAllByRole('alert');
        expect(screen.queryByText(/Something went wrong/i)).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Close alert'}));

        expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
    });

    test('should display a new contact in the Contacts table when the user successful adds a new contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), 'Ruby');
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), 'June');
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), '01274224461');
        await user.type(screen.getByRole('textbox', {name: 'Email address'}), 'rubyjune@test.com');
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findByRole('table');

        expect(screen.getByRole('cell', {name: '301'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'Ruby'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'June'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: '01274224461'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'rubyjune@test.com'})).toBeInTheDocument();
    });

    test('should allow the user to cancel adding a new contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), 'Nobody');
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), 'LikesMe');
        await user.click(screen.getByRole('button', {name: 'Cancel'}));

        await screen.findAllByRole('table');

        expect(screen.queryByRole('cell', {name: 'Nobody'})).not.toBeInTheDocument();
        expect(screen.queryByRole('cell', {name: 'LikesMe'})).not.toBeInTheDocument();
        expect(screen.queryByText('Saved Nobody LikesMe contact details.')).not.toBeInTheDocument();
    });

    test('should show all contacts saved', async () => {
        render(<App />);

        await screen.findByRole('table');

        expect(screen.getByRole('row', {name: '200 Jack Tam 01274224466 jack.tam@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '201 Ben Rashford 01274335466 ben@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '203 Kate Longhorn 01274664466 klonghorn@test.com ...'})).toBeInTheDocument();
    });

    test('should show alert when fetching saved contacts fails', async () => {
        server.use(http.get(REST_API_ENDPOINT, () => new HttpResponse(null, { status: 500 })));
        render(<App />);

        await screen.findByRole('alert');

        expect(screen.getByText(/No saved contacts/i)).toBeInTheDocument();
    }); 
    
});