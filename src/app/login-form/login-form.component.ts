import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.passwordMatchChanges();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator 
    });
  }

  private passwordMatchChanges(): void {
    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity();
    });
    this.loginForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity();
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  submitForm(): void {
    this.isSubmitted = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}