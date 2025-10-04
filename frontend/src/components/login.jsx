import React, { useState } from 'react';
import API from '../services/api';


export default function Login({ onLogin }){
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState(null);


async function submit(e){
e.preventDefault();
try{
const res = await API.post('/auth/login', { email, password });
localStorage.setItem('token', res.data.token);
onLogin(res.data.user);
}catch(err){
setError(err.response?.data?.message || 'Login failed');
}
}


return (
<form onSubmit={submit} style={{ flex: 1 }}>
<h3>Login</h3>
{error && <div style={{ color: 'red' }}>{error}</div>}
<div>
<input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
</div>
<div>
<input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
</div>
<button type="submit">Login</button>
</form>
);
}