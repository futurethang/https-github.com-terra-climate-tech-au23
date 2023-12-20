import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const projectsQuery = groq`*[_type == "project"] | order(creationDate desc)`

export async function getProjects(client: SanityClient): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}

// ... (existing imports and code)

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug]{
      ...,
      owner->{
        name,
        email,
      },
    }[0]`

export async function getProject(
  client: SanityClient,
  slug: string,
): Promise<Project> {
  return await client.fetch(projectBySlugQuery, {
    slug,
  })
}

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`

// ... (rest of your existing code)

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}

export interface Project {
  _type: 'project'
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug // Added slug field
  owner: User
  body: PortableTextBlock[] // Changed from description to body
  links: { _key: string; _type: 'url'; href: string }[]
  images: ImageAsset[]
  mainImage?: ImageAsset
  status: string
  updates: Update[]
  creationDate: string
  lastUpdated: string
}

export interface User {
  _type: 'user'
  _id: string
  _createdAt: string
  name: string
  email: string
  bio: string
  profileImage: ImageAsset
}

export interface Update {
  _type: 'update'
  _id: string
  _createdAt: string
  title: string
  content: PortableTextBlock[]
  datePosted: string
}
