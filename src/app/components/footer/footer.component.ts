import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

    showButtons: boolean = false;

    ngOnInit(): void {
      this.checkFooterVisibility();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        this.checkFooterVisibility();
    }

    checkFooterVisibility(): void {
        const footer = document.querySelector('app-footer');
        if (footer) {
            const rect = footer.getBoundingClientRect();
            this.showButtons = rect.top <= window.innerHeight;
        }
    }

    

    constructor(private router: Router){}


    public onItemClick(route: string): void {
      this.router.navigate([route]).then(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
      });
    }

    scrollToTop(): void {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  }
    
}
