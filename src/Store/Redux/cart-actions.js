import { cartAction } from "./cart-slice"
import { uiAction } from "./ui-slice"

export const sendCartData = cart => {
    return async (dispatch) => {

        dispatch(
            uiAction.showNotification({
                status: 'pending',
                title: 'Sending',
                message: 'Sending products to cart'
            })
        )

        const sendRequest = async () => {
            const response = await fetch(
                'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            }
            )
            if (!response.ok) {
                throw new Error('Sending cart data failed')
            }
        }

        try {
            await sendRequest();
            dispatch(
                uiAction.showNotification({
                    status: 'success',
                    title: 'success',
                    message: 'Successfully send products to cart',
                })
            )
        } catch (error) {
            dispatch(
                uiAction.showNotification({
                    status: 'error',
                    title: 'error',
                    message: 'Error sending products to cart',
                })
            )
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        // Fetch data Function
        const fetchData = async() => {
            const response = await fetch(
                'https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
                );
            if(!response.ok) {
                throw new Error('Fetching cart data failed');
            }
            const responseData = await response.json();

            return responseData;

        } 
        // End of fetchData function
        try {
            const cartData = await fetchData();
            dispatch(cartAction.replaceCart({
                products: cartData || [],
                totalQuantity: cartData.totalQuantity
            }))
        }   catch(error) {
            dispatch(
                uiAction.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Error loading cart products',
                })
            )
        }
    }
}