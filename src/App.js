import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <Typography>Carregando</Typography>;
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#fff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Box sx={{ display: "flex", width: "100%" }}>
              <NavBar />
              <Box
                component="main"
                sx={{ width: "100%", marginBottom: "10em", padding: "1.2em" }}
              >
                <Toolbar />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/register"
                    element={!user ? <Register /> : <Navigate to="/" />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="posts/createpost"
                    element={user ? <CreatePost /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/" />}
                  />
                </Routes>
              </Box>

              <Footer />
            </Box>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
