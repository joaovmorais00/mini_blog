import { Typography } from "@mui/material";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="h6">
        Treinando sobre ReactJS e Material UI!!!
      </Typography>
      <Typography>Mini Blog por João Vitor Morais &copy;2022</Typography>
    </footer>
  );
};

export default Footer;
