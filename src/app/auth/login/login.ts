import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.auth.login(this.form.value).subscribe({
  next: res => {
    this.auth.saveToken(res.token);
    this.router.navigate(['/users']); 
  },
  error: () => alert('Usuario o contraseña incorrectos')
});

  }
}
