import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function Signup() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos')
      return;
    }

    setIsLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito pizzaria" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={event => setName(event.target.value)}
            />
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
              Cadastrar
            </Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
