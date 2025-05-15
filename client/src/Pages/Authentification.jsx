import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../auth";
import { signin, signup } from "../api";

const theme = createTheme();

export default function SignUp() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignup] = useState(false);

  const { setAuthTokens } = useAuth();
  const history = useNavigate();

  const signIn = async (data) => {
    const response = await signin(data);
    if (response.status === 200) {
      setAuthTokens(response.data);

      history("/");
      window.location.reload(true);
    } else {
      console.log(response.message);
    }
  };

  const signUp = async (data) => {
    const response = await signup(data);
    if (response.status === 201) {
      setAuthTokens(response.data);

      history("/");
      window.location.reload(true);
    } else {
      console.log(response.message);
    }
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const handlechange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      signUp(form);
    } else {
      signIn(form);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign up" : "Sign in"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  {" "}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handlechange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={handlechange}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handlechange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlechange}
                />
              </Grid>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm password"
                    label="Repeat Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlechange}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
