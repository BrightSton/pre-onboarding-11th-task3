import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../common/hooks/useDebounce";
import useFetchSuggestions from "../common/hooks/useFetchSuggestions";

function SearchBox() {
  const [searchInput, setSearchInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const debounceValue = useDebounce(searchInput, setWaiting, 500);
  const fetchSuggestions = useFetchSuggestions();

  const handleSearchInputChange = useCallback((event) => {
    const input = event.target.value;
    setSearchInput(input);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchQuery = searchInput;
    console.log("검색어:", searchQuery);
    setSearchInput("");
    clearSuggestions();
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (debounceValue.trim() !== "") {
      fetchSuggestions(debounceValue)
        .then((suggestions) => {
          setSuggestions(suggestions);
          console.info("API 호출 중");
        })
        .catch((error) => {
          console.log("검색어 추천을 가져오는 중 오류 발생:", error);
        });
    } else {
      clearSuggestions();
    }
  }, [debounceValue, fetchSuggestions]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          placeholder="질환명을 입력해 주세요."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">검색</button>
        <ul>
          {searchInput ? (
            waiting ? (
              <p>검색 중 ...</p>
            ) : suggestions.length ? (
              suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Link to={`/`}>{suggestion.sickNm}</Link>
                </li>
              ))
            ) : (
              <p>추천 검색어가 없습니다.</p>
            )
          ) : (
            <p>최근 검색어</p>
          )}
        </ul>
      </form>
    </>
  );
}

export default SearchBox;
