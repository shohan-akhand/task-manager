import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private emailSubject = new BehaviorSubject<string>('');
  private passwordSubject = new BehaviorSubject<string>('');

  public email$ = this.emailSubject.asObservable();
  public password$ = this.passwordSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }
  setPassword(password: string) {
    this.passwordSubject.next(password);
  }
}
