import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { useTasks } from "../context/taskContext"
import { db } from "../firebase/firebase"
import Todo from './Todo'
import Styles from "../styles/StylesFirst.module.css"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const { setStatus, setTitle, status, title, setIsUpDate, isUpDate, id, setId, statusIn } = useTasks()


  // form validation rules 
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Status is required'),
    status: Yup.string()
      .required('Status is required'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;





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

    try {
      await addDoc(collection(db, 'task'), {
        title: title,
        status: status
      })
      setStatus('')
      setTitle('')
      reset()
    } catch (err) {
      alert(err)
    }
  }

  const upDateFields = async (e) => {

    let fieldToEdit = doc(db, 'task', id)
    await updateDoc(fieldToEdit, {
      title: title,
      status: status
    })
      .then(() => {
        setStatus('')
        setTitle('')
        setIsUpDate(false)
        reset()
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
              <input className={Styles.input} aling='right' placeholder='New Todo' type='text' value={title} name='status'{...register('title')} onChange={e => setTitle(e.target.value)} />
              {errors.title && errors.title.type == 'required' && <p>Title is required</p>}
            </div>
            <div ><br></br><br></br></div>
            <div >
              <select className={Styles.input} name='status'{...register('status')} onChange={e => setStatus(e.target.value)} >
                <option disabled selected>Status(Pending/ In progress/ Done)</option>
                {statusIn &&
                  statusIn.map((e) => (
                    <option key={e.id} value={e.status}>
                      {" "}
                      {e.status}{" "}
                    </option>
                  ))}
              </select>
              <div>{errors.title?.message}</div>
            </div>
            <div >
              <br></br>
              <br></br>
              {!isUpDate ? (<button className={Styles.button} onClick={handleSubmit(onSubmit)}>ADD</button>) :
                (<button onClick={handleSubmit(upDateFields)} className={Styles.button} >MODIFY</button>)}
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

