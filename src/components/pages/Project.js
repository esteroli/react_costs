import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

export default function Project() {
    const { id } = useParams()
    console.log(id)

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:5000/projects/${id}`)
                .then(({ data }) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(({ message }) =>
                    toast.error(`Não foi possível encontrar o projeto selecionado: ${message}`))
        }, 500)
    }, [id])

    function editPost(project) {
        //budget validation
        if (project.budget < project.cost) {
            toast.error('O orçamento não pode ser menor do que o custo do projeto!')
            return false
        }

        axios.patch(`http://localhost:5000/projects/${project.id}`, project)
            .then(({ data }) => {
                setProject(data)
                setShowProjectForm(false)
                toast.success('Projeto atualizado com sucesso!')
            })
            .catch(err =>
                toast.error(`Não foi possível atualizar o projeto: ${err.message}`)
            )
    }

    function createService() {
        //último serviço
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validação de valor máximo
        if (newCost > parseFloat(project.budget)) {
            toast.error('Orçamento ultrapassado, verifique o valor do serviço.')
            project.services.pop()
            return false
        } toast.success('Serviço adicionado com sucesso!')

        //adicionar o custo do serviço ao projeto
        project.cost = newCost

        //atualizar o projeto
        axios.patch(`http://localhost:5000/projects/${project.id}`, project)
            .then(({ data }) => {
                setShowServiceForm(false)
                toast.success('Projeto atualizado com sucesso!')
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        axios.patch(`http://localhost:5000/projects/${projectUpdated.id}`, projectUpdated)
            .then(({ data }) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                toast.success('Serviço removido com sucesso!')
            })
            .catch(err =>
                toast.error(`Não foi possível remover o serviço: ${err.message}`)
            )
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <div className={styles.project_date}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                                </button>
                            </div>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <div className={styles.project_date}>
                                <h2>Adicione um serviço:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                                </button>
                            </div>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Serviços</h2>
                            <div className={styles.services_card}>
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.key}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading className={styles.loader_container}/>
            )}
        </>
    )
}