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


export default function BlogDetailCreate() {

    const [ form, setForm ]: any = useState({});

    const [image, setImage]: any = useState(null);

    const theme: Theme = useTheme();

    let history = useHistory();

    const editorRef = useRef(null);

    const handleEditor = () => {
        if (editorRef.current) {
          // @ts-ignore: Object is possibly 'null'.
          setForm({...form, content: editorRef.current.getContent()})
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
          setForm({...form, content: editorRef.current.getContent()})
        }
        console.log(form)

        const config = { headers: {'Content-Type': 'multipart/form-data' }}
        let formData = new FormData();
        if (form.title) { formData.append('title', form.title) };
        if (form.slug) { formData.append('slug', form.slug); };
        if (form.content) { formData.append('content', form.content); };
        if (form.hasOwnProperty('published')) { formData.append('published', form.published); };
        if (image !== null) { formData.append('image', image, image.name); };


        axiosInstance
            .post('/articles/', formData, config)
            .then( res => {
                console.log( res )
                history.push(`/blog/detail/${form.slug}`);
            })
            .catch( err => {
                console.log( err.request )
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
                                id="article-title"
                                aria-describedby="article-title"
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

                {/* Editor */}
                <Grid
                    item
                    xs={12}
                >
                    <Editor
                        // @ts-ignore: Type 'Editor' is not assignable to type 'null'.
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey="xml55fdjmkrdq1yhz0j07so76ypn9oxz2juz6hwniq0geahd"
                        initialValue="<p>Test content.</p>"
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
                        <Input
                            id="article-image"
                            aria-describedby="article-image"
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={ handleCheckbox }
                            /> 
                        }
                        label="Publish"
                    />
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