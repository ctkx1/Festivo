import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    if (!email || !password) {
      alert('Podaj proszę email i hasło');
      return;
    }
    
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      alert('Logowanie nie powiodło się: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    if (!email || !password) {
      alert('Podaj proszę email i hasło');
      return;
    }
    
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      alert('Rejestracja nie powiodła się: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      alert('Sign out failed ' + error.message);
    }
  }

  const handleBuyTicket = () => {
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

  const TicketPurchaseModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={ticketModalVisible}
        onRequestClose={closeTicketModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-90">
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
                  onPress={closeTicketModal}
                >
                  <Text className="text-black font-bold">Zamknij</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    );
  };

  const UserProfileView = () => (
    <View className="flex-1 bg-black p-6 items-center">
      <View className="w-28 h-28 bg-gray-900 rounded-full mb-6 overflow-hidden items-center justify-center border border-accent">
        {user?.photoURL ? (
          <Image 
            source={{ uri: user.photoURL }} 
            className="w-full h-full" 
          />
        ) : (
          <Text className="text-accent text-4xl">{user?.email?.charAt(0).toUpperCase()}</Text>
        )}
      </View>
      
      <Text className="text-accent text-2xl font-bold mb-1">{user?.displayName || 'User'}</Text>
      <Text className="text-gray-400 mb-6">{user?.email}</Text>
      
      <View className="w-full bg-gray-800 rounded-lg p-4 mb-6 border border-accent">
        <Text className="text-accent font-bold text-lg mb-2">Informacje o koncie</Text>
        <View className="flex-row justify-between py-2 border-b border-gray-700">
          <Text className="text-gray-400">Email:</Text>
          <Text className="text-white">{user?.email}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-700">
          <Text className="text-gray-400">Data założenia konta:</Text>
          <Text className="text-white">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</Text>
        </View>
      </View>
      <TouchableOpacity 
        className="w-full bg-accent py-4 px-4 rounded-lg mt-6 items-center mb-5" 
        onPress={handleBuyTicket}
      >
        <Text className="text-black font-bold text-lg">Kup bilet</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="w-full bg-black p-4 rounded-lg items-center border border-accent" 
        onPress={signOut}
      >
        <Text className="text-accent font-bold text-lg">Wyloguj</Text>
      </TouchableOpacity>
      
      <TicketPurchaseModal />
    </View>
  );

  if (user) {
    return <UserProfileView />;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center p-6 bg-black"
    >
      <Text className="text-accent text-3xl font-bold mb-8 text-center">Zaloguj lub zarejestruj</Text>
      
      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#9CA3AF" 
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          className="text-white p-3 mb-4 bg-gray-700 rounded-lg"
        />
        <TextInput 
          secureTextEntry={true} 
          placeholder="Hasło" 
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          className="text-white p-3 bg-gray-700 rounded-lg"
        />
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" className="my-4" />
      ) : (
        <View>
          <TouchableOpacity 
            className="bg-accent p-4 rounded-lg mb-3" 
            onPress={signIn}
          >
            <Text className="text-black font-bold text-center text-lg">Zaloguj</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-transparent border border-accent p-4 rounded-lg" 
            onPress={signUp}
          >
            <Text className="text-orange-300 font-bold text-center text-lg">Stwórz konto</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

export default Profile;