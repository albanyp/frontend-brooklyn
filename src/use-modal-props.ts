import { useState } from "react"

const useModalProps = () => {
    const [modalProps, setModalProps] = useState({
        open: false
    })

    const openModal = (props) => {
        setModalProps(existingProps => ({
            ...existingProps,
            open: true,
            ...props,
        }))
    }

    const closeModal = () => {
        setModalProps({
            open: false
        })
    }


    return [
    {
        open,
        onClose: closeModal
    },
        openModal,
        closeModal
    ] as const
}