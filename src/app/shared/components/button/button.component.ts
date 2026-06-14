import { Component, input } from '@angular/core';

export type AppButtonVariant = 'danger' | 'success';

@Component({
  selector: 'button[appButton]',
  host: {
    class: 'button',
    '[class.danger]': "variant() === 'danger'",
    '[class.success]': "variant() === 'success'",
  },
  template: '<ng-content />',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly variant = input<AppButtonVariant>('success');
}
