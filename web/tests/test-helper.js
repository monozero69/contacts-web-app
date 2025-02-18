import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderAndSetupUser = (jsx) => {
    return {
        user: userEvent.setup(),
        ...render(jsx), 
    };
};

export {
    renderAndSetupUser
};