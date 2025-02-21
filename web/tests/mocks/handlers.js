import { http, HttpResponse } from 'msw';
import { HttpStatus, REST_API_ENDPOINT } from '../../src/constants';

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
        return HttpResponse.json([
                {id: 200, firstname: 'Jack', lastname: 'Tam', phonenumber: '01274224466', email: 'jack.tam@test.com'},
                {id: 201, firstname: 'Ben', lastname: 'Rashford', phonenumber: '01274335466', email: 'ben@test.com'},
                {id: 203, firstname: 'Kate', lastname: 'Longhorn', phonenumber: '01274664466', email: 'klonghorn@test.com'},
            ], 
            { 
                status: HttpStatus.OK,
            }
        );
    }),
    http.delete(REST_API_ENDPOINT.concat('/', 201), () => new HttpResponse(null, { status: HttpStatus.OK })),
];