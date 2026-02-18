"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Smart Bookmark App
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Save and manage your important links easily.
        </p>

        <button
          onClick={login}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Login with Google
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure login powered by Supabase Authentication
        </p>
      </div>
    </div>
  );
}