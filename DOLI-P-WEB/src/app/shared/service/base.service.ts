import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IDictionary } from '../model/dictionary';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private readonly _httpclient: HttpClient) { }

    get(endPoint: string, params?: IDictionary<string>) {
        let httpParams;
        if (params) {
            httpParams = this.buildParams(params);
        }
        var data = this._httpclient.get(endPoint, { params: httpParams }).pipe(map(res => JSON.parse(JSON.stringify(res))));
        return data;
    }

    post(endPoint: string, requestObject: any) {
        return this._httpclient.post(endPoint, requestObject, { headers: { 'Accept': 'application/*' } }).pipe(map(res => JSON.parse(JSON.stringify(res))));
    }

    public put(endPoint: string, requestObject: any) {
        return this._httpclient.put(endPoint, requestObject).pipe(map(res => JSON.parse(JSON.stringify(res))));
    }

    public Delete(endPoint: string, params?: IDictionary<string>) {
        let httpParams;
        if (params) {
            httpParams = this.buildParams(params);
        }
        return this._httpclient.delete(endPoint, httpParams).pipe(map(res => JSON.parse(JSON.stringify(res))));
    }

    getList(endPoint: string, params?: IDictionary<string>) {
        let httpParams;
        if (params) {
            httpParams = this.buildParams(params);
        }
        var data = this._httpclient.get(endPoint, { params: httpParams }).pipe(map(res => JSON.parse(JSON.stringify(res))));
        return data;
    }

    public buildParams(params: IDictionary<string>): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            const keys: string[] = params.Keys();
            keys.forEach(key => {
                httpParams = httpParams.append(key, params.Item(key));
            });
        }
        return httpParams;
    }

}
