import NodeCache from "node-cache";

const cache = new NodeCache();

export function setCache(value: any) {
  cache.set("token", value);
}

export function getCache() {
  return cache.get("token");
}
