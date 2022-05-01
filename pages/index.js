import TodoList from '../components/TodoList'
import { TaskProvider } from '../context/taskContext'



 
 
export default function Home() {
 
  return (
    <>  
    
      <TaskProvider>
      
        <TodoList />

      </TaskProvider>
       
      
    </>
  )
 
}
