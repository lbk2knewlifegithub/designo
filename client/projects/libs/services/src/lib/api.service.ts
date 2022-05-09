// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { API_URL } from '@lbk/tokens';
// import { Observable } from 'rxjs';

// /**
//  * - Api Service Wrapper of HttpClient
//  * - Must provide API_URL in app.module.ts
//  * - Example:
//  *
// @NgModule({
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     CoreModule,
//     StateRootModule.forRoot(),
//     HttpClientModule,
//   ],
//   providers: [
//       // NOTICE HERE
//     {
//       provide: API_URL,
//       useValue: environment.apiUrl,
//     },
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
//  */
// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   constructor(
//     private readonly _http: HttpClient,
//     @Inject(API_URL)
//     private readonly _apiUrl: string
//   ) {}

//   /**
//    * - Get
//    * @param url
//    * @param params
//    * @returns
//    */
//   get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
//     return this._http.get<T>(`${this._apiUrl}${url}`, {
//       headers: this.headers,
//       params,
//     });
//   }

//   /**
//    * - Post
//    * @param url
//    * @param data
//    * @returns
//    */
//   post<T, D>(url: string, data?: D): Observable<T> {
//     return this._http.post<T>(`${this._apiUrl}${url}`, JSON.stringify(data), {
//       headers: this.headers,
//     });
//   }

//   /**
//    * - Post
//    * @param url
//    * @param data
//    * @returns
//    */
//   upload<T>(
//     url: string,
//     formData: FormData,
//     accessToken?: string
//   ): Observable<T> {
//     return this._http.put<T>(`${this._apiUrl}${url}`, formData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//   }

//   /**
//    * - Put
//    * @param url
//    * @param data
//    * @returns
//    */
//   put<T, D>(url: string, data: D): Observable<T> {
//     return this._http.put<T>(`${this._apiUrl}${url}`, JSON.stringify(data), {
//       headers: this.headers,
//     });
//   }

//   /**
//    * - Patch
//    * @param url
//    * @param data
//    * @returns
//    */
//   patch<T, D>(url: string, data: D | null = null): Observable<T> {
//     return this._http.patch<T>(
//       `${this._apiUrl}${url}`,
//       data ? JSON.stringify(data) : '',
//       {
//         headers: this.headers,
//       }
//     );
//   }

//   /**
//    * - Delete
//    * @param url
//    * @returns
//    */
//   delete<T, D>(url: string, data: D | null = null): Observable<T> {
//     return this._http.delete<T>(`${this._apiUrl}${url}`, {
//       headers: this.headers,
//       body: data ? JSON.stringify(data) : '',
//     });
//   }

//   /**
//    * - Set up Headers
//    */
//   get headers(): HttpHeaders {
//     const headersConfig = {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     };
//     return new HttpHeaders(headersConfig);
//   }
// }
