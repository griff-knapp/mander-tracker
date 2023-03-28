import React, { useContext, useState, useEffect } from "react";
import { supabase } from '../supabase';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const retreiveSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      return session;
    }
    
    const session = retreiveSession();
    
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changed on auth state
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      supabase.removeChannel(listener);
    }
  }, []);

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: async (data) => await supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    session,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext);
}