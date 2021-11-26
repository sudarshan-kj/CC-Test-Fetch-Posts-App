import App, { storiesReducer, List, SearchForm } from "./App";
import InputWithLabel from "./components/InputWithLabel";
import { Item } from "./components/List";
import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";

//  1:
// describe("dummy suite", () => {
//   test("true to be true", () => {
//     expect(true).toBe(true);
//   });
//   test("false to be false", () => {
//     expect(false).toBe(false);
//   });
// });

// test("true to be true", () => {
//   expect(true).toBe(true);
// });
// test("false to be false", () => {
//   expect(false).toBe(false);
// });

//Large subjects like functions or components often require multiple test cases, so it makes sense to
//use them with test suites:
// describe("App component", () => {
//   test("removes an item when clicking the Dismiss button", () => {});
//   test("requests some initial stories from an API", () => {});
// });

//“test” block can also be written as an “it” block
// describe("something truthy and falsy", () => {
//   it("true to be true", () => {
//     expect(true).toBe(true);
//   });
//   it("false to be false", () => {
//     expect(false).toBe(false);
//   });
// });

// failing a test
// describe("something truthy and falsy", () => {
//   test("true to be true", () => {
//     expect(true).toBe(true);
//   });
//   test("false to be false", () => {
//     expect(false).toBe(true);
//   });
// });

//Unit Testing: Functions
//Let's start with testing basic functions
// Let us define some test data

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Tommy Hill",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};
const stories = [storyOne, storyTwo];

// describe("storiesReducer", () => {
//   test("removes a story from all stories", () => {});
// });

//Note: This test will fail. Why?
// describe("storiesReducer", () => {
//   test("removes a story from all stories", () => {
//     const action = { type: "REMOVE_STORY", payload: storyOne };
//     const state = { data: stories, isLoading: false, isError: false };
//     const newState = storiesReducer(state, action);
//     const expectedState = {
//       data: [storyTwo],
//       isLoading: false,
//       isError: false,
//     };
//     expect(newState).toStrictEqual(expectedState);
//   });
// });

//Unit Testing: Components

// describe("Item", () => {
//   test("renders all properties", () => {
//     render(<Item item={storyOne} />);
//   });
// });

//We can use debug to see the rendered output

// describe("Item", () => {
//   test("renders all properties", () => {
//     render(<Item item={storyOne} />);
//     screen.debug();
//   });
// });

// describe("Item", () => {
//   test("renders all properties", () => {
//     render(<Item item={storyOne} />);
//     expect(screen.getByText("Tommy Hill")).toBeInTheDocument();
//     expect(screen.getByText("React")).toHaveAttribute(
//       "href",
//       "https://reactjs.org/"
//     );
//   });
// });

// describe("Item", () => {
//   test("renders all properties", () => {
//     render(<Item item={storyOne} />);
//     expect(screen.getByText("Tommy Hill")).toBeInTheDocument();
//     expect(screen.getByText("React")).toHaveAttribute(
//       "href",
//       "https://reactjs.org/"
//     );
//   });
//   test("renders a clickable delete button", () => {
//     render(<Item item={storyOne} />);
//     expect(screen.getByRole("button")).toBeInTheDocument();
//   });
// });

// describe("Item", () => {
//   test("renders all properties", () => {
//     render(<Item item={storyOne} />);
//     expect(screen.getByText("Tommy Hill")).toBeInTheDocument();
//     expect(screen.getByText("React")).toHaveAttribute(
//       "href",
//       "https://reactjs.org/"
//     );
//   });
//   test("renders a clickable dismiss button", () => {
//     render(<Item item={storyOne} />);
//     expect(screen.getByRole("button")).toBeInTheDocument();
//   });

//   test("clicking the dismiss button calls the callback handler", () => {
//     const handleRemoveItem = jest.fn();
//     render(<Item item={storyOne} handleDeleteItem={handleRemoveItem} />);
//     fireEvent.click(screen.getByRole("button"));
//     expect(handleRemoveItem).toHaveBeenCalledTimes(1);
//   });
// });

//Testing the searchFrom

// describe("SearchForm", () => {
//   const searchFormProps = {
//     searchTerm: "React",
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };
//   test("renders the input field with its value", () => {
//     render(<SearchForm {...searchFormProps} />);
//     screen.debug();
//   });
// });

// describe("SearchForm", () => {
//   const searchFormProps = {
//     searchTerm: "React",
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };
//   test("renders the input field with its value", () => {
//     render(<SearchForm {...searchFormProps} />);
//     expect(screen.getByDisplayValue("React")).toBeInTheDocument();
//   });
// });

//This will fail since we don't have label yet
// describe("SearchForm", () => {
//   const searchFormProps = {
//     searchTerm: "React",
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };
//   test("renders the input field with its value", () => {
//     render(<SearchForm {...searchFormProps} />);
//     expect(screen.getByDisplayValue("React")).toBeInTheDocument();
//   });

//   test("renders the correct label", () => {
//     render(<SearchForm {...searchFormProps} />);
//     expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
//   });
// });

// describe("SearchForm", () => {
//   const searchFormProps = {
//     searchTerm: "React",
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };
//   test("renders the input field with its value", () => {
//     render(<SearchForm {...searchFormProps} />);
//     expect(screen.getByDisplayValue("React")).toBeInTheDocument();
//   });

//   test("calls onSearchInput on input field change", () => {
//     render(<SearchForm {...searchFormProps} />);
//     fireEvent.change(screen.getByDisplayValue("React"), {
//       target: { value: "Redux" },
//     });
//     expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
//   });
//   test("calls onSearchSubmit on button submit click", () => {
//     render(<SearchForm {...searchFormProps} />);
//     fireEvent.submit(screen.getByRole("button"));
//     expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
//   });
// });

//Integration Testing: Component

jest.mock("axios");

// describe("App", () => {
//   test("succeeds fetching data", () => {
//     const promise = Promise.resolve({
//       data: {
//         hits: stories,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     screen.debug();
//   });
// });

// describe("App", () => {
//   test("succeeds fetching data", async () => {
//     const promise = Promise.resolve({
//       data: {
//         hits: stories,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     screen.debug();
//     await act(() => promise);
//     screen.debug();
//   });
// });

// describe("App", () => {
//   test("succeeds fetching data", async () => {
//     const promise = Promise.resolve({
//       data: {
//         hits: stories,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     expect(screen.queryByText(/Loading/)).toBeInTheDocument();
//     await act(() => promise);
//     expect(screen.queryByText(/Loading/)).toBeNull();
//   });
// });

// describe("App", () => {
//   test("succeeds fetching data", async () => {
//     const promise = Promise.resolve({
//       data: {
//         hits: stories,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     expect(screen.queryByText(/Loading/)).toBeInTheDocument();
//     await act(() => promise);
//     expect(screen.queryByText(/Loading/)).toBeNull();
//     expect(screen.getByText("React")).toBeInTheDocument();
//     expect(screen.getByText("Redux")).toBeInTheDocument();
//     expect(screen.getAllByText("Delete").length).toBe(2);
//   });
// });

// describe("App", () => {
//   test("fails fetching data", async () => {
//     const promise = Promise.reject();
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     expect(screen.getByText(/Loading/)).toBeInTheDocument();
//     try {
//       await act(() => promise);
//     } catch (error) {
//       expect(screen.queryByText(/Loading/)).toBeNull();
//       expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
//     }
//   });
//   test("removes a story", async () => {
//     const promise = Promise.resolve({
//       data: {
//         hits: stories,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);
//     render(<App />);
//     await act(() => promise);
//     expect(screen.getAllByText("Delete").length).toBe(2);
//     expect(screen.getByText("Tommy Hill")).toBeInTheDocument();
//     fireEvent.click(screen.getAllByText("Delete")[0]);
//     expect(screen.getAllByText("Delete").length).toBe(1);
//     expect(screen.queryByText("Tommy Hill")).toBeNull();
//   });
// });

//Snapshot Testing:

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };
  test("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);
    screen.debug();
  });

  test("renders snapshot", () => {
    const { container } = render(<SearchForm {...searchFormProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
