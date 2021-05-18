import React from "react"
import { render, screen, waitFor } from '@testing-library/react';
import Display from "../Display";
import fetchShow from "../../api/fetchShow";
import userEvent from "@testing-library/user-event";
jest.mock("../../api/fetchShow");

const testShow = {
    //add in approprate test data structure here.
    name:"Strange Things",
    image:"./stranger_things.png",
    summary:"It was pretty awsome",
    seasons:[
        {
            id:0,
            season:1, 
            episodes:[]
        },
        {
            id:1,
            season:2,
            episodes:[]
        },
        {
            id:2,
            season:3,
            episodes:[]
        }
    ]
}

test("renders without error", () => {
    render(<Display/>);
});

test("When the fetch button is pressed, the show component will display." , async ()=>{
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByText("Press to Get Show Data");
    userEvent.click(button);

    const show = await screen.findByTestId("show-container");
    expect(show).toBeTruthy(); 
    expect(show).toBeInTheDocument();
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data." , async ()=>{
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByText("Press to Get Show Data");
    userEvent.click(button);

    // await waitFor(()=>{
    //     const numberOfOptions = screen.queryAllByTestId("season-option");
    //     expect(numberOfOptions).toHaveLength(testShow.seasons.length);

    // await waitFor() takes in an callback function that will run when everything finish loading
    // })

    // await makes the code to wait

    const numberOfOptions = await screen.findAllByTestId("season-option");
    expect(numberOfOptions).toHaveLength(testShow.seasons.length);

});

test("when the fetch button is pressed, this function is called.", async ()=>{

    const fakeFunction = jest.fn();

    render(<Display displayFunc={fakeFunction}/>);

    fetchShow.mockResolvedValueOnce(testShow);

    
    const button = screen.getByText("Press to Get Show Data");
    userEvent.click(button);

    await waitFor(()=>{
        expect(fakeFunction).toBeCalledTimes(1);
    })
    
    
    

})
///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.