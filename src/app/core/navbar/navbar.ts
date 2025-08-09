import { Component, inject } from '@angular/core';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  sidebarService = inject(SidebarService);
}
