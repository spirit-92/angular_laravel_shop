import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authService/auth.service";

@Component({
  selector: 'app-info-user-page',
  templateUrl: './info-user-page.component.html',
  styleUrls: ['./info-user-page.component.scss']
})
export class InfoUserPageComponent implements OnInit {

  constructor(
    private http:AuthService
  ) { }

  ngOnInit(): void {
    this.http.test().subscribe(res =>{
      console.log(res)
    })
  }

}
