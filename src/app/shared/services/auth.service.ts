import { ChangeDetectorRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
import { MessageStatus } from '../enums/message-status.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public loggedIn = signal(false);

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public loginStatus = this.isLoggedIn$.asObservable();

  private readonly correctLogin: string = 'User';
  private readonly correctPassword: string = '123';
  private readonly router = inject(Router);
  public messageStatus = MessageStatus;
  private readonly messagesService = inject(MessagesService);

  constructor() {
    if (sessionStorage.getItem('login') && sessionStorage.getItem('pass')) {
      this.loggedIn.set(true);
    }
  }

  public toLogin(login: string, password: string): void {
    if (login === this.correctLogin && password === this.correctPassword) {
      this.handleLogin(login, password);
    } else {
      this.messagesService.showMessage(
        `Niepoprawne dane logowania - spróbuj ponownie`,
        MessageStatus.Error
      );
    }
  }

  private handleLogin(login: string, password: string): void {
    this.loggedIn.set(true);
    this.messagesService.showMessage(`Witaj ${login}`, MessageStatus.Success);
    this.isLoggedIn$.next(true);
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('pass', password);
    this.router.navigateByUrl('/home');
  }

  public toLogout(): void {
    this.loggedIn.set(false);
    this.messagesService.showMessage(
      `Poprawnie wylogowano z aplikacji`,
      MessageStatus.Success
    );
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
  }
}
