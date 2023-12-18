import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ProjectCard from "../project/ProjectCard";

import styles from './Projects.module.css'
import { toast } from "react-toastify";

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    console.log('project message', projectMessage)
    
    const location = useLocation()
    const message = location.state?.message

    useEffect(() => {
        setTimeout(() => {
            //busco os projetos na API, colocamos alguns parâmetros
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            //pegamos os dados com o then e transformamos a resposta em json
            .then(resp => resp.json())
            //pegamos os dados em json e transformamos ele, vamos setar os projetos por meio da API
            .then(data => {
                // console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            //para o caso de dar erro e conseguir debugar a aplicação depois
            .catch((err) => console.log(err))
        }, 500)
    }, []) //tô controlando um array vazio que será preenchido depois da função acima

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            toast.success('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }
    
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
            </div>
            <LinkButton to="/newproject" text="Criar novo projeto" />
            {message && <Message  type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="center">
                {/* se eu tenho projetos (length maior que 0) vou prosseguir (true), 
                fazemos um map em cima desses projetos e transformamos os dados em um project,
                como estamos retornando um objeto precisa dos (), aqui fica o loop */}
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id} 
                            handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading />}
            </Container>
        </div>
    )
}