import { Component, input } from '@angular/core';
import { IngredientRenderType } from '../../burger.model';

@Component({
  selector: 'app-burger-ingredient',
  template: `
    @switch (type()) {
      @case ('bread-bottom') {
        <div class="bread-bottom" aria-hidden="true"></div>
      }
      @case ('bread-top') {
        <div class="bread-top" aria-hidden="true">
          <div class="seeds-1"></div>
          <div class="seeds-2"></div>
        </div>
      }
      @case ('meat') {
        <div class="meat" aria-hidden="true"></div>
      }
      @case ('cheese') {
        <div class="cheese" aria-hidden="true"></div>
      }
      @case ('bacon') {
        <div class="bacon" aria-hidden="true"></div>
      }
      @case ('salad') {
        <div class="salad" aria-hidden="true"></div>
      }
    }
  `,
  styleUrl: './burger-ingredient.component.scss',
})
export class BurgerIngredientComponent {
  readonly type = input.required<IngredientRenderType>();
}
