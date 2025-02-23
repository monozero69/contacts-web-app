import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderAndSetupUser = (jsx) => {
    return {
        user: userEvent.setup(),
        ...render(jsx), 
    };
};

const TEST_RUBY_MAY_CONTACT = Object.freeze({
                                    id:301,
                                    firstname:"Ruby",
                                    lastname:"May",
                                    phonenumber:"01274669922",
                                    email:"ruby.may@test.com",
                                    firstLineOfAddress:"23 Bishop Gates",
                                    secondLineOfAddress:"Long Drive",
                                    thirdLineOfAddress:"third line of address",
                                    city:"Bradford",
                                    county:"West Yorkshire",
                                    postcode:"BD9 3WE",
                                    country:"England"
                                });

const TEST_JACK_TAM_CONTACT = Object.freeze({
                                    id:200,
                                    firstname:"Jack",
                                    lastname:"Tam",
                                    phonenumber:"01274224466",
                                    email:"jack.tam@test.com",
                                    firstLineOfAddress:"78 Rovers Road",
                                    secondLineOfAddress:"secondLineOfAddress",
                                    thirdLineOfAddress:"thirdLineOfAddress",
                                    city:"Perth",
                                    county:"Perthshire",
                                    postcode:"PH1 2RT",
                                    country:"Scotland"
                                });

const TEST_BEN_RASHFORD_CONTACT = Object.freeze({
                                        id:201,
                                        firstname:"Ben",
                                        lastname:"Rashford",
                                        phonenumber:"01274335466",
                                        email:"ben@test.com",
                                        firstLineOfAddress: null,
                                        secondLineOfAddress: null,
                                        thirdLineOfAddress: null,
                                        city: null,
                                        county: null,
                                        postcode: null,
                                        country: null
                                    });

const TEST_KATE_LONGHORN_CONTACT = Object.freeze({
                                        id:203,
                                        firstname:"Kate",
                                        lastname:"Longhorn",
                                        phonenumber:"01274664466",
                                        email:"klonghorn@test.com",
                                        firstLineOfAddress: null,
                                        secondLineOfAddress: null,
                                        thirdLineOfAddress: null,
                                        city: null,
                                        county: null,
                                        postcode: null,
                                        country: null
                                    });

export {
    renderAndSetupUser,
    TEST_RUBY_MAY_CONTACT,
    TEST_JACK_TAM_CONTACT,
    TEST_BEN_RASHFORD_CONTACT,
    TEST_KATE_LONGHORN_CONTACT,
};