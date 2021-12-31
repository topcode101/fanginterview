import { useSession, signIn, signOut } from "next-auth/react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header({ }) {
    const { data: session } = useSession()
    return (
        <AppBar position="static" style={
            {
              boxShadow: '0 4px 12px 0 rgb(0 0 0 / 5%)'
            }
          }>
            <Toolbar>
              {/* <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Cracking Data Science Interview
              </Typography>
              {
                session ? (<>
                  Signed in as {session.user.email} <br />
                  <Button color="inherit" onClick={() => signOut()}>Sign out</Button>
                </>) : (
                  <Button color="inherit" onClick={() => signIn()}>Login</Button>
                )
              }
              
            </Toolbar>
        </AppBar>
    )
  }