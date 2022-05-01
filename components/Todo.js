import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"
import { useTasks } from "../context/taskContext"
 
const Todo = ({ id, title, status }) => {
  const { setStatus, setTitle, setIsUpDate, setId } = useTasks()
 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'task', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }
 
  const getId = async (id, title, status) => {
    setTitle(title)
    setStatus(status)
    setIsUpDate(true)
    setId(id)
 
  }
 
  return (
    <div><ul>
      <li  >
        {title}
        <h4>{status}</h4>
        <button onClick={handleDelete}>X</button>
        <button onClick={() => getId(id, title, status)}>MODIFY</button>
      </li>
    </ul>
    </div>
  )
}
 
export default Todo
