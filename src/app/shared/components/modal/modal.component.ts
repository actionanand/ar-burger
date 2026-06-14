import { Component, ElementRef, effect, input, output, viewChild } from '@angular/core';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-modal',
  imports: [BackdropComponent],
  template: `
    @if (show()) {
      <app-backdrop [show]="true" (clicked)="closed.emit()" />

      <section
        #dialogPanel
        class="modal"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="labelledBy()"
        tabindex="-1"
        (keydown.escape)="closed.emit()"
      >
        <ng-content />
      </section>
    }
  `,
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  readonly show = input(false);
  readonly labelledBy = input('dialog-title');
  readonly closed = output<void>();

  private readonly dialogPanel = viewChild<ElementRef<HTMLElement>>('dialogPanel');

  constructor() {
    effect(() => {
      if (!this.show()) {
        return;
      }

      queueMicrotask(() => this.dialogPanel()?.nativeElement.focus());
    });
  }
}
