import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })

 export class CuongService {
    domain='http://localhost:3001/data' // đường dẫn đến backend
    constructor(private http: HttpClient){}
    public getData(): Observable<any>{
        return this.http.get(this.domain)
    }
    // public getData(): Observable<any>{
    //     return this.http.get(this.domain)

    // }
    public dataAdd(dataForAdd:any) :Observable<any>{
        return this.http.post(this.domain,dataForAdd)
    }
    public deleteItem(id:any): Observable<any>{
        console.log(id,'hihi')
        return this.http.delete(this.domain+`/${id}`)
    }
    public editData(data:any): Observable<any>{
    console.log(data)
    return this.http.put(this.domain+`/${data.id}`,{firstname:data.firstname,lastname:data.lastname,age:data.age})
    }
    public getPagination(data:any):Observable<any>{
        console.log(data,'hiii')
        return this.http.get(this.domain + `?_page=${data.page}&_limit=${data.limit}`)
    }
    public search(data:any):Observable<any>{
        console.log(data,'haha')
      
        return this.http.get(this.domain + `?q=${data.search}`)
    }
    }