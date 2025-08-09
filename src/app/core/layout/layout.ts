import { Component, computed, inject } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../sidebar.service';
import { EmployeeTable } from '../../dashboard/employee-table/employee-table';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Sidebar, RouterOutlet, EmployeeTable],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
 sidebarService = inject(SidebarService);
  isOpen = computed(() => this.sidebarService.isOpen());
}
