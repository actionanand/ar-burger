export const INGREDIENT_TYPES = ['salad', 'bacon', 'cheese', 'meat'] as const;

export type IngredientType = (typeof INGREDIENT_TYPES)[number];
export type IngredientRenderType = IngredientType | 'bread-bottom' | 'bread-top';
export type Ingredients = Record<IngredientType, number>;

export const BASE_PRICE = 80;
export const MAX_ALLOWED_INGREDIENTS = 3;

export const INGREDIENT_PRICES: Record<IngredientType, number> = {
  salad: 15.25,
  cheese: 13.5,
  meat: 28.7,
  bacon: 36.63,
};

export const INITIAL_INGREDIENTS: Ingredients = {
  salad: 0,
  bacon: 0,
  cheese: 0,
  meat: 0,
};
