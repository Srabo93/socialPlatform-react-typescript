import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import ContainerWrapper from "../UI/ContainerWrapper";
import LoadingCircle from "../UI/LoadingCircle";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const repeatPasswordHandler = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const trimPW = password.trim();
    const trimrepeatPW = repeatPassword.trim();

    if (isLogin) {
      try {
        setIsLoading(true);
        await login(email, trimPW);
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        const errorMessage = await error.message;
        setErrorMessage(errorMessage);
      }
    } else if (
      trimPW !== trimrepeatPW ||
      trimPW === "" ||
      trimrepeatPW === ""
    ) {
      setErrorMessage("Your Passwords do not match!");
    } else {
      try {
        setIsLoading(true);
        setErrorMessage("");
        await signup(email, trimPW);
        navigate("/profile");
      } catch (error) {
        const errorMessage = await error.message;
        setErrorMessage(errorMessage);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <ContainerWrapper>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            {isLoading && <LoadingCircle />}
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={emailHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordHandler}
              />
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="repeat_password"
                  label="Repeat Password"
                  type="password"
                  id="repeat_password"
                  onChange={repeatPasswordHandler}
                />
              )}
              {errorMessage && (
                <Alert variant="outline" severity="error">
                  {errorMessage}
                </Alert>
              )}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Grid container>
                <Grid item xs sx={{ mb: 2 }}>
                  <Link
                    href="#"
                    onClick={() => navigate("/forgot-password")}
                    variant="body3"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body3"
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin ? "Don't have an account? Sign Up!" : "Login!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default Login;
