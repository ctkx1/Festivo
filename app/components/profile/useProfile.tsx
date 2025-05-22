import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export default function useProfile(session: Session) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarKey, setAvatarKey] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (session) getProfile()
  }, [session])
  
  async function getProfile() {
    try {
      setLoading(true)
      setImageError(false)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, date_of_birth, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setDateOfBirth(data.date_of_birth ? new Date(data.date_of_birth) : null)
        
        // Handle avatar_url
        if (data.avatar_url) {
          console.log('Pobrano URL avatara:', data.avatar_url)
          
          // Verify if the avatar URL is accessible
          try {
            // Add a cache busting parameter to force a fresh fetch
            const testUrl = `${data.avatar_url}?t=${Date.now()}`
            const response = await fetch(testUrl, { method: 'HEAD' })
            
            if (response.ok) {
              setAvatarUrl(testUrl)
            } else {
              console.log('Avatar URL is not accessible, status:', response.status)
              setAvatarUrl(null)
              setImageError(true)
            }
          } catch (fetchError) {
            console.error('Error verifying avatar URL:', fetchError)
            setAvatarUrl(null)
            setImageError(true)
          }
        } else {
          console.log('Brak avatar_url w profilu')
          setAvatarUrl(null)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd podczas pobierania profilu:', error.message)
        Alert.alert('Błąd', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    date_of_birth,
    avatar_url,
  }: {
    username: string
    date_of_birth: Date | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      // Convert Date to ISO string for Supabase
      const dateString = date_of_birth ? date_of_birth.toISOString() : null

      const updates = {
        id: session?.user.id,
        username,
        date_of_birth: dateString,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      console.log('Aktualizacja profilu:', updates)

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        console.error('Błąd podczas aktualizacji:', error)
        throw error
      } else {
        Alert.alert('Sukces', 'Dane zostały zaktualizowane')
        // Update local state
        setUsername(username)
        setDateOfBirth(date_of_birth)
        if (avatar_url !== avatarUrl) {
          const newAvatarUrl = avatar_url ? `${avatar_url}?t=${Date.now()}` : null
          setAvatarUrl(newAvatarUrl)
          setAvatarKey(prevKey => prevKey + 1)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Błąd', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    username,
    setUsername,
    dateOfBirth,
    setDateOfBirth,
    avatarUrl,
    avatarKey,
    imageError,
    setImageError,
    getProfile,
    updateProfile
  }
}