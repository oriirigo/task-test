import Head from 'next/head'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import styles from '../styles/main.module.css'


export default function Home() {

  return (
    <>
    <h2>TODO LIST</h2>
      <TodoList />
      <TodoForm/>
      </>
  )

}
