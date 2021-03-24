import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-provider-card',
  templateUrl: './service-provider-card.component.html',
  styleUrls: ['./service-provider-card.component.scss'],
  providers: [NgbRatingConfig],
})
export class ServiceProviderCardComponent implements OnInit {
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {}
}
