import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { reject } from 'q';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private localStorageData = {};

    constructor(private nativeStorage: NativeStorage) { }

    setItem(key: string, value: any): Promise<string> {
        return new Promise(resolve => {
            this.nativeStorage
                .setItem(key, value)
                .then(() => {
                    this.localStorageData[key] = value;
                    resolve(value);
                })
                .catch(error => {
                    console.log(error);
                    this.localStorageData[key] = value;
                    localStorage.setItem(key, value);
                    resolve(value);
                });
        });
    }

    getItem(key: string): Promise<string> {
        return new Promise(resolve => {
            this.nativeStorage
                .getItem(key)
                .then(data => {
                    this.localStorageData[key] = data;
                    resolve(data);
                })
                .catch(error => {
                    console.log(error);
                    const localData = localStorage.getItem(key);
                    this.localStorageData[key] = localData;
                    resolve(localData);
                });
        });
    }

    removeItem(key: string): Promise<string> {
        return new Promise(resolve => {
            this.nativeStorage
                .remove(key)
                .then(() => {
                    resolve(key);
                })
                .catch(error => {
                    console.log(error);
                    localStorage.removeItem(key);
                    resolve(key);
                });
        });
    }

    clear(): Promise<any> {
        return new Promise(resolve => {
            this.nativeStorage
                .clear()
                .then(() => resolve())
                .catch(error => {
                    console.log('error on clear', error);
                    localStorage.clear();
                    resolve();
                });
        });
    }

    allStorage(): Promise<any> {
        return new Promise(resolve => {
            const archive = {}, keys = Object.keys(localStorage);
            let i = keys.length;

            while (i--) {
                archive[keys[i]] = localStorage.getItem(keys[i]);
            }
            resolve(archive);
        }).catch(err => {
            reject(err);
        });
    }
}
