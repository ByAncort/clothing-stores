// Simple mock for useLocalStorage to avoid ESM reassignment in tests
let __mockValue: any[] = [];
let __mockLoaded = true;

export function __seedLocalStorage__(value: any[], loaded = true) {
  __mockValue = value;
  __mockLoaded = loaded;
}

export function useLocalStorage() {
  // Default: loaded=true with empty array and noop setter; tests can configure via __seedLocalStorage__
  return [__mockValue, () => {}, __mockLoaded] as const;
}
