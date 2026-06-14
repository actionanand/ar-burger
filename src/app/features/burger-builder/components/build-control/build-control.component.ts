import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-build-control',
  template: `
    <div class="build-control">
      <div class="label">{{ label() }}</div>
      <button type="button" class="less" [disabled]="disabled()" (click)="removed.emit()">
        Less
      </button>
      <button type="button" class="more" [disabled]="maxAllowed()" (click)="added.emit()">
        More
      </button>
    </div>
  `,
  styleUrl: './build-control.component.scss',
})
export class BuildControlComponent {
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly maxAllowed = input(false);
  readonly added = output<void>();
  readonly removed = output<void>();
}
