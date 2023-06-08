import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserStorageService } from "../../services/browser_storage_service";
import { useState } from 'react';
import * as yup from "yup";
import { useForm , SubmitHandler} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";


type Inputs = {
    username: string;
    password: string;
  };
  
  const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
  });

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function mimicBackendSignInAPI(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      return {
        userDetails: { username, role: "admin" },
        statusCode: 200,
      };
    } else if (['user1', 'user2', 'user3', 'user4', 'user5'].includes(username) && password === "user") {
      return {
        userDetails: { username, role: "user" },
        statusCode: 200,
      };
    } else {
      return {
        userDetails: { username, role: "admin" },
        statusCode: 401,
      };
    }
  }


export default function Login() {
    const navigate = useNavigate();

    const [loginIssues, setLoginIssues] = useState<any[]>([]);
    const { register, handleSubmit, reset } = useForm<Inputs>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const authDetails = mimicBackendSignInAPI(data.username, data.password);
        if (authDetails.statusCode === 200 ) {
          //  set username and role to localstorage
            BrowserStorageService.put("username", authDetails.userDetails?.username);
            BrowserStorageService.put("role", authDetails.userDetails?.role);
            navigate("/meetingBoard", { replace: true });
        } else if (authDetails.statusCode === 401) {
            setLoginIssues([
            ...loginIssues,
            { statusCode: authDetails.statusCode || 401 },
            ]);
        }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              {...register("username")}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}