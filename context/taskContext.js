import { createContext, useContext, useState } from "react";

const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)


export const TaskProvider = ({ children }) => {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState()
    const [isUpDate, setIsUpDate] = useState(false)

    return (
        <TaskContext.Provider value={{ title, status, setStatus, setTitle, isUpDate, setIsUpDate, id, setId }}>
            {children}
        </TaskContext.Provider>
    )
}
