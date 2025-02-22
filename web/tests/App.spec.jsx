import { render, screen, within } from "@testing-library/react";
import App from "../src/App";
import { renderAndSetupUser, TEST_JACK_TAM_CONTACT, TEST_RUBY_MAY_CONTACT } from "./test-helper";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";
import { EMPTY_CONTACT, HttpStatus, REST_API_ENDPOINT } from "../src/constants";

const JACK_TAM_CONTACT_ACTIONS_BUTTON = 0;
const BEN_RASHFORD_CONTACT_ACTIONS_BUTTON = 1;
const KATE_LONGHORN_CONTACT_ACTIONS_BUTTON = 2;

describe('App', () => {
    test('should render',  async () => {
        render(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        expect(screen.getByText(/ContactsApp/i)).toBeInTheDocument();
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Contact/i })).toBeInTheDocument();
    });

    test('should allow the user to close the action result alert', async () => {
        server.use(http.post(REST_API_ENDPOINT, () => new HttpResponse(null, { status: HttpStatus.INTERNAL_SERVER_ERROR })));
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.click(screen.getByRole('button', {name: 'Save'}));
        await screen.findAllByRole('alert');
        expect(screen.queryByText(/Something went wrong/i)).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Close alert'}));

        expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
    });
});

describe('App add contact functionality', () => {
    test('should show a success alert when the user successful adds a new contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), TEST_RUBY_MAY_CONTACT.firstname);
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), TEST_RUBY_MAY_CONTACT.lastname);
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), TEST_RUBY_MAY_CONTACT.phonenumber);
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findByRole('alert');

        expect(screen.getByRole('alert')).toHaveTextContent('Saved Ruby May contact details.');
    });

    test('should show a error alert when the user can not save a new contact', async () => {
        server.use(http.post(REST_API_ENDPOINT, () => new HttpResponse(null, { status: HttpStatus.INTERNAL_SERVER_ERROR })));
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), TEST_RUBY_MAY_CONTACT.firstname);
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), TEST_RUBY_MAY_CONTACT.lastname);
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), TEST_RUBY_MAY_CONTACT.phonenumber);
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findAllByRole('alert');

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    test('should display a new contact in the Contacts table when the user successful adds a new contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findAllByRole('button', { name: /Add Contact/i });

        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), TEST_RUBY_MAY_CONTACT.firstname);
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), TEST_RUBY_MAY_CONTACT.lastname);
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), TEST_RUBY_MAY_CONTACT.phonenumber);
        await user.type(screen.getByRole('textbox', {name: 'Email address'}), TEST_RUBY_MAY_CONTACT.email);
        await user.click(screen.getByRole('button', {name: 'Save'}));

        await screen.findByRole('table');

        expect(screen.getByRole('cell', {name: '301'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: TEST_RUBY_MAY_CONTACT.firstname})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: TEST_RUBY_MAY_CONTACT.lastname})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: TEST_RUBY_MAY_CONTACT.phonenumber})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: TEST_RUBY_MAY_CONTACT.email})).toBeInTheDocument();
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

    test('should always start with empty values in the Add Contact form and never the previous saved contact values', async () => {
        // arrange
        const { user } = renderAndSetupUser(<App />);
        await screen.findAllByRole('button', { name: /Add Contact/i });
        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), TEST_RUBY_MAY_CONTACT.firstname);
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), TEST_RUBY_MAY_CONTACT.lastname);
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), TEST_RUBY_MAY_CONTACT.phonenumber);
        await user.click(screen.getByRole('button', {name: 'Save'}));
        await screen.findByRole('alert');
        expect(screen.getByRole('alert')).toHaveTextContent('Saved Ruby May contact details.');

        // act
        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await screen.findByRole('textbox', {name: 'First Name'});

        // assert
        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(EMPTY_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(EMPTY_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(EMPTY_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(EMPTY_CONTACT.email);
    });

    test('should always start with empty values in the Add Contact form and never the previous canceled form entered values', async () => {
        // arrange
        const { user } = renderAndSetupUser(<App />);
        await screen.findAllByRole('button', { name: /Add Contact/i });
        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await user.type(screen.getByRole('textbox', {name: 'First Name'}), TEST_RUBY_MAY_CONTACT.firstname);
        await user.type(screen.getByRole('textbox', {name: 'Last Name'}), TEST_RUBY_MAY_CONTACT.lastname);
        await user.type(screen.getByRole('textbox', {name: 'Phone number'}), TEST_RUBY_MAY_CONTACT.phonenumber);
        await user.click(screen.getByRole('button', {name: 'Cancel'}));
        await screen.findByRole('table');

        // act
        await user.click(screen.getByRole('button', { name: /Add Contact/i }));
        await screen.findByRole('textbox', {name: 'First Name'});

        // assert
        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(EMPTY_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(EMPTY_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(EMPTY_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(EMPTY_CONTACT.email);
    });
});

describe('App load contacts functionality', () => {
    test('should show all contacts saved', async () => {
        render(<App />);

        await screen.findByRole('table');

        expect(screen.getByRole('row', {name: '200 Jack Tam 01274224466 jack.tam@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '201 Ben Rashford 01274335466 ben@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '203 Kate Longhorn 01274664466 klonghorn@test.com ...'})).toBeInTheDocument();
    });

    test('should show alert when fetching saved contacts fails', async () => {
        server.use(http.get(REST_API_ENDPOINT, () => new HttpResponse(null, { status: HttpStatus.INTERNAL_SERVER_ERROR })));
        render(<App />);

        await screen.findByRole('alert');

        expect(screen.getByText(/No saved contacts/i)).toBeInTheDocument();
    });
});

describe('App remove contact functionality', () => {
    test('should allow the user to delete a contact', async () => {
        const { user } = renderAndSetupUser(<App />);

        await screen.findByRole('table');

        const contactActionsButtons = screen.getAllByRole('button', {name: '...'});
        expect(contactActionsButtons.length).toBe(3);

        await user.click(contactActionsButtons[BEN_RASHFORD_CONTACT_ACTIONS_BUTTON]);

        const deleteContactAction = await screen.findByText('Remove');
        expect(deleteContactAction).toBeVisible();

        await user.click(deleteContactAction);

        const alert = await screen.findByRole('alert');

        expect(alert).toHaveTextContent('Deleted Ben Rashford contact details.');
        expect(screen.queryByRole('row', {name: '201 Ben Rashford 01274335466 ben@test.com ...'})).not.toBeInTheDocument();
        expect(screen.getAllByRole('button', {name: '...'}).length).toBe(2);
    });
    
    test('should not delete a contact in the UI when the API does not respond with HTTP Status OK', async () => {
        server.use(http.delete(REST_API_ENDPOINT.concat('/', '203'), () => new HttpResponse(null, { status: HttpStatus.INTERNAL_SERVER_ERROR })));
        const { user } = renderAndSetupUser(<App />);

        await screen.findByRole('table');

        const contactActionsButtons = screen.getAllByRole('button', {name: '...'});
        expect(contactActionsButtons.length).toBe(3);

        await user.click(contactActionsButtons[KATE_LONGHORN_CONTACT_ACTIONS_BUTTON]); // try to delete Kate Longhorn contact

        const deleteContactAction = await screen.findByText('Remove');
        expect(deleteContactAction).toBeVisible();

        await user.click(deleteContactAction);

        const alert = await screen.findByRole('alert');

        expect(alert).toHaveTextContent(/Something went wrong/i);
        expect(screen.getByRole('row', {name: '200 Jack Tam 01274224466 jack.tam@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '201 Ben Rashford 01274335466 ben@test.com ...'})).toBeInTheDocument();
        expect(screen.getByRole('row', {name: '203 Kate Longhorn 01274664466 klonghorn@test.com ...'})).toBeInTheDocument();
        expect(screen.getAllByRole('button', {name: '...'}).length).toBe(3);
    });
});

describe.skip('App edit contact functionality', () => {

});

describe('App contact more info functionality', () => {
    test('should show all contact details for selected contact', async () => {
        // arrange
        const { user } = renderAndSetupUser(<App />);
        await screen.findByRole('table');

        // act
        const contactActionsButtons = screen.getAllByRole('button', {name: '...'});
        await user.click(contactActionsButtons[JACK_TAM_CONTACT_ACTIONS_BUTTON]);
        const moreInfoContactAction = await screen.findByText('More info');
        expect(moreInfoContactAction).toBeVisible();
        await user.click(moreInfoContactAction);
        const dialog = await screen.findByRole('dialog');
        await user.click(screen.getByRole('button', {name: 'Show Address'}));
        await screen.findByRole('textbox', {name: 'Address line 1'});

        // assert
        expect(within(dialog).getByText(/More info/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveValue(TEST_JACK_TAM_CONTACT.firstname);
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveValue(TEST_JACK_TAM_CONTACT.lastname);
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveValue(TEST_JACK_TAM_CONTACT.phonenumber);
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveValue(TEST_JACK_TAM_CONTACT.email);
        expect(screen.getByRole('textbox', {name: 'Address line 1'})).toHaveValue(TEST_JACK_TAM_CONTACT.firstLineOfAddress);
        expect(screen.getByRole('textbox', {name: 'Address line 2'})).toHaveValue(TEST_JACK_TAM_CONTACT.secondLineOfAddress);
        expect(screen.getByRole('textbox', {name: 'Address line 3'})).toHaveValue(TEST_JACK_TAM_CONTACT.thirdLineOfAddress);
        expect(screen.getByRole('textbox', {name: 'City'})).toHaveValue(TEST_JACK_TAM_CONTACT.city);
        expect(screen.getByRole('textbox', {name: 'County'})).toHaveValue(TEST_JACK_TAM_CONTACT.county);
        expect(screen.getByRole('textbox', {name: 'Postcode'})).toHaveValue(TEST_JACK_TAM_CONTACT.postcode);
        expect(screen.getByRole('combobox', {name: 'Country'})).toHaveValue(TEST_JACK_TAM_CONTACT.country);
    });

    test('should show contact details for selected contact but not allow the user to change it', async () => {
        // arrange
        const { user } = renderAndSetupUser(<App />);
        await screen.findByRole('table');

        // act
        const contactActionsButtons = screen.getAllByRole('button', {name: '...'});
        await user.click(contactActionsButtons[JACK_TAM_CONTACT_ACTIONS_BUTTON]);
        const moreInfoContactAction = await screen.findByText('More info');
        expect(moreInfoContactAction).toBeVisible();
        await user.click(moreInfoContactAction);
        const dialog = await screen.findByRole('dialog');
        await user.click(screen.getByRole('button', {name: 'Show Address'}));
        await screen.findByRole('textbox', {name: 'Address line 1'});

        // assert
        expect(within(dialog).getByText(/More info/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'First Name'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Last Name'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Phone number'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Email address'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 1'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 2'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Address line 3'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'City'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'County'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('textbox', {name: 'Postcode'})).toHaveAttribute('readOnly');
        expect(screen.getByRole('combobox', {name: 'Country'})).toHaveAttribute('disabled');
    });

    test('should allow the user to close the form when they have it open', async () => {
        // arrange
        const { user } = renderAndSetupUser(<App />);
        await screen.findByRole('table');

        // act
        const contactActionsButtons = screen.getAllByRole('button', {name: '...'});
        await user.click(contactActionsButtons[JACK_TAM_CONTACT_ACTIONS_BUTTON]);
        const moreInfoContactAction = await screen.findByText('More info');
        expect(moreInfoContactAction).toBeVisible();
        await user.click(moreInfoContactAction);
        await screen.findByRole('dialog');
        await user.click(within(screen.getByTestId('contact-form-main-btns')).getByRole('button', {name: 'Close'}));
        await screen.findByRole('table');

        // assert
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

});