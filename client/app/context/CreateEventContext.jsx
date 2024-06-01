import { createContext, useState, useEffect } from "react";

const CreateEventContext = createContext(null)

const CreateEventProvider = ({ children }) => {
    const blankEventData = {
        _id:'',
        type: '',
        names: [],
        startDateTime: '',
        endDateTime: ''
    }
    const [event, setEvent] = useState(blankEventData)

    const blankUser = { name: '', role: '' }
    const [user, setUser] = useState(blankUser)

    useEffect(() => {
        console.log(user, event)
    }, [user, event])

    const clearContextData = () => {
        setEvent(blankEventData)
        setUser(blankUser)
    }

    return (
        <CreateEventContext.Provider value={{ event, setEvent, user, setUser, clearContextData }}>
            {children}
        </CreateEventContext.Provider>
    )
}

export { CreateEventProvider, CreateEventContext }