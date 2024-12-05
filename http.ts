import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

interface Profile {
  id: number;
  name: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfiles(): void {
    this.http.get<Profile[]>('http://localhost:3001/profiles')
      .pipe(
        catchError(this.handleError) // Catch and process errors
      )
      .subscribe({
        next: (profiles) => {
          console.log('Received profiles:', profiles); // Success handling
        },
        error: (error) => {
          console.error('Error fetching profiles:', error); // Additional error handling
        }
      });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Failed to fetch profiles.'));
  }
}
