// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './layout/navbar.jsx'
import Task from "./tasks/index"
import User from "./users/index"
import CreateUser from './users/createUser.jsx';
import CreateTask from './tasks/createTask.jsx';
import LoginPage from './users/login.jsx';
import EditTask from './tasks/editTask.jsx';

function Dashboard() {
  return (
    <Box className="content">
      {
      sessionStorage.getItem('username')?
      <div>
      <Navbar />
      <main  className='main'>
      <Routes>
      <Route path="/" element={<User />} />
      <Route path="/tasks" element={<Task />} />
      <Route path="/users" element={<User />} />

      {sessionStorage.getItem('role')==='admin'?<>
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/tasks/edit/:id" element={< EditTask />} /> 
          
      <Route path="/create-task" element={<CreateTask />} />
      </> :''
      }
    </Routes>
    </main>
    </div>
        : <LoginPage />}

    </Box>
  );
}

export default Dashboard;
