import persist from "node-persist";

export const sessionCache = persist.create({
  dir: 'persist-session/',
  ttl: 1740000,  // 29 minutes
});
sessionCache.init();

export const mediaItemsCache = persist.create({
  dir: 'persist-media-items/',
  ttl: 3300000,  // 55 minutes
});
mediaItemsCache.init();