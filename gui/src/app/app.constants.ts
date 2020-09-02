import {HttpHeaders} from '@angular/common/http';

export const BASIC_URL = 'http://localhost:8080';
export const TODO_JPA_API_URL = 'http://localhost:8080/jpa';
export const API_URL = 'http://localhost:8080/api';

export const AUTH_API_AUTH = 'http://localhost:8080/api/auth/';
export const AUTH_API = 'http://localhost:8080/api';
export const API_URL_TEST = 'http://localhost:8080/api/test/';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';
export const TOKEN_HEADER_KEY = 'Authorization';


