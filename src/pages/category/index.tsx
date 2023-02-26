import { FormEvent, useState } from 'react'
import styles from './style.module.scss'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    if (name === '') {
      toast.error('Insira o nome de uma categoria!')
    }

    const apiClient = setupAPIClient()
    await apiClient.post('category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso!')
    setName('')
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito pizza</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastrar categoria</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="text"
            placeholder='Digite o nome da categoria'
            className={styles.input}
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <button className={styles.buttonAdd} type='submit'>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {

  return {
    props: {}
  }
})