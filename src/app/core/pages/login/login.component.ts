import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ValidationMessagesComponent } from '../../../shared/components/validation/validation-messages/validation-messages.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  //     ==> property
  isLoding: boolean = true;
  resMsg: string = '';
  //     ==> property

  //    ===> loginForm
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/
      ),
    ]),
  });
  //    ===> loginForm

  //    ===> Submit  login
  login() {
    this.isLoding = false;
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoding = true;
          if (res.message === 'success') {
            this.authService.saveToken(res.token)
            this.router.navigate(['/home']);
          }
        },
        error: ({ error }) => {
          console.log(error);
          this.resMsg = error.message;
          this.isLoding = true;
        },
      });
    } else {
      this.loginForm.get('rePassword')?.setValue('');
      this.loginForm.markAllAsTouched();
    }
  }
  //    ===> Submit  login
}
