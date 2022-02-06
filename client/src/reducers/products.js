export default (products = [] , action) => {
    switch(action.type){
        case 'ALL_PRODUCTS':
            return action.payload;
        default:
            return products;
    }
}