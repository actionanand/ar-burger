import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  template: `
    @if (show()) {
      <button
        type="button"
        class="backdrop"
        [attr.aria-label]="label()"
        (click)="clicked.emit()"
      ></button>
    }
  `,
  styleUrl: './backdrop.component.scss',
})
export class BackdropComponent {
  readonly show = input(false);
  readonly label = input('Close overlay');
  readonly clicked = output<void>();
}
