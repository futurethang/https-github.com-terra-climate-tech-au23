import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getClient } from '~/lib/sanity.client'
import { projectsQuery, type Project } from '~/lib/sanity.queries'
import Container from '~/components/Container'

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const client = getClient()
      const data = await client.fetch(projectsQuery)
      setProjects(data)
    }

    fetchProjects()
  }, [])

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-header">Projects</h1>
        <a
          href="studio/structure/project"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cta-button">+ Create New Project</button>
        </a>
      </div>
      <ul>
        {projects.map((project) => (
          <li className="project-title" key={project._id}>
            <Link href={`/project/${project.slug.current}`}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default ProjectsPage
