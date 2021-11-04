import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: any;
  
  constructor() { 
    if(localStorage.getItem('defaultStorage') !== null)
      this.storage = localStorage;
    else
      this.storage = sessionStorage;
  }

  setDefault(local: boolean = true): StorageService
  {
    if(local)
    {
      localStorage.setItem('defaultStorage', 'local');
      this.storage = localStorage;
    }
    else 
    {
      this.storage = sessionStorage;
      sessionStorage.setItem('defaultStorage','session');
    }
    return this;
  }

  getItem(key: string, jsonParse: boolean = false) 
  {
      const value = this.storage.getItem(key);

      if(jsonParse)
      {
        try{ return JSON.parse(value); }
        catch(error){ throw new Error('invalid json'); }
      }

      return value;
  }

  setItem(key: string, value: string | object, jsonStringify: boolean = false): StorageService
  {
    if(jsonStringify) value = JSON.stringify(value);

    this.storage.setItem(key, value);

    return this;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  cleanStorage():void {
    const keys = Object.keys(this.storage);
    keys.forEach(key => {
      this.storage.removeItem(key);
    });
  }

}
