import { useRef, useState, useEffect } from 'react';
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
import PageWrapper from 'src/layout/page-wrapper';
import { useParams } from "react-router-dom";
import { axiosInstance } from 'src/axiosApi';
import { indigo } from '@mui/material/colors';


export default function ProjectDetailEdit() {

    const { slug }: {slug: string} = useParams();

    // Form to submit
    const [ form, setForm ]: any = useState({});

    // Image uploaded
    const [ image, setImage ]: any = useState(null);

    // Article retrieved from database
    const [ project, setProject]: any = useState({});

    const theme: Theme = useTheme();

    const editorRef = useRef(null);

    const getProject = () => {
        axiosInstance
            .get(`/projects/${slug}`)
            .then( res => {
                console.log( res );
                console.log( res.data );
                setProject( res.data );
            })
            .catch( err => console.log(err.request) );
    }

    useEffect( () => {
        axiosInstance
            .get(`/projects/${slug}`)
            .then( res => {
                setProject( res.data );
                // console.log( res.data );
            })
            .catch( err => console.log(err.request) );
    }, [slug])

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
        setProject({...project, published: undefined })
    }

    const handleSubmit = () => {

        console.log('Form:')
        console.log(form)
        const config = { headers: {'Content-Type': 'multipart/form-data' }}
        let formData = new FormData();
        if (form.title) { formData.append('title', form.title) };
        if (form.slug) { formData.append('slug', form.slug); };
        if (form.link) { formData.append('link', form.link) };
        if (form.description) { formData.append('description', form.description); };
        if (form.hasOwnProperty('published')) { formData.append('published', form.published); };
        if (image !== null) { formData.append('image', image, image.name); };

        axiosInstance
            .patch(`/projects/${slug}/`, formData, config)
            .then( res => {
                getProject();
            })
            .catch( err => console.log(err))
    }

    const formFieldStyles = {
        color: theme.palette.mode === 'dark' ? indigo[100] : indigo[800],
        bgcolor: theme.palette.mode === 'dark' ? indigo[800] : indigo[100],
        border: '5px solid black',
        borderColor: theme.palette.mode === 'dark' ? indigo[900] : indigo[300],
        pl: 1,
    }


    return (
        <PageWrapper
            styling={{}}
        >
            <Grid
                container
                rowSpacing={4}
                sx={{
                    py: 10,
                    px: 20
                }}
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
                            value={form.title ? form.title : (project && project.title) || ''}
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
                            placeholder='Link...'
                            autoFocus
                            sx={formFieldStyles}
                            value={form.link ? form.link : (project && project.link) || ''}
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
                        // @ts-ignore: Type 'Editor' is not assignable to type 'null'.<Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey="xml55fdjmkrdq1yhz0j07so76ypn9oxz2juz6hwniq0geahd"
                        initialValue={(project && project.description) || ''}
                        onEditorChange={ handleEditor }
                        init={{
                            skin: theme.palette.mode === 'dark' ? "oxide-dark" : '',   // Doesn't work ?
                            content_css: theme.palette.mode === 'dark' ? "dark" : '',  // Also doesn't work ?
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
                        <Grid
                            container
                            columnSpacing={6}
                        >
                            <Grid
                                item xs={8}
                                sx={{overflow: 'hidden'}}
                            >
                                <label
                                    htmlFor='project-image'
                                    style={{fontSize: 18}}    
                                >
                                    Image Location:<br></br>
                                    {project && project.image}
                                </label>
                                <Input
                                    id="project-image"
                                    aria-describedby="project-image"
                                    type='file'
                                    sx={{fontSize: 18}}
                                    // @ts-ignore: Property 'files' does not exist on type 'EventTarget
                                    onChange={ e => setImage( e.target.files[0] ) }
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <img
                                    alt={form.image ? form.image : ((project && project.image) || '')}
                                    src={image ? URL.createObjectURL(image) : ((project && project.image) || '')}
                                    width={150}
                                />
                            </Grid>
                        </Grid>
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
                                    checked={ project.published || !!form.published }
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
                        mt: 5
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
                            Submit Project
                    </Button>
                </Grid>
            
            </Grid>
        </PageWrapper>
    );
}