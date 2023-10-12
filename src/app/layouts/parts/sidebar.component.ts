import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<aside id="sidebar" class="sidebar">
  <ul class="sidebar-nav" id="sidebar-nav">
    <app-sidebaritem [menuItems]="menuItems"></app-sidebaritem>
  </ul>
</aside>`,
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];
  constructor() { }
  ngOnInit(): void {
    this.menuItems = [
      {
        title: "Dashboard",
        link: '/dashboard',
        icon: "bi bi-grid",
      },
      
     
    ];
  }
}
