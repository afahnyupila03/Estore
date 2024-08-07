export const defaultState = {
  products: [],
  totalAmount: 0,
};

export const wishlistState = {
  wishlist: [],
  totalAmount: 0,
};

export const purchaseState = {
  purchase: [],
  totalAmount: 0,
};

export const defaultAuthState = {
  email: null,
  password: null,
};

export default function cartReducer(state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.products.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.products[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.products.concat(action.item);
    }

    return {
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.products.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.products[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.products.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultState;
  }

  return state;
}

export function wishlistReducer(state, action) {}

export function purchaseReducer(state, action) {}

export const AuthReducer = (state, action) => {
  if (action.type === "SIGNUP") {
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  }

  if (action.type === "LOGIN") {
    if (state.email === action.email && state.password === action.password) {
      return {
        ...state,
        isLoggedIn: true,
      };
    } else {
      return state;
    }
  }

  if (action.type === "LOGOUT") {
    return {
      ...defaultAuthState,
    };
  }

  return state;
};
