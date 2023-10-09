import React, {useCallback, useState, useLayoutEffect} from 'react';
import {FIREBASE_AUTH, FIRESTORE} from '../firebase/FirebaseConfig';
import {signOut} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../store/store';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);

  useLayoutEffect(() => {
    const q = query(
      collection(FIRESTORE, 'chats'),
      orderBy('createdAt', 'desc'),
    );
    const unsubscribe = onSnapshot(q, snapshot =>
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      ),
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    const {_id, createdAt, text, user} = messages[0];

    addDoc(collection(FIRESTORE, 'chats'), {_id, createdAt, text, user});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: FIREBASE_AUTH?.currentUser?.email,
        name: FIREBASE_AUTH?.currentUser?.displayName,
        avatar: FIREBASE_AUTH?.currentUser?.photoURL,
      }}
    />
  );
}
