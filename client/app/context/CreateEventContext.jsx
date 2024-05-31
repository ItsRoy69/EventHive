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
    const [user, setUser] = useState({
        name: '',
        role: ''
    })

    useEffect(() => {
        console.log(user, event)
    }, [user, event])

    return (
        <CreateEventContext.Provider value={{ event, setEvent, user, setUser }}>
            {children}
        </CreateEventContext.Provider>
    )
}

export { CreateEventProvider, CreateEventContext }