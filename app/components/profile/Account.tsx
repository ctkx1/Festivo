import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

import Avatar from './Avatar'
import ProfileForm from './ProfileForm'
import TicketPurchaseModal from './TicketPurchaseModal'
import useProfile from './useProfile'

export default function Account({ session }: { session: Session }) {
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  const { 
    loading, 
    username, 
    dateOfBirth, 
    avatarUrl,
    updateProfile 
  } = useProfile(session);

  const handleBuy = () => {
    setTicketModalVisible(true);
    setIsPurchasing(true);
    setPurchaseComplete(false);
    
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseComplete(true);
    }, 5000);
  };

  const closeTicketModal = () => {
    setTicketModalVisible(false);
  };

  return (
    <View className='bg-slate-900 p-3 h-full w-full justify-center items-center'>
      {username && (
        <Text className='text-accent text-4xl font-bold mb-3'>
          Witaj, {username}! 
        </Text>
      )}
      <Text className='text-white text-4xl font-bold'>Zarządzaj swoim kontem</Text>
      
      {/* Avatar Section */}
      <Avatar 
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        updateProfile={updateProfile}
        dateOfBirth={dateOfBirth}
      />
      
      {/* Profile Form */}
      <ProfileForm 
        session={session}
        username={username}
        setUsername={(text) => updateProfile({ 
          username: text,
          date_of_birth: dateOfBirth, 
          avatar_url: avatarUrl ? avatarUrl.split('?')[0] : null
        })}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={(date) => updateProfile({ 
          username,
          date_of_birth: date, 
          avatar_url: avatarUrl ? avatarUrl.split('?')[0] : null
        })}
        loading={loading}
      />

      <TouchableOpacity 
        className="w-full bg-accent py-4 px-4 rounded-lg items-center" 
        onPress={handleBuy}
      >
        <Text className="text-black font-bold text-lg">Kup bilet</Text>
      </TouchableOpacity>

      <View className='mt-3 py-2 w-full'>
        {/* Renderowanie komponentu modalu zakupu biletu */}
        <TicketPurchaseModal 
          visible={ticketModalVisible}
          onClose={closeTicketModal}
          isPurchasing={isPurchasing}
          purchaseComplete={purchaseComplete}
        />
        
        <TouchableOpacity 
          className="bg-accent p-4 rounded-lg mb-3" 
          onPress={() => updateProfile({ 
            username, 
            date_of_birth: dateOfBirth, 
            avatar_url: avatarUrl ? avatarUrl.split('?')[0] : null // Remove cache busting param when saving
          })}
          disabled={loading}
        >
          <Text className="text-black font-bold text-center text-lg">
            {loading ? 'Ładowanie ...' : 'Zaktualizuj dane konta' }
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-transparent border border-accent p-4 rounded-lg"
          onPress={() => supabase.auth.signOut()} 
          disabled={loading}
        >
          <Text className="text-orange-300 font-bold text-center text-lg">Wyloguj</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}