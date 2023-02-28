import { Header } from "@/components/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { useState } from "react"
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import Modal from 'react-modal'
import { ModalOrder } from "@/components/ModalOrder" 
import styles from './styles.module.scss'

type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null
}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string,
  amount: number,
  order_id: string,
  product_id: string,
  product: {
    id: string,
    name: string,
    description: string,
    price: string,
    banner: string
  }
  order: {
    id: string,
    table: string | number,
    status: boolean,
    name: string | null
  }
}

export default function Dashboard({ orders }: HomeProps) {

  Modal.setAppElement('#__next')
  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal() {
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient()

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id
      }
    })

    setModalItem(response.data)
    setModalVisible(true)
  }


  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizza</title>
      </Head>
      <div>
        <Header />
    
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.map(item => {
              return (
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpenModalView(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>
              )
            })}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
          />)
        }

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get('/orders')

  console.log(response.data)

  return {
    props: {
      orders: response.data
    }
  }
}) 