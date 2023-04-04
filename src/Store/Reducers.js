

const defaultState = {
    products: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.products.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.products[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [state.products];
            updatedItems[existingCartItemIndex] = updatedItem;
        }   else {
            updatedItems = state.products.concat(action.item);
        }

        return {
            products: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {

        const existingCartItemIndex = state.products.findIndex(
            item => item.id === action.id
        )
        const existingItem = state.products[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if(existingItem.amount === 1) {
            updatedItems = state.products.filter(
                item => item.id !== action.id
            );
        }   else {
            const updatedItem = {
                ...existingItem, 
                amount: existingItem.amount - 1
            }
            const updatedItems = [...state.products];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            products: updatedItems,
            totalAmount: updatedTotalAmount,
        }

    }

    if (action.type === 'CLEAR') {
        return defaultState
    }

    return defaultState;

};

export default cartReducer;
export { defaultState };