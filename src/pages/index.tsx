import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      alert('Preencha os dados.')
      return;
    }
    
    setIsLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input
              placeholder='Sua senha'
              type='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Button 
              type="submit"
              loading={isLoading}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
