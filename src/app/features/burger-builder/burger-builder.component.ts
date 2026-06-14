import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BASE_PRICE,
  INGREDIENT_TYPES,
  INGREDIENT_PRICES,
  INITIAL_INGREDIENTS,
  IngredientType,
  MAX_ALLOWED_INGREDIENTS,
} from './burger.model';
import { BurgerComponent } from './components/burger/burger.component';
import { BuildControlsComponent } from './components/build-controls/build-controls.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-burger-builder',
  imports: [
    BurgerComponent,
    BuildControlsComponent,
    ConfirmationDialogComponent,
    ModalComponent,
    OrderSummaryComponent,
  ],
  template: `
    <app-modal [show]="isPurchasing()" labelledBy="order-summary-title" (closed)="cancelPurchase()">
      <app-order-summary
        [ingredients]="ingredients()"
        [price]="totalPrice()"
        (purchaseCancelled)="cancelPurchase()"
        (purchaseContinued)="continuePurchase()"
      />
    </app-modal>

    <app-confirmation-dialog
      [show]="isConfirmingPurchase()"
      title="Place your order?"
      message="Are you sure to place the order?"
      (cancelled)="cancelConfirmation()"
      (confirmed)="confirmPurchase()"
    />

    <div class="burger-stage">
      <app-burger [ingredients]="ingredients()" />
    </div>

    <app-build-controls
      [ingredients]="ingredients()"
      [price]="totalPrice()"
      [basePrice]="basePrice"
      [maxPerIngredient]="maxAllowedIngredients"
      [purchasable]="isPurchasable()"
      (ingredientAdded)="addIngredient($event)"
      (ingredientRemoved)="removeIngredient($event)"
      (ordered)="startPurchase()"
    />
  `,
  styleUrl: './burger-builder.component.scss',
})
export class BurgerBuilderComponent {
  private readonly router = inject(Router);

  protected readonly basePrice = BASE_PRICE;
  protected readonly maxAllowedIngredients = MAX_ALLOWED_INGREDIENTS;
  protected readonly ingredients = signal({ ...INITIAL_INGREDIENTS });
  protected readonly isPurchasing = signal(false);
  protected readonly isConfirmingPurchase = signal(false);

  protected readonly totalPrice = computed(() =>
    INGREDIENT_TYPES.reduce(
      (total, type) => total + INGREDIENT_PRICES[type] * this.ingredients()[type],
      BASE_PRICE,
    ),
  );

  protected readonly isPurchasable = computed(() =>
    Object.values(this.ingredients()).some((count) => count > 0),
  );

  protected addIngredient(type: IngredientType): void {
    this.ingredients.update((ingredients) => ({
      ...ingredients,
      [type]: Math.min(ingredients[type] + 1, MAX_ALLOWED_INGREDIENTS),
    }));
  }

  protected removeIngredient(type: IngredientType): void {
    this.ingredients.update((ingredients) => ({
      ...ingredients,
      [type]: Math.max(ingredients[type] - 1, 0),
    }));
  }

  protected startPurchase(): void {
    if (this.isPurchasable()) {
      this.isPurchasing.set(true);
    }
  }

  protected cancelPurchase(): void {
    this.isPurchasing.set(false);
    this.isConfirmingPurchase.set(false);
  }

  protected continuePurchase(): void {
    this.isPurchasing.set(false);
    this.isConfirmingPurchase.set(true);
  }

  protected cancelConfirmation(): void {
    this.isConfirmingPurchase.set(false);
    this.isPurchasing.set(true);
  }

  protected confirmPurchase(): void {
    this.isConfirmingPurchase.set(false);
    void this.router.navigate(['/orders'], { state: { purchased: true } });
  }
}
