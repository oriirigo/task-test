import Header from '../components/Header'
import TodoList from '../components/TodoList'
import { TaskProvider } from '../context/taskContext'



 
 
export default function Home() {
 
  return (
    <>  
      <TaskProvider>
      <Header></Header>
        <TodoList />
      </TaskProvider>
    </>
  )
 
}
