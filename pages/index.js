import Head from 'next/head'
import styles from '../styles/main.module.css'


import { collection, onSnapshot, query,orderBy,getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db ,app} from "../firebase/firebase"

export default function Home() {
  const [todos, setTodos]=useState([])

  useEffect(() => {
    const collectionRef=collection(db ,"task")

    const q=query(collectionRef,orderBy("timestamp","desc"));

    const unsubcribe=onSnapshot(q,(querySnapshot)=>{
      
      setTodos(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
    });
    return unsubcribe

    // const getTodos=async()=>{
    //   const todosCollectionRef=collection(db,"task")
    //  const data= await getDocs(todosCollectionRef)
    //  setTodos(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    // }
    // getTodos()
  }, [])

  return(
    <div>
       {todos.map(todo=><h1 key={todo.id}>Title: {todo.title}</h1>)}
    </div>
  )

}
