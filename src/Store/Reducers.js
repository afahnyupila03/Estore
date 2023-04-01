

const defaultState = {
    products: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {

        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.products.findIndex(
            item => item.id === action.item.id
        );
        const existingItem = state.products[existingItemIndex];

        let updatedItems;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...state.products];
            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems = state.products.concat(action.item);
        }

        return {
            products: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if (action.type === 'REMOVE') {

        const existingItemIndex = state.products.findIndex(
            item => item.id === action.id
        );
        const existingItem = state.products[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem === 1) {
            updatedItems = state.products.filter(
                item => item.id !== action.id
            );
        } else {
            const updatedItem = [...existingItem];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            products: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return defaultState
    }

    return defaultState;

};

export default cartReducer;
export { defaultState };