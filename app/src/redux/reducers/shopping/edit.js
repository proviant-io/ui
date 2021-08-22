import {STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING, STATUS_UPDATED} from '../consts'
import {
    ACTION_SHOPPING_LIST_ITEM_EDIT_FAIL, ACTION_SHOPPING_LIST_ITEM_EDIT_RESET,
    ACTION_SHOPPING_LIST_ITEM_EDIT_SENDING,
    ACTION_SHOPPING_LIST_ITEM_EDIT_SUCCESS
} from "../../actions/const";


const initialState = () => {
    return {
        status: STATUS_DEFAULT,
        error: null
    }
}

export default function (state = initialState(), action) {

    switch (action.type) {
        case ACTION_SHOPPING_LIST_ITEM_EDIT_RESET:
            return {
                ...state,
                status: STATUS_DEFAULT,
                error: null
            }
        case ACTION_SHOPPING_LIST_ITEM_EDIT_SENDING:
            return {
                ...state,
                status: STATUS_SENDING,
                error: null
            }
        case ACTION_SHOPPING_LIST_ITEM_EDIT_FAIL:
            return {
                ...state,
                status: STATUS_ERROR,
                error: action.error
            }
        case ACTION_SHOPPING_LIST_ITEM_EDIT_SUCCESS:
            return {
                ...state,
                status: STATUS_UPDATED,
                error: null
            }
        default:
            return state
    }
}
