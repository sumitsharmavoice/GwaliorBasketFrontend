

const intialState = {
    cart: {}
}

function RootReducer(state = intialState, action) {

    switch (action.type) {
        case 'ADD_CART':
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart }

        case 'DELETE_CART':
            delete state.cart[action.payload[0]]
            return { cart: state.cart }


        default:
            return { cart: state.cart }

    }
}
export default RootReducer