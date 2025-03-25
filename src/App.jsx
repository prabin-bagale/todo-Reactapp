import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

const[todo,setTodo]=useState("")
const[todos,setTodos]=useState([])
const[dueDate,setDueDate]=useState("")
const[showFinished,setshowFinished]=useState(true)


 useEffect(()=>{
  let todoString =JSON.parse(localStorage.getItem("todos"))
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
 },[])
const saveTo = (params)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}
const toggleFinished =(e)=>{
  setshowFinished(!showFinished)
}

const handleEdit = (e,id) =>{
  let t = todos.filter(i=>i.id === id)
 setTodo(t[0].todo)
 let newtodos= todos.filter(item=>{
  return item.id!== id;
})
setTodos(newtodos)
saveTo()
}

const handleDelete = (e,id) =>{
  let newtodos= todos.filter(item=>{
    return item.id!== id;
  })
  setTodos(newtodos)
  saveTo()
}

const handleAdd = () =>{
  setTodos([...todos,{ id:uuidv4(),todo,isCompleted: false, dueDate}])
  setTodo("")
  setDueDate("")
  saveTo()
}
const handleChange = (e) =>{
setTodo(e.target.value)
}
const handleDateChange = (e) => {
  setDueDate(e.target.value)
}
const handleCheckbox = (e) =>{
let id = e.target.name;
console.log(`the id is ${id}`)
let index = todos.findIndex(item=>{
  return item.id === id;
})
let newtodos= [...todos]
newtodos[index].isCompleted = !newtodos[index].isCompleted
setTodos(newtodos)
saveTo()
}
  return (
    <>
    <Navbar/>
    <div className='md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh] md:w-[35%]'>
    <h1 className='font-bold text-center text-3xl'>iTask - Manage Your Daily life Task</h1>
      <div className="addtodo my-2 flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Add a Todo</h2>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input type="text" onChange={handleChange} value={todo} className='w-full bg-white rounded px-5 py-1' placeholder="Enter your todo" />
            <button onClick={handleAdd} disabled={todo.length <=3} className='bg-violet-800 mx-2 hover:bg-violet-950 p-4 py-2 text-sm font-bold disabled:bg=violet=700 rounded-full text-white'>Save</button>
          </div>
          <input 
            type="datetime-local" 
            onChange={handleDateChange} 
            value={dueDate}
            className='w-full bg-white rounded px-5 py-1'
          />
        </div>
      </div>
      <input className=" my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
      <label className="mx-2" htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-black opacity-20 w-[90%] mx-auto my-4'></div>
      <h2 className='text-2xl font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length=== 0 && <div className='m-5'>No Todos to Display</div>}
        {todos.map(item=>{
          return(showFinished || !item.isCompleted)&& 
        <div key={item.id} className="todo flex justify-between my-3">
          <div className='flex gap-5'>
          <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
        <div className="flex flex-col">
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          {item.dueDate && (
            <div className="text-sm text-gray-600">
              Due: {new Date(item.dueDate).toLocaleString()}
            </div>
          )}
        </div>
        </div>
        <div className="buttons flex h-full">
          <button onClick={(e)=>{handleEdit(e,item.id)}}className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-2'><MdOutlineModeEdit /></button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-2'><MdDeleteForever /></button>
        </div>
        </div>
         })}
      </div>
     
    </div>
    </>
  )
} 

export default App
