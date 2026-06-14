import { Component, computed, input, output } from '@angular/core';
import { BASE_PRICE, IngredientType, Ingredients, INITIAL_INGREDIENTS } from '../../burger.model';
import { BuildControlComponent } from '../build-control/build-control.component';

interface Control {
  readonly label: string;
  readonly type: IngredientType;
}

const CONTROLS: readonly Control[] = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

@Component({
  selector: 'app-build-controls',
  imports: [BuildControlComponent],
  template: `
    <section class="build-controls" aria-label="Burger build controls">
      <p>
        Current Price:
        <strong>₹ {{ displayPrice().toFixed(2) }}</strong>
      </p>

      @for (control of controls; track control.type) {
        <app-build-control
          [label]="control.label"
          [disabled]="isDisabled(control.type)"
          [maxAllowed]="isMaxAllowed(control.type)"
          (added)="ingredientAdded.emit(control.type)"
          (removed)="ingredientRemoved.emit(control.type)"
        />
      }

      <button
        type="button"
        class="order-button"
        [disabled]="!purchasable()"
        (click)="ordered.emit()"
      >
        ORDER NOW
      </button>
    </section>
  `,
  styleUrl: './build-controls.component.scss',
})
export class BuildControlsComponent {
  readonly ingredients = input<Ingredients>(INITIAL_INGREDIENTS);
  readonly price = input(BASE_PRICE);
  readonly basePrice = input(BASE_PRICE);
  readonly purchasable = input(false);
  readonly maxPerIngredient = input(3);
  readonly ingredientAdded = output<IngredientType>();
  readonly ingredientRemoved = output<IngredientType>();
  readonly ordered = output<void>();

  protected readonly controls = CONTROLS;
  protected readonly displayPrice = computed(() =>
    this.price() > this.basePrice() ? this.price() : 0,
  );

  protected isDisabled(type: IngredientType): boolean {
    return this.ingredients()[type] <= 0;
  }

  protected isMaxAllowed(type: IngredientType): boolean {
    return this.ingredients()[type] >= this.maxPerIngredient();
  }
}
