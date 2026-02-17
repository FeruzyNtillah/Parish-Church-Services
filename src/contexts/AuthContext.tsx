import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; timeout?: boolean }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  resendConfirmation: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error('Error getting session', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // Add timeout promise to handle slow connections
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Login timed out. Please check your internet connection and try again.')), 15000); // 15 seconds timeout
      });

      const signInPromise = supabase.auth.signInWithPassword({ email, password });
      
      const result = await Promise.race([signInPromise, timeoutPromise]);
      return { error: result.error || null };
    } catch (error: any) {
      if (error.message === 'Login timed out. Please check your internet connection and try again.') {
        return { error, timeout: true };
      }
      console.error('Sign in error', error);
      // Handle specific email confirmation error
      if (error.message.includes('Email not confirmed')) {
        return { error: new Error('Please check your email and click on confirmation link before signing in. If you need a new confirmation email, please sign up again.') };
      }
      return { error: new Error(error.message) };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error('Sign up error', error);
      return { error: new Error(error.message) };
    }

    // Success message for email confirmation
    return { error: new Error('Please check your email for a confirmation link to complete your registration.') };
  }, []);

  const signOut = useCallback(async () => {
    try {
      // Add timeout promise to handle slow connections
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Logout timed out. Please check your internet connection and try again.')), 15000); // 15 seconds timeout
      });

      const signOutPromise = supabase.auth.signOut();
      
      await Promise.race([signOutPromise, timeoutPromise]);
    } catch (error: any) {
      console.error('Sign out error', error);
      throw error;
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      console.error('Password reset error', error);
      return { error: new Error(error.message) };
    }
    return { error: null };
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Update password error', error);
      return { error: new Error(error.message) };
    }
    return { error: null };
  }, []);

  const resendConfirmation = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    if (error) {
      console.error('Resend confirmation error', error);
      return { error: new Error(error.message) };
    }
    return { error: null };
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      sendPasswordReset,
      updatePassword,
      resendConfirmation,
    }),
    [user, session, loading, signIn, signUp, signOut, sendPasswordReset, updatePassword, resendConfirmation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};


