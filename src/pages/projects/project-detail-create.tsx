import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
    Grid,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    Checkbox,

    Theme, useTheme
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import PageWrapper from 'src/layout/page-wrapper';
import { axiosInstance } from 'src/axiosApi';
import { useHistory } from "react-router-dom";
// import ImageUploader from "react-images-upload";


export default function ProjectDetailCreate() {

    const [ form, setForm ]: any = useState({});

    const [image, setImage]: any = useState(null);

    const theme: Theme = useTheme();

    let history = useHistory();

    const editorRef = useRef(null);

    const handleEditor = () => {
        if (editorRef.current) {
          // @ts-ignore: Object is possibly 'null'.
          setForm({...form, description: editorRef.current.getContent()})
        }
    }

    const handleCheckbox = (e) => {
        if ( form.hasOwnProperty('published') ) {
            setForm({...form, published: !form.published });
        } else {
            setForm({...form, published: e.target.checked });
        }
    }
    
    const handleSubmit = () => {
        if (editorRef.current) {
          // @ts-ignore: Object is possibly 'null'.
          setForm({...form, description: editorRef.current.getContent()})
        }

        console.log(form)

        const config = { headers: {'Content-Type': 'multipart/form-data' }}
        let formData = new FormData();
        if (form.title) { formData.append('title', form.title) };
        if (form.slug) { formData.append('slug', form.slug); };
        if (form.link) { formData.append('link', form.link); };
        if (form.description) { formData.append('description', form.description); };
        if (form.hasOwnProperty('published')) { formData.append('published', form.published); };
        if (image !== null) { formData.append('image', image, image.name); };


        axiosInstance
            .post('/projects/', formData, config)
            .then( res => {
                console.log( res );
                history.push(`/projects/all`);
            })
            .catch( err => {
                console.log( err );
                console.log( err.request );
            })

    };

    const formFieldStyles = {
        color: theme.palette.mode === 'dark' ? indigo[100] : indigo[800],
        bgcolor: theme.palette.mode === 'dark' ? indigo[800] : indigo[100],
        border: '5px solid black',
        borderColor: theme.palette.mode === 'dark' ? indigo[900] : indigo[300],
        pl: 1,
    }

    return (
        <PageWrapper
            styling={{
            }}
        >
            <Grid
                container
                sx={{
                    py: 10,
                    px: 20
                }}
                rowSpacing={4}
            >

                {/* Title */}
                <Grid
                    item
                    xs={12}

                >
                    <FormControl fullWidth>
                            <Input
                                id="project-title"
                                aria-describedby="project-title"
                                type='text'
                                placeholder='title...'
                                autoFocus
                                sx={formFieldStyles}
                                onChange={ e => setForm({
                                    ...form,
                                    title: e.target.value,
                                    slug: e.target.value.toLowerCase().split(' ').join('-')
                                }) }
                            />
                    </FormControl>
                </Grid>

                {/* Link */}
                <Grid
                    item
                    xs={12}
                >
                    <FormControl fullWidth>
                        <Input
                            id="project-link"
                            aria-describedby="project-link"
                            type='text'
                            placeholder='link...'
                            autoFocus
                            sx={formFieldStyles}
                            value={form.link ? form.link : ''}
                            onChange={ e => setForm({...form, link: e.target.value}) }
                        />
                    </FormControl>
                </Grid>

                {/* Editor */}
                <Grid
                    item
                    xs={12}
                >
                    <Editor
                        // @ts-ignore: Type 'Editor' is not assignable to type 'null'.
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>Test content.</p>"
                        onEditorChange={ handleEditor }
                        init={{
                            skin: theme.palette.mode === 'dark' ? "oxide-dark" : 'default',   // Doesn't work ?
                            content_css: theme.palette.mode === 'dark' ? "dark" : 'default',  // Also doesn't work ?
                            height: 350,
                            width: 'auto',
                            // menubar: false,
                            menubar: 'favs file edit view insert format tools table help',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'preview code undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Grid>

                {/* Image */}
                <Grid
                    item
                    xs={12}

                >
                    <FormControl fullWidth>
                        <Input
                            id="project-image"
                            aria-describedby="project-image"
                            type='file'
                            // sx={formFieldStyles}
                            // @ts-ignore: Property 'files' does not exist on type 'EventTarget
                            onChange={ e => setImage( e.target.files[0] ) }
                        />
                    </FormControl>
                </Grid>
                
                {/* Published */}
                <Grid
                    item
                    xs={12}

                >
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={ handleCheckbox }
                                /> 
                            }
                            label="Publish"
                        />
                    </FormControl>
                </Grid>
                
                {/* Submit Button */}
                <Grid
                    item
                    xs={12}
                    sx={{
                        textAlign: 'center',
                        // mt: 5
                    }}
                >
                    <Button
                        onClick={ handleSubmit }
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'fontWeightRegular',
                            color: 'text.primary',
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                bgcolor: 'primary.main'
                            },
                            width: '10rem'
                        }}
                    >
                            Submit Post
                    </Button>
                </Grid>
            </Grid>
        </PageWrapper>
    );
}