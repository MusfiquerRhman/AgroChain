import * as api from '../api/products'

export const getProducts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchProducts();
        dispatch({type: 'ALL_PRODUCTS', payload: data})
    } 
    catch(err) {
        console.log(err)
    }
}
