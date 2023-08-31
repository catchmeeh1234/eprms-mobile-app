import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setSession(key: string, value: any): void {
    localStorage.setItem(key, value);
    //sessionStorage.setItem(key, value);
  }
  getSession(key:string) {
    //return sessionStorage.getItem(key);
    return localStorage.getItem(key);
  }
  removeSession() {
    localStorage.clear();
  }

  getSessionData():any[] {
    // Loop through all keys in sessionStorage
    let keyValuePair:any = {};
    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i); // Get the current key
      const value = localStorage.getItem(key); // Get the value for the key

      if (key === null || key === undefined) {
        console.log(`${key} is undefined or null`);
        return [];
      }
      keyValuePair[key] = value;
      //sessionData.push(keyValuePair);
    }

    return keyValuePair;

  }
}
