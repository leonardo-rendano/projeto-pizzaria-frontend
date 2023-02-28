import { createContext, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'
import { AuthContextData, AuthProviderProps, SignInProps, SignUpProps, UserProps,  } from './types'


export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch (error) {
    console.log('Erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies()

    if (token) {
      api.get('/me')
      .then(response => {
        const { id, name, email } = response.data

        setUser({
          id,
          name,
          email
        })
      })
      .catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email, 
        password
      })

      const { id, name, token } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({ id, name, email })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso')

      Router.push('/dashboard')

    } catch (error) {
      toast.error('Erro ao acessar')
      
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await api.post('/users', {
        name,
        email,
        password
      })
      Router.push('/')

      toast.success('Conta criada com sucesso')

    } catch (error) {

      toast.error('Erro ao cadastrar')
      console.log('Erro ao cadastrar ', error)
    }
  }


  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated,
      signIn,
      signOut,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  )
}