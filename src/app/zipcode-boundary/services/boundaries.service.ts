import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoundariesService {
  private httpOptions: any;
  private baseUrl = 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary';
  private headers = new HttpHeaders({
    'x-rapidapi-key': environment.BOUNDARIES_IO_API_KEY,
    'x-rapidapi-host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {
    this.httpOptions = { withCredentials: true, headers: this.headers };
  }

  getByZipCode(zipCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/zipcode?zipcode=${zipCode}`, this.httpOptions);
  }
}
