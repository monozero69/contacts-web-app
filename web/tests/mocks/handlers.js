import { http, HttpResponse } from 'msw';
import { HttpStatus, REST_API_ENDPOINT } from '../../src/constants';
import { TEST_BEN_RASHFORD_CONTACT, TEST_JACK_TAM_CONTACT, TEST_KATE_LONGHORN_CONTACT } from '../test-helper';

export const handlers = [
    http.post(REST_API_ENDPOINT, async ({ request }) => {
        const newContact = await request.json();
        return HttpResponse.json({
                ...newContact,
                id: 301,
            }, 
            { 
                status: HttpStatus.CREATED,
            }
        );
    }),
    http.get(REST_API_ENDPOINT, async () => {
        return HttpResponse.json([TEST_JACK_TAM_CONTACT, TEST_BEN_RASHFORD_CONTACT, TEST_KATE_LONGHORN_CONTACT,], { status: HttpStatus.OK, });
    }),
    http.delete(REST_API_ENDPOINT.concat('/', 201), () => new HttpResponse(null, { status: HttpStatus.OK })),
    http.put(REST_API_ENDPOINT, async ({ request }) => {
        const existingContact = await request.json();
        return HttpResponse.json({ ...existingContact, }, { status: HttpStatus.OK, });
    }),
];