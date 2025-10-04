import React, { useEffect, useState } from 'react';
import API from '../services/api';
import AddTask from './AddTask';
import TaskItem from './TaskItem';


export default function Dashboard({ user, onLogout }){
const [tasks,setTasks] = useState([]);


async function load(){
try{
const res = await API.get('/tasks');
setTasks(res.data);
}catch(err){
console.error(err);
}
}


useEffect(()=>{ load(); }, []);


function addLocal(task){ setTasks(prev=>[task, ...prev]);

}
}