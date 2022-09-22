// import styles from "./Register.module.css";

import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Box } from "@mui/system";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuth();

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPassError("");
    setError("");
    const user = {
      name,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setPassError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(user);

    if (res) reset();

    // console.log(user, res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h3">Cadastre-se para postar</Typography>
      </Grid>
      <Grid item>
        <Typography style={{ marginBottom: "2rem" }}>
          Crie seu usuário e compartilhe sua histórias!
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={{ width: "400px", padding: 0 }}
      >
        <Grid item sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              rowSpacing={2}
            >
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Nome:"
                  variant="standard"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>

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
                  //     <InputAdornment>
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

              <Grid item sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Confirmar senha:"
                  variant="standard"
                  type="password"
                  required
                  error={passError ? true : false}
                  helperText={passError}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment>
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         onClick={() => setShowConfirmPass(!showConfirmPass)}
                  //         onMouseDown={(event) => event.preventDefault()}
                  //       >
                  //         {showConfirmPass ? <VisibilityOff /> : <Visibility />}
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
                    Cadastrar
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

export default Register;
