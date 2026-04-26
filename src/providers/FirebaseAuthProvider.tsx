'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '@/lib/firebase';
import { setUser, logout, authStart } from '@/redux/features/auth/authSlice';
import { useSyncFirebaseMutation } from '@/redux/features/auth/authApi';

export default function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [syncFirebase] = useSyncFirebaseMutation();

  useEffect(() => {
    dispatch(authStart());
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const payload = {
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatar: firebaseUser.photoURL,
        };
        
        try {
          const response = await syncFirebase(payload).unwrap();
          const { user, accessToken } = response.data;
          dispatch(setUser({ user, token: accessToken }));
        } catch (error) {
          console.error("❌ Firebase sync error:", error);
          // If sync fails, we still set the user from firebase to allow frontend access
          // but they might face issues with backend APIs
          const fallbackUser = {
            id: firebaseUser.uid,
            name: payload.name,
            email: firebaseUser.email || '',
            password: '',
            role: 'student' as any,
            avatar: firebaseUser.photoURL,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          dispatch(setUser({ user: fallbackUser, token: '' }));
        }
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch, syncFirebase]);

  return <>{children}</>;
}
