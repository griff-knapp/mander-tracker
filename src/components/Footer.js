import { AppBar, Container, Toolbar } from "@mui/material";

export function Footer() {
    return (
        <AppBar 
          
        >
            <Container maxWidth={false} sx={{ overflow: 'hidden' }}>
                <Toolbar disableGutters />
            </Container>
        </AppBar>
        
    )
}