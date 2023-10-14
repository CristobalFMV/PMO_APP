import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.page.html',
  styleUrls: ['./qr-info.page.scss'],
})
export class QrInfoPage implements OnInit {
  scannedData: any = {}; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params && params['scannedData']) {
        this.scannedData = JSON.parse(params['scannedData']);
      }
    });

    
  }
}
