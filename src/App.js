import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([])
  const [todoValue, setTodoValue] = useState('')

  const getTasks = async () => {
    const res = await api.get('/tasks')
    console.log(res)
    setTodoList(res.data.data)
  }
  const addTask = async () =>{
    try {
      const res = await api.post('/tasks',{task:todoValue,isComplete:false})
      if(res.status === 200) {
        console.log('포스트 성공')
        setTodoValue("")
        getTasks()
      } else {
        throw new Error('task can not be added')
      }
    } catch (error) {
      console.log('error',error)
    }
  }  
  const upDateTask = async (_id,isComplete) =>{
    try {
      const res = await api.put(`/tasks/${_id}`,{isComplete: !isComplete})
      if(res.status===200) {
        console.log('끝남!!')
        getTasks()
      } else {
        throw new Error('task can not be updated')
      }
    } catch (error) {
      console.log('put',error)
    }
  }
  const delTask = async (_id) => {
    try {
      const res = await api.delete(`/tasks/${_id}`)
      if(res.status===200){
        console.log('삭제 성공')
        getTasks()
      } else {
        throw new Error('삭제 실패')
      }
    } catch (error) {
      console.log('error',error)
    }
  }
  useEffect(()=>{
    getTasks()
  },[])
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} delTask={delTask} upDateTask={upDateTask}/>
    </Container>
  );
}

export default App;
