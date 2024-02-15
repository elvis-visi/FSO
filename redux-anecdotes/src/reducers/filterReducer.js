
const filterReducer = (state='',action) => {

    switch(action.type) {
        case 'SET_FILTER':
            return action.payload.filter
         default:
            return state   
    }

}

export const filterAction =  function (filter) {

    return {
        type: 'SET_FILTER',
        payload:{
            filter: filter
        }
    }
}



export default filterReducer