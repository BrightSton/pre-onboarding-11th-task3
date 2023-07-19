import { useCallback, useState } from "react";
import { isCacheExpired } from "../../utils/isCacheExpired";
import { getSearchData } from "../apis";
import { trimCache } from "../../utils/trimCache";

const useFetchSuggestions = () => {
  const [cache, setCache] = useState({});

  const fetchSuggestions = useCallback(
    async (input) => {
      if (cache[input] && !isCacheExpired(cache[input])) {
        return cache[input].data;
      } else {
        const response = await getSearchData(input);
        const timestamp = Date.now();
        const newCache = {
          ...cache,
          [input]: { data: response, timestamp },
        };
        // 캐시 크기가 최대 크기를 초과하는 경우 캐시를 조정합니다.
        setCache(trimCache(newCache));
        return response;
      }
    },
    [cache, setCache]
  );

  return fetchSuggestions;
};

export default useFetchSuggestions;
