import React, { useEffect, useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Container, CssBaseline, MenuItem  } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {ReactComponent as EtherLogo} from '../../assets/icons/ether.svg'


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Make-a-Difference
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }



const theme = createTheme();

const SignUp = () => {


    const [values, setValues] = useState({
        username: '',
        gender: 'male',
        email: '',
        password: '',
        age: '',
        phone: '',
        profession: ''
      })

      const [emailerror, setEmailError] = useState(false);
      const [passworderror, setPasswordError] = useState(false);
      const [signuperror, setSignupError] = useState(false);
    
      const { username, gender, email, password, age, phone, profession} = values;
     
    
      const handleChange = (event) => {
        setValues({
          ...values,
          [event.currentTarget.id]: event.currentTarget.value,
        });
    
        setSignupError(false);
    
    
        if (event.currentTarget.id === "email") {
          setEmailError(
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              event.currentTarget.value
            )
          );
        }
    
        if (event.currentTarget.id === "password") {
          var strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          );
          setPasswordError(!strongRegex.test(event.target.value));
        }
      }

 
      const handleGenderChange = (event) => {
        setValues({...values, gender:event.target.value});
      }
    
      const genderoptions = [
        {
          value: 'male',
          label: 'male',
        },
        {
          value: 'female',
          label: 'female'
        },
        {
          value: 'other',
          label: 'other'
        }
    
      ];

  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Grid container component="main" sx={{ height: '100vh', width: '100%' }}>
      
      <Grid item xs={12} sm={8} md={7}>
        <Box
            sx={{
                marginTop: '125px',
                marginLeft: '100px'
            }}
        >
            <EtherLogo/>
        </Box>
      </Grid>
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                error={emailerror || signuperror}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChange}
                value={email}
                name="email"
                helperText={
                emailerror ? values.email.length ? "Invalid Email Id" : "Email is required" : null
                }
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                type="text"
                value={username}
                fullWidth
                margin="normal"
                id="username"
                label="Username"
                name="username"
                onChange={handleChange}
                autoFocus
                required
              />

            <TextField 
                  id="gender"
                  select
                  name="gender"
                  label="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  helperText="Please select your gender"
                  variant="outlined"
              >
                {
                  genderoptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </TextField>

              <TextField
                variant="outlined"
                type="number"
                value={age}
                margin="normal"
                id="age"
                label="age"
                name="age"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onChange={handleChange}
                autoFocus
                required
              />

              <TextField
                variant="outlined"
                type="text"
                value={profession}
                fullWidth
                margin="normal"
                id="profession"
                label="profession"
                name="profession"
                onChange={handleChange}
                autoFocus
                required
              />


            <TextField
                variant="outlined"
                type="text"
                value={phone}
                fullWidth
                margin="normal"
                id="phone"
                label="phone"
                name="phone"
                onChange={handleChange}
                autoFocus
                required
              />

            <TextField
                variant="outlined"
                margin="normal"
                error={passworderror}
                required
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange}
                type="password"
                id="password"
                helperText={
                    passworderror ? values.password.length ? "Password must be atleast 8 characters with 1 small letter, capital letter, number and symbol" : "Password is required" : null
                }
                autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  //</ThemeProvider>

  );
}

export default SignUp;