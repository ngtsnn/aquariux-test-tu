import { compressToBase64, decompressFromBase64 } from "lz-string";

class LocalStorageService {
  version = '1.0.1';

  serialize(data: unknown) {
    return compressToBase64(JSON.stringify(data));
  }

  deserialize(raw?: string | null) {
    if (!raw) {
      return null;
    }
    return JSON.parse(decompressFromBase64(raw));
  }

  setItem(key: string, data: unknown) {
    
    return localStorage?.setItem(key, this.serialize(data));
  }

  getItem(key: string) {
    try {
      const val = localStorage?.getItem(key);
      const deserialized = this.deserialize(val);
      return deserialized;
    } catch (error) {
      return null;
    }
  }

  removeItem(key: string) {
    return localStorage?.removeItem(key);
  }

  clear() {
    return localStorage?.clear();
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
