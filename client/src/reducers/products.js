/* eslint-disable import/no-anonymous-default-export */
export default (products = [] , action) => {
    switch(action.type){
        case 'ALL_PRODUCTS':
            return action.payload;
        default:
            return products;
    }
}

