import { FormEvent, useState } from 'react'
import styles from './style.module.scss'
import Head from 'next/head'
import { Header } from '@/components/Header'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    alert('Categoria ' + name)
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