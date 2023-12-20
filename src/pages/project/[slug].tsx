import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getProject,
  type Project,
  projectBySlugQuery,
  projectSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import portableTextSerializers from '~/portableTextSerializer'

interface Query {
  [key: string]: string
}

// export const getStaticProps: GetStaticProps<
//   SharedPageProps & {
//     project: Project
//   },
//   Query
// > = async ({ draftMode = false, params = {} }) => {
//   const client = getClient(draftMode ? { token: readToken } : undefined)
//   const project = await getProject(client, params.slug)

//   if (!project) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       draftMode,
//       token: draftMode ? readToken : '',
//       project,
//     },
//   }
// }

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [project] = useLiveQuery(props.project, projectBySlugQuery, {
    slug: props.project.slug.current,
  })

  console.log('project', project)

  return (
    <Container>
      <Link href={'/projects'}>
        <button className="back-button mb-8">Back</button>
      </Link>
      <section className="project">
        {project.mainImage && (
          <Image
            className="project__cover"
            src={urlForImage(project.mainImage).url()}
            height={231}
            width={367}
            alt={project.title}
          />
        )}
        <div className="project__container">
          <h1 className="project-title text-3xl mb-4">{project.title}</h1>
          <h2>{project.owner.name}</h2>
          <h2>{project.owner.email}</h2>
          <div className="project__content pt-4">
            <PortableText
              value={project.body}
              components={portableTextSerializers}
            />
          </div>
          <p className="project__date">{formatDate(project._createdAt)}</p>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(projectSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/project/${slug}`) || [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient()
  const slug = params?.slug
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    return { notFound: true }
  }

  return { props: { project } }
}
