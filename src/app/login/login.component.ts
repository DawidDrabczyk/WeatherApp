import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public login!: string;
  public password!: string;
  public errorMsg!: string;

  private readonly correctLogin: string = 'Angular';
  private readonly correctPassword: string = '123';

  private readonly router = inject(Router);

  public toLogin(): void {
    if (this.isInvalidForm()) {
      return;
    }

    localStorage.setItem('login', this.login);
    localStorage.setItem('password', this.password);

    this.router.navigate(['./home']);
  }

  private isInvalidForm(): boolean {
    if (!this.login || !this.password) {
      console.log('Proszę uzupełnić dane logowania');
      this.errorMsg = 'Proszę uzupełnić dane logowania';
      return true;
    }

    if (
      this.login !== this.correctLogin ||
      this.password !== this.correctPassword
    ) {
      console.log('Niepoprawne dane logowania! Spróbuj ponownie.');
      this.errorMsg = 'Niepoprawne dane logowania! Spróbuj ponownie.';
      return true;
    }

    return false;
  }
}
