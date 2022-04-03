# cacheAPI
- An endpoint that returns the cached data for a given key.
    - If the key is not found in the cache:
    - Log an output “Cache Miss”.
    - Create a random string.
    - Update the cache with this random string.
    - Return the random string.
    - If the key is found in the cache:
    - Log an output “Cache Hit”.
    - Get the data for this key.
    - Return the data.
- An endpoint that returns all stored keys in the cache.
- An endpoint that updates the data for a given key.
- An endpoint that creates a new cache object.
- An endpoint that removes a given key from the cache.
- Aan endpoint that removes all keys from the cache.

- The number of entries allowed in the cache is limited. If the maximum amount of
cached items is reached, some old entry needs to be overwritten.
- Every cached item has a Time To Live (TTL). If the TTL is exceeded, the cached data will not be used. A new random value will then be generated (just like cache miss). The TTL will be reset on every read/cache hit.
