import React from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Modal 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface TicketPurchaseModalProps {
  visible: boolean
  onClose: () => void
  isPurchasing: boolean
  purchaseComplete: boolean
}

export default function TicketPurchaseModal({ 
  visible, 
  onClose, 
  isPurchasing, 
  purchaseComplete 
}: TicketPurchaseModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-slate-900 bg-opacity-90">
        <View className="bg-gray-800 p-6 rounded-lg w-4/5 items-center border border-accent">
          {isPurchasing ? (
            <>
              <ActivityIndicator size="large" color="#F59E0B" />
              <Text className="text-white text-lg mt-4">Przetwarzanie zakupu...</Text>
            </>
          ) : purchaseComplete ? (
            <>
              <Ionicons name="checkmark-circle" size={60} color="#F59E0B" />
              <Text className="text-accent text-xl font-bold mt-4">Bilet Zakupiony!</Text>
              <Text className="text-gray-300 text-center mt-2">
                Twój bilet został pomyślnie zakupiony i dodany do Twojego konta.
              </Text>
              <TouchableOpacity 
                className="bg-accent py-3 px-6 rounded-lg mt-6"
                onPress={onClose}
              >
                <Text className="text-black font-bold">Zamknij</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  )
}