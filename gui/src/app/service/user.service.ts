import {Injectable} from '@angular/core';
import {API_URL_TEST, AUTH_API} from '../app.constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL_TEST + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL_TEST + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL_TEST + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL_TEST + 'admin', { responseType: 'text' });
  }

  getTasks(username: string): Observable<any> {
    return this.http.get(AUTH_API + `/users/${username}/todos`, { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(AUTH_API + `/users`, { responseType: 'text' });
  }
}
