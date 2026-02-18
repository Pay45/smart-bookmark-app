"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Auth from "@/components/Auth";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!user) return <Auth />;

  return <BookmarkList user={user} />;
}