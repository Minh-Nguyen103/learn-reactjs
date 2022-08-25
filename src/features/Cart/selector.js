import { createSelector, current } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, currentItem) => count + currentItem.quantity, 0)
);

export const cartItemsTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, currentItem) => total + currentItem.product.salePrice, 0)
);
