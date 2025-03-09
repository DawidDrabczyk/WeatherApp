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

  private readonly correctLogin: string = 'Angular';
  private readonly correctPassword: string = '123';
  private readonly router = inject(Router);
  public messageStatus = MessageStatus;
  private readonly messagesService = inject(MessagesService);

  constructor() {}

  public toLogin(login: string, password: string): void {
    if (login === this.correctLogin && password === this.correctPassword) {
      this.loggedIn.set(true);
      this.messagesService.showMessage(`Witaj ${login}`, MessageStatus.Success);
      this.isLoggedIn$.next(true);
      this.router.navigateByUrl('/home');
    } else {
      this.messagesService.showMessage(
        `Niepoprawne dane logowania - spróbuj ponownie`,
        MessageStatus.Error
      );
    }
  }

  public toLogout(): void {
    this.loggedIn.set(false);
    this.messagesService.showMessage(
      `Poprawnie wylogowano z aplikacji`,
      MessageStatus.Success
    );
    this.router.navigateByUrl('/login');
    this.isLoggedIn$.next(false);
  }
}
