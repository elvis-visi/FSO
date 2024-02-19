import { createContext, useReducer } from 'react'

const notificationReducer = (state,action) => {
    switch(action.type){
        case "show":
            return action.payload
        case "hide":
            return ''
        default:
            return state        
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const[notification, dispatchNotification]    =  useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, dispatchNotification]}>
             {props.children}
        </NotificationContext.Provider>
    )

}


export default NotificationContext