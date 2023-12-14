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
      <h1>Projects</h1>
      <a
        href="YOUR_SANITY_STUDIO_URL/structure/project"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Create New Project</button>
      </a>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
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
