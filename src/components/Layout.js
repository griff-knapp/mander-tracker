import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout(props) {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Container maxWidth={false} disableGutters sx={{ overflowY: 'hidden' }}>
                {props.children}
            </Container>
            <Footer />
        </>
    )
}