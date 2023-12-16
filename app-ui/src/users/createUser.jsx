import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel,Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateUser = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('default');
  const navigate = useNavigate();

  // const handleCreateUser = () => {
  //   // Add logic to create user here
  // };

const addUserDetailsInSession = async(item) =>{
  sessionStorage.clear()
  sessionStorage.setItem('username',item.username)
  sessionStorage.setItem('email',item.email)
  sessionStorage.setItem('role',item.role)
  sessionStorage.setItem('id',item.id)

}

  const handleCreateUser = async () => {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)===false) {
    alert("Invalid Email Format !")
    return 
    }

    if (!username || !email || !role) {
      alert('Please provide username, email, and role'); // Throw an error if any field is missing
      return
    }
  
    const userData = {
      username: username,
      email: email,
      role: role,
      createdBy : sessionStorage.getItem("email")
    };
  
    try {
      // http://localhost:8000/users
      const response = await axios.post(process.env.REACT_APP_API_URL+'create-user', userData);
      if (response.status === 201){
        // addUserDetailsInSession(response.data)
        alert("User created !")
        navigate('/users',{replace:true})
        return 
      }

      // Add any additional logic upon successful user creation
      // return response.data; // If you want to return the created user data
    } catch (error) {
      console.error('Error creating user', error);
      // alert(error.response.data.message)
      alert("Email already exists !")
      console.log("error ", error)
      // Add error handling logic here
      // throw error; // Throw the error if you want to handle it outside of this function
      return 
    }
  };


  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  



  return (
    <Box >
    <Button
    variant="text"
    startIcon={<ArrowBackIcon />}
    onClick={handleGoBack}
  >
    Back
  </Button>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '350px', margin: 'auto' }}>
      <TextField 
        label="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <TextField 
        label="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleCreateUser}>Create</Button>
    </form>
    </Box>

  );
};

export default CreateUser;
