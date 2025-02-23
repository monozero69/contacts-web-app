export const REST_API_ENDPOINT = 'http://localhost:8080/api/contacts';

export const HttpStatus = Object.freeze({
    OK: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
});

export const ActionResultType = Object.freeze({
    SUCCESS_ADD: 'success_add',
    SUCCESS_DELETE: 'success_delete',
    SUCCESS_UPDATE: 'success_update',
    FAIL: 'fail',
    isSuccess: (resultType) => resultType === ActionResultType.SUCCESS_ADD || resultType === ActionResultType.SUCCESS_DELETE  || resultType === ActionResultType.SUCCESS_UPDATE, 
});

export const ContactAction = Object.freeze({
    VIEW_MORE_INFO: 'view',
    UPDATE: 'update',
    DELETE: 'delete',
});

export const ContactFormType = Object.freeze({
    ADD: { title: 'Add Contact', iconClass: 'bi bi-person-fill-add'},
    VIEW: { title: 'More info', iconClass: 'bi bi-info-circle'},
    UPDATE: { title: 'Edit Contact', iconClass: 'bi bi-pencil'},
});

export const EMPTY_CONTACT = Object.freeze({
    id:null,
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    firstLineOfAddress: '',
    secondLineOfAddress: '',
    thirdLineOfAddress: '',
    city: '',
    county: '',
    postcode: '',
    country: ''
});