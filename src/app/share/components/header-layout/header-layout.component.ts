import { Component, OnInit } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {
  isAuth:boolean = false;
  constructor(
    private auth:AuthService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated()
    this.auth.checkAuth.subscribe(res =>{
      this.isAuth = res
    })

  }

  onClick(event: MouseEvent) {
    event.preventDefault();
  }

  logout() {
    this.auth.logout().subscribe(res =>{
      console.log(res)
      this.route.navigate(['account','user','login'])
    })
  }
}
