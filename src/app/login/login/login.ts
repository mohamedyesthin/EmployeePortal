import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputTextModule, InputTextStyle } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, InputTextModule, ButtonModule, Checkbox,ToastModule],
  providers: [MessageService]
})
export class Login {
  username: string = '';
  password: string = '';
  rememberMe = false;
  router = inject(Router);
  messageService = inject(MessageService);
  sidebarService = inject(SidebarService);

  onLogin() {
    if (this.username && this.password) {
      this.router.navigate(['/layout/dashboard']); // Redirect to the dashboard or home page after login
      console.log('Login successful:', this.username, this.password, this.rememberMe);
      this.sidebarService.close()
      // TODO: Add authentication logic here
    } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please fill in all required fields.'
        });
        return;
    }
  }

}
