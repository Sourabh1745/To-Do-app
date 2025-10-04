import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';


export default function App(){
const [user, setUser] = useState(() => {
const raw = localStorage.getItem('user');
return raw ? JSON.parse(raw) : null;
});


useEffect(() => {
if (user) localStorage.setItem('user', JSON.stringify(user));
else localStorage.removeItem('user');
}, [user]);


return (
<div style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
<h1>Simple TODO App</h1>
{!user ? (
<div style={{ display: 'flex', gap: 20 }}>
<Login onLogin={setUser} />
<Signup onSignup={setUser} />
</div>
) : (
<Dashboard user={user} onLogout={() => { setUser(null); localStorage.removeItem('token'); }} />
)}
</div>
);
}