import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from '../actions/action';
import firestore from '@react-native-firebase/firestore'

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        firestore().collection('allcities').doc('10490').get()
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.data()));
            console.warn(res.data())
            return res.products;
        })
        .catch(error => {
            console.warn(error)
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;