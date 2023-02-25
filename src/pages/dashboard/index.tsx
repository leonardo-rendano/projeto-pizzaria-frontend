import { Header } from "@/components/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizza</title>
      </Head>
      <div>
        <Header />
        <h1>Painel</h1>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {

  return {
    props: {}
  }
}) 