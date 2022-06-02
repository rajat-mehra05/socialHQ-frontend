export const initialState = null;

export const reducer = (state, action) => {
    const {type} = action

    switch(type) {
        case "USER": 
            return action.payload;

        case "CLEAR":
            return null;
        
        case "UPDATE":
            return {
                ...state,
                followers: action.payload.followers,
                following: action.payload.following
            };
        
        case "UPDATEPIC":
            return {
                ...state,
            pic: action.payload
            }
            
        default:
            return state;
    }

}