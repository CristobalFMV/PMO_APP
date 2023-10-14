import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-granted',
  templateUrl: './granted.page.html',
  styleUrls: ['./granted.page.scss'],
})
export class GrantedPage implements OnInit {
  password: string = ''; 

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.password = params['password'];
    });
  }
}
