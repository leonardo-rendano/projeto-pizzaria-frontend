import { AuthTokenError } from '@/services/errors/AuthTokenError'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'

export function canSSRAuth<p>(fn: GetServerSideProps<p>) {
  return (
    async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {

      const cookies = parseCookies(context)

      const token = cookies['@nextauth.token']

      if (!token) {
        return ({
          redirect: {
            destination: '/',
            permanent: false
          }
        })
      }

      try {
        return await fn(context)
      } catch (error) {
        if (error instanceof AuthTokenError) {
          destroyCookie(context, '@nextauth.token')

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }
      }
    }
  )
}