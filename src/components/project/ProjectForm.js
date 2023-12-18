import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'axios'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'
import InputMoney from '../form/InputMoney'

export default function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(({ data }) => {
                setCategories(data)
            })
            .catch(({ message }) =>
                toast.error(`Erro ao obter categorias: ${message}`))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log(project)
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <InputMoney
                type="number"
                text="Orçamento do projeto"
                name="budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}