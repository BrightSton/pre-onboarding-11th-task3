// cache 데이터의 사이즈가 특정 사이즈를 넘어서면
// 처음 넣은 데이터를 없애고
// 새로운 데이터를 기입하는 로직

const MAX_CACHE_SIZE = 100; // 최대 캐시 크기

export const trimCache = (cacheData) => {
  const cacheKeys = Object.keys(cacheData);
  if (cacheKeys.length > MAX_CACHE_SIZE) {
    const oldestKey = cacheKeys.reduce((prevKey, currentKey) =>
      cacheData[prevKey].timestamp < cacheData[currentKey].timestamp
        ? prevKey
        : currentKey
    );
    const { [oldestKey]: removedItem, ...trimmedCache } = cacheData;
    return trimmedCache;
  }
  return cacheData;
};
