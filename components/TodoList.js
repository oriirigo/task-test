import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { useTasks } from "../context/taskContext"
import { db } from "../firebase/firebase"
import Todo from './Todo'
import Styles from "../styles/StylesFirst.module.css"

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const { setStatus, setTitle, status, title, setIsUpDate, isUpDate, id, setId } = useTasks()
 
  useEffect(() => {
    const q = query(collection(db, 'task'), orderBy('title', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
 
 
  }, [])
 
 
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'task'), {
        title: title,
        status: status
      })
      setStatus('')
      setTitle('')
    } catch (err) {
      alert(err)
    }
  }
 
  const upDateFields = async (e) => {
    e.preventDefault()
    let fieldToEdit = doc(db, 'task', id)
    await updateDoc(fieldToEdit, {
      title: title,
      status: status
    })
      .then(() => {
        setStatus('')
        setTitle('')
        setIsUpDate(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
 
 
  return (
    <>
    <header className={Styles.header}>
        <br></br><h2 className={Styles.header1}>TODO LIST</h2></header>
      <div className={Styles.mainDiv}>
        
        <div className={Styles.id}>  <br></br>
            <h3 className={Styles.h3}>TODO LIST</h3></div>
        <div >
        <form className={Styles.form}   >
            <div  >
        <input className={Styles.input} aling='right' placeholder='New Todo' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
       
       <div ><br></br><br></br></div>
    
        <div >
           
          <select  className={Styles.input} onChange={e => setStatus(e.target.value)}>
            <option disabled    >Status(Pending/ In progress/ Done</option>
            <option value="Done" name="Done">Done</option>
            <option value="In progress" name="In progress" >In progress</option>
            <option value="Pending" name="Pending" >Pending</option>
          </select>
        </div>
        <div >
            <br></br>
            <br></br>
        {!isUpDate ? (<button className={Styles.button} onClick={onSubmit}>ADD</button>) :
          (<button onClick={upDateFields}  className={Styles.button} >MODIFY</button>)}
          </div>
          </form>
 </div>

     
        {tasks.map((task) => (
          <Todo
 
            id={task.id}
            key={task.id}
            title={task.data.title}
            status={task.data.status}
 
          />
        ))}

 
      
      </div>
    </>
  )
}
 
