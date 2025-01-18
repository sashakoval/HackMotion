import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  dynamicContent: string = '';

  improvementGraphUrl = 'assets/images/improvement-graph.png';
  improvementGraphMobileUrl = 'assets/images/improvement-graph-mobile.png';
  improvementProgressbarUrl = 'assets/images/improvement-progressbar.png';
  improvementProgressbarRateUrl = 'assets/images/improvement-progressbar-rate.png';
  improvementRateUrl = 'assets/images/improvement-rate.png';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.dynamicContent = this.getDynamicText(params['quizResult']);
    });
  }

  getDynamicText(quizResult: string): string {
    switch (quizResult) {
      case 'breakpar':
        return 'break Par';
      case 'break80':
        return 'break 80';
      case 'break90':
        return 'break 90';
      case 'break100':
        return 'break 100';
      default:
        return 'break 80';
    }
  }
}
