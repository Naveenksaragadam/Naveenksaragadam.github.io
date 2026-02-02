'use client'

import { useModal } from './Providers'
import ContactModal from './ContactModal'

export default function ContactModalWrapper() {
    const { isContactModalOpen, setIsContactModalOpen } = useModal()
    return (
        <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
        />
    )
}
