import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { AppRole, Profile, Farmer, Buyer } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  farmer: Farmer | null;
  buyer: Buyer | null;
  isEmailConfirmed: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: AppRole) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const fetchUserData = async (userId: string) => {
    try {
      // Parallelize profile and role fetching
      const [profileResult, roleResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_roles').select('role').eq('user_id', userId).maybeSingle()
      ]);

      if (profileResult.data) {
        setProfile(profileResult.data as Profile);
      }

      const roleData = roleResult.data;
      if (roleData) {
        const userRole = roleData.role as AppRole;
        setRole(userRole);

        // Fetch role-specific data
        if (userRole === 'farmer') {
          const { data: farmerData } = await supabase
            .from('farmers')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();
          if (farmerData) setFarmer(farmerData as Farmer);
        } else if (userRole === 'buyer') {
          const { data: buyerData } = await supabase
            .from('buyers')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();
          if (buyerData) setBuyer(buyerData as Buyer);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  useEffect(() => {
    let isInitialLoad = true;

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isInitialLoad) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsEmailConfirmed(Boolean(session?.user?.email_confirmed_at));

        if (session?.user) {
          fetchUserData(session.user.id).finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        isInitialLoad = false; // Auth state change happened, stop initial load handling

        setSession(session);
        setUser(session?.user ?? null);
        setIsEmailConfirmed(Boolean(session?.user?.email_confirmed_at));

        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          setProfile(null);
          setRole(null);
          setFarmer(null);
          setBuyer(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, selectedRole: AppRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('Signup failed');

      // Insert role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: data.user.id, role: selectedRole });

      if (roleError) throw roleError;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
    setFarmer(null);
    setBuyer(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        farmer,
        buyer,
        isEmailConfirmed,
        loading,
        signUp,
        signIn,
        signOut,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
