import { OrderItemProps } from '../../pages/dashboard/types'

export interface ModalOrderProps {
    isOpen: boolean,
    onRequestClose: () => void,
    order: OrderItemProps[],
    handleFinishOrder: (id: string) => void
}