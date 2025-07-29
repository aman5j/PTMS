import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  paper: {
    padding: theme.spacing(5),            // now theme.spacing works ✅
    borderRadius: 20,
    maxWidth: 480,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    letterSpacing: 1,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  textField: {
    background: "#f7faff",
    borderRadius: 8,
  },
  signUpButton: {
    borderRadius: 12,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1.1rem",
    background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(78,84,200,0.10)",
    "&:hover": {
      background: "linear-gradient(90deg, #8f94fb 0%, #4e54c8 100%)",
    },
  },
  loginText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  loginButton: {
    textTransform: "none",
    fontWeight: 700,
    padding: 0,
    minWidth: 0,
    fontSize: "1rem",
  },
}));
