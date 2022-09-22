import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import { useAuthValue } from "../../context/AuthContext";

import styles from "./NavBar.module.css";
import { Grid } from "@mui/material";

const navItems = [
  { name: "Home", path: "/", auth: "both" },
  { name: "Entrar", path: "/login", auth: "false" },
  { name: "Cadastrar", path: "/register", auth: "false" },

  { name: "Novo Post", path: "/posts/create", auth: "true" },
  { name: "Dashboard", path: "/dashboard", auth: "true" },
  { name: "Sobre", path: "/about", auth: "both" },
];

const NavBar = () => {
  const { user } = useAuthValue();

  const { logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <AppBar component="nav" color="secondary">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item md={2}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontFamily: "Montserrat, sans-serif !important",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                mini <span style={{ fontWeight: "600" }}>BLOG</span>
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Grid
                container
                columnSpacing={4}
                sx={{ padding: 0 }}
                justifyContent="end"
              >
                {navItems.map(
                  (item, index) => {
                    if (
                      (!user && item.auth !== "true") ||
                      (user && item.auth !== "false")
                    ) {
                      return (
                        <Grid
                          className={styles.menu}
                          item
                          key={index}
                          sx={{
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          <Button sx={{ padding: 0, borderRadius: 0 }}>
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? styles.active : ""
                              }
                              style={{
                                width: "100%",
                                padding: "0.1rem 0.5rem",
                              }}
                              to={item.path}
                            >
                              {item.name}
                            </NavLink>
                          </Button>
                        </Grid>
                      );
                    }
                  }
                  // <Button key={index} sx={{ color: "#000" }}>
                  //   <NavLink key={index} sx={{ color: "#000" }} to={item.path} />
                  //   {item.name}
                  // </Button>
                )}
                {user && (
                  <Grid
                    className={styles.menu}
                    item
                    sx={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Button
                      sx={{ padding: "0.1rem 0.5rem", borderRadius: 0 }}
                      onClick={logout}
                    >
                      Sair
                    </Button>
                  </Grid>
                )}
                {/* {12 /
                  (navItems.filter((item) => user && item.auth !== "false")
                    .length +
                    1)} 
                    
                    xs={
                            !user && item.auth !== "true"
                              ? Math.floor(
                                  12 /
                                    navItems.filter(
                                      (item) => !user && item.auth !== "true"
                                    ).length
                                )
                              : Math.floor(
                                  12 /
                                    navItems.filter(
                                      (item) => user && item.auth !== "false"
                                    ).length +
                                    1
                                )
                          }
                    */}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
