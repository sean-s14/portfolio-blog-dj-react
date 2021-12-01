// import { useState } from 'react';
import {
    Container,
    Typography,
} from '@mui/material';
import PageWrapper from "src/layout/page-wrapper";
// import { indigo } from '@mui/material/colors';
import ContactForm from 'src/components/contact-form'


export default function ContactPage() {

    return (
        <PageWrapper styling={{}}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <Typography sx={{mb:10, fontSize: 30}}>What can I do for you?</Typography>
                <ContactForm />
            </Container>
        </PageWrapper>
    );
}