import { Component, input, output } from '@angular/core';
import { INGREDIENT_TYPES, Ingredients, INITIAL_INGREDIENTS } from '../../burger.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-order-summary',
  imports: [ButtonComponent],
  template: `
    <h3 id="order-summary-title">Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      @for (type of ingredientTypes; track type) {
        <li>
          <span class="ingredient-name">{{ type }}</span
          >: {{ ingredients()[type] }}
        </li>
      }
    </ul>
    <p>
      Total Price: <strong>₹ {{ price().toFixed(2) }}</strong>
    </p>
    <p>Continue to Checkout?</p>
    <button appButton type="button" variant="danger" (click)="purchaseCancelled.emit()">
      CANCEL
    </button>
    <button appButton type="button" variant="success" (click)="purchaseContinued.emit()">
      CONTINUE
    </button>
  `,
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  readonly ingredients = input<Ingredients>(INITIAL_INGREDIENTS);
  readonly price = input(0);
  readonly purchaseCancelled = output<void>();
  readonly purchaseContinued = output<void>();

  protected readonly ingredientTypes = INGREDIENT_TYPES;
}
