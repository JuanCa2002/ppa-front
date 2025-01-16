import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-step',
  templateUrl: './section-step.component.html',
  styleUrl: './section-step.component.css'
})
export class SectionStepComponent {
  @Input() public numeral: number = 1;
  @Input() public sectionWithNumeral: boolean = true;
  @Input() public title: string = "Title";

}
