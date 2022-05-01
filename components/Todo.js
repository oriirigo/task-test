import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"
import { useTasks } from "../context/taskContext";
import Styles from "../styles/StylesFirst.module.css"
 
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
    <div ><ul>
      <li className={Styles.li}>
     <div className={Styles.linea}>
         {title}/{status}
     
        <button onClick={handleDelete} className={Styles.button2}>X</button>
        <button onClick={() => getId(id, title, status)} className={Styles.button2}>EDIT</button>
        
        </div>
      </li>
    </ul>
    </div>
  )
}
 
export default Todo
