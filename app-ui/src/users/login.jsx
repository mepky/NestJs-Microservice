// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { Box } from '@mui/material';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const addUserDetailsInSession = async(item) =>{
//     sessionStorage.clear()
//     sessionStorage.setItem('username',item.username)
//     sessionStorage.setItem('email',item.email)
//     sessionStorage.setItem('role',item.role)
//     sessionStorage.setItem('id',item.id)

//     setTimeout(() => {
//       document.location.reload(); // This line triggers the page reload after 2 seconds
//    }, 2000);
  
//   }

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async(event) => {
//     // event.preventDefault();
//     // Your login logic here
//     try {
      
//       const response = await axios.get(process.env.REACT_APP_API_URL+'login', {params: {
//         "email": email
//       }});     
//       if (response.status === 200){
//         if(response.data){
//           // navigate(`/${route}`); // Navigate to the specified route
//             addUserDetailsInSession(response.data)
            
//             // document.location.reload()
//           navigate('/users', {replace:true})

//         console.log("logged in")


//         }
//         else{
//           alert("Email doesn't exists !")
//         }
//         // alert("User log !")
//       }
//       // Add any additional logic upon successful user creation
//       // return response.data; // If you want to return the created user data
//     } catch (error) {
//       console.error('Error login user', error);
//       alert(error.response.data.message)
//       // Add error handling logic here
//       // throw error; // Throw the error if you want to handle it outside of this function
//       return 
//     }

//   };

//   return (
//     <Box sx={{display:"flex", justifyContent:"center",alignContent:"center", alignItems:"center", height:"100%", width:"100%"}}>
//       <form onSubmit={handleSubmit}>
//         <Box sx={{display:'flex', flexDirection:"column", width:"100%"}}>

//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           required
//           sx={{width:"100%"}}
//         />
        
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           size='small'
//           sx={{width:"1rem", marginTop:"0.8em"}}
//         >
//           Login
//         </Button>
//         </Box>

//       </form>
//     </Box>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Route , Redirect} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API request for user login
      const response = await axios.get(process.env.REACT_APP_API_URL + 'login', {
        params: { email: email }
      });

      if (response.data) {
        addUserDetailsInSession(response.data);
        setLoggedIn(true)
        // return <Navigate to="/users" />
        // navigate('/users'); // Use navigate for redirection
      } else {
        alert("Email doesn't exists!");
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert("User doesn't exits !");
    }
  };

  const addUserDetailsInSession = (item) => {
    sessionStorage.clear();
    sessionStorage.setItem('username', item.username);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('role', item.role);
    sessionStorage.setItem('id', item.id);
  };
  if (loggedIn) {
    if(window && window.location){
      window.location.reload()

    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size='small'
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
