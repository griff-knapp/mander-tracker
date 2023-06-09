import React, { useContext, useState, useEffect } from "react";
import { supabase } from '../supabase';
import { getUser } from "../api/UserQueries";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [session, setSession] = useState(localStorage.getItem('session'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const retreiveSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      localStorage.setItem('session', session);
      console.log(session);
      if (session !== null) {
        const userData = await getUser(session.user.email);
        // console.log(userData[0]);
        setUser(userData[0]);
      }
      return session;
    }

    // console.log(session);
    const sesh = retreiveSession();

    setUser(sesh?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Listen for changed on auth state
    // console.log(session);
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // setUser(session?.user ?? null);
      // console.log(session);
      // console.log(`Supbase auth event: ${event}`);
      setSession(session);
      if (session !== null) {
        const userData = await getUser(session.user.email);
        setUser(userData[0]);
      }
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    }
  },[]);

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