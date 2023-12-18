import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

export default function NewProject() {
    const navigate = useNavigate()

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        axios.post('http://localhost:5000/projects', project)
            .then(({ status }) => {
                console.log(status)
                //redirect
                navigate('/projects')
                toast.success('Projeto criado com sucesso!')
            })
            .catch((err) => toast.error('Não foi possível criar o projeto: ' + err.message))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}