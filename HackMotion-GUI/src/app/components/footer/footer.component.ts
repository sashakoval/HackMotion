import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerContent: string = `Copyright ${(new Date()).getFullYear()} © HackMotion | All Rights Reserved`
}
