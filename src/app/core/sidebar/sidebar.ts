import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { SidebarService } from '../../sidebar.service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
 sidebarService = inject(SidebarService);
  isOpen = computed(() => this.sidebarService.isOpen());
    menu = [
    { label: 'Home', icon: '🏠', link: '/' },
    { label: 'Projects', icon: '📂', link: '/projects' },
    { label: 'Analytics', icon: '📊', link: '/analytics' },
    { label: 'Team', icon: '👥', link: '/team' },
  ];
}
