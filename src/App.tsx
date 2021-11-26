import List from "./components/List";
import "./App.css";
import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  ChangeEvent,
  useRef,
} from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import axios from "axios";
import SearchForm from "./components/SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
        isLoading: false,
        isError: false,
      };
    case "STORIES_FETCH_FAILURE":
      return { ...state, data: [], isLoading: false, isError: true };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (i: any) => action.payload.objectID !== i.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const getNumberOfComments = (stories: any) => {
  return stories.reduce((sum: any, item: any) => sum + item.num_comments, 0);
};

function App() {
  const [searchTerm, setSearchTerm] = usePersistenceState(
    "customSearchTerm",
    "react"
  );

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false,
  });

  const loader = useRef(null);

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [trigger, setTrigger] = useState(false);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const response: any = await axios.get(url);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: { list: response.data.hits, page: response.data.page },
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    setUrl(`${API_ENDPOINT}${searchTerm}&page=${stories.page + 1}`);
  }, [trigger]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setTrigger((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}&page=0`);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onHandleDeleteItem = useCallback((item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });

  const numberOfcomments = useMemo(
    () => getNumberOfComments(stories.data),
    [stories]
  );

  return (
    <div className="container">
      <div className="card">
        <h1 className="headline-primary">
          Posts with {numberOfcomments} comments
        </h1>

        <SearchForm
          searchTerm={searchTerm}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
        {stories.page === 0 ? (
          stories.isLoading ? (
            <p>Loading...</p>
          ) : (
            <List
              stories={stories.data}
              handleDeleteItem={onHandleDeleteItem}
            />
          )
        ) : (
          <>
            <List
              stories={stories.data}
              handleDeleteItem={onHandleDeleteItem}
            />
            {stories.isLoading && <p>Loading...</p>}
          </>
        )}

        <div ref={loader} />

        {stories.isError && <p>Something went wrong..</p>}
      </div>
    </div>
  );
}
export default App;

export { storiesReducer, SearchForm, List };
