import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;

  constructor(private service: UserService, private router: Router) {
    this.users$ = this.service.list();
  }
  ngOnInit(): void {
  }

   edit(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

    delete(id: number) {
      if(confirm('¿Deseas eliminar este usuario?')) {
        this.service.delete(id).subscribe(() => {
  this.users$ = this.service.list();
    });
      }
    }

    createNew() {
      this.router.navigate(['/users/new']);
    }
}
