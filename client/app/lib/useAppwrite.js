import { useState, useEffect } from "react"

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
            setData(response)
        } catch (err) {
            Alert.alert('Error', err.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const refetch = async () => {
        fetchData()
    }
    return {data, isLoading, refetch}
}

export default useAppwrite