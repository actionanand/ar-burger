import { Component, computed, input } from '@angular/core';
import {
  INGREDIENT_TYPES,
  IngredientRenderType,
  Ingredients,
  INITIAL_INGREDIENTS,
} from '../../burger.model';
import { BurgerIngredientComponent } from '../burger-ingredient/burger-ingredient.component';

interface BurgerLayer {
  readonly id: string;
  readonly type: IngredientRenderType;
}

@Component({
  selector: 'app-burger',
  imports: [BurgerIngredientComponent],
  template: `
    <section class="burger" aria-label="Burger preview">
      <app-burger-ingredient type="bread-top" />

      @if (ingredientLayers().length > 0) {
        @for (layer of ingredientLayers(); track layer.id) {
          <app-burger-ingredient [type]="layer.type" />
        }
      } @else {
        <p>Please start adding ingredients!</p>
      }

      <app-burger-ingredient type="bread-bottom" />
    </section>
  `,
  styleUrl: './burger.component.scss',
})
export class BurgerComponent {
  readonly ingredients = input<Ingredients>(INITIAL_INGREDIENTS);

  protected readonly ingredientLayers = computed(() =>
    INGREDIENT_TYPES.flatMap((type) =>
      Array.from(
        { length: this.ingredients()[type] },
        (_, index): BurgerLayer => ({
          id: `${type}-${index}`,
          type,
        }),
      ),
    ),
  );
}
