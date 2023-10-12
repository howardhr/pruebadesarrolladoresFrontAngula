import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    const kl = "toggle-sidebar";
    if (this.document.body.classList.contains(kl)) {
      this.document.body.classList.remove(kl);
    } else {
      this.document.body.classList.add(kl);
    }
  }

  logout(): void {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
