import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [ButtonComponent, ModalComponent],
  template: `
    <app-modal [show]="show()" labelledBy="confirmation-dialog-title" (closed)="cancelled.emit()">
      <h3 id="confirmation-dialog-title">{{ title() }}</h3>
      <p>{{ message() }}</p>
      <div class="actions">
        <app-button variant="danger" (pressed)="cancelled.emit()">CANCEL</app-button>
        <app-button variant="success" (pressed)="confirmed.emit()">CONFIRM</app-button>
      </div>
    </app-modal>
  `,
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly show = input(false);
  readonly title = input('Confirm action');
  readonly message = input('Are you sure?');
  readonly cancelled = output<void>();
  readonly confirmed = output<void>();
}
