import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:3000/users/';
  private loginUrl = 'http://localhost:3000/credentials';

  constructor(private http: HttpClient) { }

  // Login
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }
  
  // User list
  async getUserListData(): Promise<any[]> {
    try {
      const data = await fetch(this.apiUrl);
      return await data.json() ?? [];
    } catch (error) {
      console.error('Error getting user list:', error);
      throw error;
    }
  }

  // Add user
  async addUser(user: any): Promise<any> {
    try {
      delete user.id;
      return await firstValueFrom(this.http.post<any>(this.apiUrl, user));
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // Edit user
  async editUser(user: any): Promise<any> {
    try {
      return await firstValueFrom(this.http.put<any>(`${this.apiUrl}${user.id}`, user));
    } catch (error) {
      console.error('Error editing user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<any>(`${this.apiUrl}${id}`));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
