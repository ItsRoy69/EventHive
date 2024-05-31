import { createContext, useContext, useState, useEffect } from 'react'

export const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {

    // user states and setters

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null) 
    const [isLoading, setIsLoading] = useState(true)

    const blankUser = {
        name: '',
        email: '',
        phone: '',
        avatar: '',
        _id: '',
        token: ''
    }

    useEffect(() => {
        setUser(blankUser)
    }, [])

    useEffect(() => {
        console.log("From global provider: ", user)
    }, [user])

    const setUserContext = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    // event states and setters

    const [events, setEvents] = useState([])
    const [currentEvent, setCurrentEvent] = useState(null)

    const blankEvents = []
    const blankCurrentEvent = {
        name: '',
        role: '',
        channels: [],
        meetings: [],
        date: '',
        _id: ''
    }

    useEffect(() => {
        setEvents(blankEvents)
        setCurrentEvent(blankCurrentEvent)
    }, [])

    useEffect(() => {
        console.log("From global provider (events): ", events)
    }, [events])

    useEffect(() => {
        console.log("From global provider (currentEvent): ", currentEvent)
    }, [currentEvent])

    return (
        <GlobalContext.Provider 
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user, 
                setUser,
                isLoading,
                setUserContext,
                events,
                setEvents,
                currentEvent,
                setCurrentEvent,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}