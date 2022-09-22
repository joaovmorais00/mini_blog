// import styles from "./LogIn.module.css";

import { Button, Box, Grid, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading, error: authError } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const user = {
      email,
      password,
    };
    await login(user);
    // console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <Grid
      sx={{ marginTop: "3rem" }}
      container
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3">Login</Typography>
      </Grid>
      <Grid item>
        <Typography style={{ marginBottom: "2rem" }}>
          Faça o Login e compartilhe suas histórias!
        </Typography>
      </Grid>

      <Grid
        sx={{ marginTop: "rem" }}
        item
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <form style={{ width: "400px" }} onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              alignItems="center"
              rowSpacing={2}
              sx={{ width: "100%" }}
            >
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label="E-mail:"
                  variant="standard"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Senha:"
                  variant="standard"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         onClick={() => setShowPass(!showPass)}
                  //         onMouseDown={(event) => event.preventDefault()}
                  //       >
                  //         {showPass ? <VisibilityOff /> : <Visibility />}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Grid>

              <Grid
                item
                sx={{
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                {!loading ? (
                  <Button variant="contained" type="submit">
                    Entrar
                  </Button>
                ) : (
                  <Button variant="contained" disabled type="submit">
                    Aguarde...
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Grid>

        {error && (
          <Grid item>
            <Box
              sx={{
                textAlign: "center",
                marginTop: "1rem",
                backgroundColor: "rgba(255, 0,0, 0.3)",
                color: "black",
                borderRadius: "1rem",
                padding: "3rem",
              }}
            >
              <Typography variant="h6">{error}</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default LogIn;
