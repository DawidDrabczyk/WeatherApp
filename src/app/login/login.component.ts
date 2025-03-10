import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { MessageStatus } from '../shared/enums/message-status.enum';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public login!: string;
  public password!: string;
  public errorMsg!: string;
  public messageStatus = MessageStatus;
  private readonly authService = inject(AuthService);
  private readonly messagesService = inject(MessagesService);

  public toLogin(): void {
    if (this.isInvalidForm()) {
      this.messagesService.showMessage(
        'Proszę uzupełnić dane logowania',
        this.messageStatus.Error
      );
      return;
    }

    this.authService.toLogin(this.login, this.password);
  }

  private isInvalidForm(): boolean {
    if (!this.login || !this.password) {
      this.errorMsg = 'Proszę uzupełnić dane logowania';
      return true;
    }

    return false;
  }
}
