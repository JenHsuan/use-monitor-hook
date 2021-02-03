import { shallow } from 'enzyme';
import React from "react";
import ReactDOM from "react-dom";
import Tester from './index';
import "@testing-library/jest-dom";
//import { render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

test('非同步執行 callback 回傳 hi', async(done) => {
    let container = document.createElement("div");
    act(() => {
        ReactDOM.render(
            <Tester urls = {['http://rem-rest-api.herokuapp.com/api/users']}
                freshRate ={3000}/>, container);
        //jest.advanceTimersByTime(3000);
        expect(container.textContent).toBe("1");
    });
    await sleep(5000);
    expect(container.textContent).toBe("url1");
});
