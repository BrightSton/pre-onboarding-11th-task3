// cache 데이터의 생성 시간을 비교해 주는 로직

const CACHE_EXPIRATION_TIME = 15 * 60 * 1000; // 캐시 만료 시간 (밀리초 단위)

export const isCacheExpired = (cacheData) => {
  return Date.now() - cacheData.timestamp > CACHE_EXPIRATION_TIME;
};
