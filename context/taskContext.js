import { createContext, useContext, useState } from "react";

const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)


export const TaskProvider = ({ children }) => {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState()
    const [isUpDate, setIsUpDate] = useState(false)

    const statusIn=[
        {status:"Done", id:1},
        {status:"In progress",id:2},
        {status:"Pending",id:3}
    ]
    return (
        <TaskContext.Provider value={{ title, status, setStatus, setTitle, isUpDate, setIsUpDate, id, setId,statusIn }}>
            {children}
        </TaskContext.Provider>
    )
}
