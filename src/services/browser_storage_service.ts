//import { Config } from '../../config';

class BrowserStorageImpl {
    static instance: BrowserStorageImpl;
  
    static getInstance() {
      if (!BrowserStorageImpl.instance) {
        BrowserStorageImpl.instance = new BrowserStorageImpl();
      }
      return BrowserStorageImpl.instance;
    }
  
    browserStorage: Storage;
  
    constructor() {
      this.browserStorage = window.localStorage;
    }
  
    getStorage() {
      return this.browserStorage;
    }
  
    get(key: string, module?: string, ) {
      return this.getValueFromStorage(this.getStorage(), key, module);
    }
  
    put(key: string, value: string | null, module?: string) {
      this.putValueIntoStorage(this.getStorage(), key, value, module);
    }
  
    getValueFromStorage(storage: Storage, key: string, module?: string, ) {
      var value = null;
      if (storage.getItem) {
        value = storage.getItem(this.rationalizeKey(key, module));
      } 
      // else {
      //   value = storage.get(this.rationalizeKey(module, key));
      // } TBD
      if (value == null) {
        return value;
      }
      value = JSON.parse(value);
      return value;
    }
  
    putValueIntoStorage(storage: any, key: string, value: string | null, module?: any,) {
      //value = JSON.stringify({ value: value });
      value = JSON.stringify(value);
      if (storage.setItem) {
        storage.setItem(this.rationalizeKey(key, module), value);
        return;
      }
      //storage.set(this.rationalizeKey(module, key), value); TBD
    }
  
    // rationalizeKey(module: string, key: string) {
    //   module = module == null ? "__default_module" : module + "";
    //   return module + "_" + key;
    // }
  
    rationalizeKey(key: string, module?: string,) {
      return module = module ? `${module}_${key}` : key;
    }
  
    clear() {
      this.getStorage().clear();
      sessionStorage.clear();
    }
  }
  
  export const storageKeys = {
    auth: ['token'],
    userPreferences: ['theme']
  }
  
  export const BrowserStorageService = BrowserStorageImpl.getInstance();
  