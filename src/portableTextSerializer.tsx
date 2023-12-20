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
    h4: ({ children }: any) => <h4 className="page-header">{children}</h4>,
  },
}

export default myPortableTextComponents
