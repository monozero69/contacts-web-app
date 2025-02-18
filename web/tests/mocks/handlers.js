import { http, HttpResponse } from 'msw';
import { REST_API_ENDPOINT } from '../../src/constants';

export const handlers = [
    http.post(REST_API_ENDPOINT, async ({ request }) => {
        const newContact = await request.json();
        return HttpResponse.json({
                ...newContact,
                id: 301,
            }, 
            { 
                status: 201,
            }
        );
    }),
];