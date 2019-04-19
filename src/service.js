import { inject, NewInstance } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

@inject(NewInstance.of(HttpClient))
export class Service {
    constructor(httpClient) {
        this._httpClient = httpClient;
    }
    getAdresse(str) {
        console.log(str);
        return this._httpClient.fetch('download.json')
            .then(res => res.json())
            .then(res => {
                let results = res.features.map((item) => item.properties);
                console.log(results);
                return results;
            })
    }
}