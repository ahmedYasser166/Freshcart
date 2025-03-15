import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ValidationMessagesComponent } from '../../../shared/components/validation/validation-messages/validation-messages.component';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  //     ==> property
  isLoding: boolean = true;
  resMsg: string = '';
  //     ==> property

  //    ===> registerForm

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/
        ),
      ]),
      rePassword: new FormControl(null, [
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/
        ),
      ]),
    },
    { validators: this.validateRePassword }
  );
  //    ===> registerForm

  //    ===> validateRePassword

  validateRePassword(control: AbstractControl) {
    return control.get('password')?.value === control.get('rePassword')?.value
      ? null
      : { misMatch: true };
  }
  //    ===> validateRePassword

  //    ===> Submit  register
  register() {
    this.isLoding = false;
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoding = true;
          if (res.message === 'success') {
            this.router.navigate(['/auth/login']);
          }
        },
        error: ({ error }) => {
          console.log(error);
          this.resMsg = error.message;
          this.isLoding = true;
        },
      });
    } else {
      this.registerForm.get('rePassword')?.setValue('');
      this.registerForm.markAllAsTouched();
    }
  }
  //    ===> Submit  register
}
