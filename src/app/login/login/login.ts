import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  standalone: true
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  router = inject(Router);
  messageService = inject(MessageService);
  sidebarService = inject(SidebarService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['mohamed', Validators.required],
      password: ['123', Validators.required],
      rememberMe: [false]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.'
      });
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;
    console.log('Login successful:', username, password, rememberMe);

    // Redirect after login
    this.router.navigate(['/layout/dashboard']);
    this.sidebarService.close();

    // TODO: Add actual authentication logic
  }
}
