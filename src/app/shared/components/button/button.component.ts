import { Component, input, output } from '@angular/core';

export type AppButtonVariant = 'danger' | 'success';

@Component({
  selector: 'app-button',
  template: `
    <button
      type="button"
      class="button"
      [class.danger]="variant() === 'danger'"
      [class.success]="variant() === 'success'"
      (click)="pressed.emit()"
    >
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly variant = input<AppButtonVariant>('success');
  readonly pressed = output<void>();
}
