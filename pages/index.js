import TodoList from '../components/TodoList'
import { TaskProvider } from '../context/taskContext'
 
 
export default function Home() {
 
  return (
    <>
      <TaskProvider>
        <h2>TODO LIST</h2>
        <TodoList />
      </TaskProvider>
    </>
  )
 
}
