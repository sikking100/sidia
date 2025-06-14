import React, { useRef } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Menu } from '@/Interface/Interface'
import Button, { BackButton } from '@/Components/Button'
import { useForm } from '@inertiajs/inertia-react'

import route from 'ziggy-js'
import { Editor } from '@tinymce/tinymce-react';




interface Props {
    menu: Menu
}

export default function PersyaratanShow({ menu }: Props) {
    const { data, errors, setData, patch, progress } = useForm<Menu>(
        {
            id: menu.id,
            id_citigov: menu.id_citigov,
            name: menu.name,
            name_citigov: menu.name_citigov,
            description: menu.description,
        }
    )

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(data.description);

        patch(route('menu.update', menu))
        return
    }

    const editorRef = useRef<any>(null);


    return (
        <Authenticated
            header={<h2>Persyaratan</h2>}
        >
            <div className={'mx-6'}>
                {menu.name}
                <form onSubmit={handleSubmit} className='mt-6'>
                    <BackButton
                        route={'menu'}
                    />
                    {/* <Label forInput={'persyaratan'} value={'Persyaratan tambahan'} className={'pb-2'} required={false} /> */}
                    {/* <textarea
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className={'w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'}
                        rows={5}
                    >
                    </textarea> */}
                    <Editor
                        onInit={(_: any, editor: any) => editorRef.current = editor}
                        // initialValue={data.description}
                        value={data.description}
                        apiKey='w5gb3ckudqrmm81mxsnsfh9699w33ctj0o0kcslp3scywmer'
                        textareaName='description'
                        onEditorChange={(e) => setData('description', e)}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic underline | alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    <Button type='submit' processing={false} className={'mt-2'}>Perbaharui</Button>
                </form>
            </div>
        </Authenticated>
    )
}
