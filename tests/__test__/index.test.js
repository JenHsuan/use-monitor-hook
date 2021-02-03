import React from "react";
import ReactDOM from "react-dom";
import Tester from './index';
import "@testing-library/jest-dom";
import { act } from 'react-dom/test-utils';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

test('Test use-react-monitor with the time changing', async(done) => {
    let container = document.createElement("div");
    await act(async () => {
        ReactDOM.render(
            <Tester urls = {['http://rem-rest-api.herokuapp.com/api/users']}
                freshRate ={3000}/>, container);

        expect(container.textContent).toBe("11");
        await sleep(5000);
        expect(container.textContent).toBe("33");
        done();
    });
});
