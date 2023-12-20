import Image from 'next/image'
import urlFor from './cms-utils/urlFor'
// import { h3Style } from '@/styles/tailwindStyles'

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative h-64 w-full m-10 mx-auto">
          <Image
            className="object-contain object-left rounded align-middle border-none"
            src={urlFor(value).url()}
            alt="Blog Image"
            fill
          />
        </div>
      )
    },
  },

  block: {
    h1: ({ children }: any) => <h1 className="page-header">{children}</h1>,
    h2: ({ children }: any) => <h4 className="article-h2">{children}</h4>,
    h3: ({ children }: any) => <h4 className="article-h3">{children}</h4>,
    h4: ({ children }: any) => <h4 className="article-h4">{children}</h4>,
    a: ({ children, href }: any) => (
      <a href={href} className="article-link">
        {children}
      </a>
    ),
    normal: ({ children }: any) => <p className="py-2 text-lg">{children}</p>,
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="my-5 ml-10 list-disc tracking-[0.005em] text-base text-[#333a4a]">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-5 ml-10 list-decimal tracking-[0.005em] text-base text-[#333a4a]">
        {children}
      </ol>
    ),
  },
}

export default myPortableTextComponents
