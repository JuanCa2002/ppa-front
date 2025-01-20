import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  scrollToFooter(): void {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

}
