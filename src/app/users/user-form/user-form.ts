import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html'
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      estado: [true]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || null;
    if (this.id) {
      this.service.get(this.id).subscribe(user => {
        this.form.patchValue({
          email: user.email,
          estado: user.estado
        });
      });
    }
  }

  submit() {
    if (this.id) {
      const data = {
        email: this.form.value.email,
        estado: this.form.value.estado
      };
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/users']));
    } else {
      // creación -> enviamos todo
      this.service.create(this.form.value).subscribe(() => this.router.navigate(['/users']));
    }
  }
}
