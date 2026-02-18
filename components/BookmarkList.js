"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  async function getBookmarks() {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  }

  async function addBookmark(e) {
    e.preventDefault();

    await supabase.from("bookmarks").insert([
      {
        title: title,
        url: url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  }

  async function deleteBookmark(id) {
    await supabase.from("bookmarks").delete().eq("id", id);
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
  async function loadBookmarks() {
    await getBookmarks();
  }

  loadBookmarks();

    // realtime listener
    const channel = supabase
      .channel("bookmark-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          getBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Bookmark Manager
            </h1>
            <p className="text-gray-600 mt-1">
              Save and manage your important links easily.
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-black transition"
          >
            Logout
          </button>
        </div>

        {/* Add Bookmark Form */}
        <form
          onSubmit={addBookmark}
          className="bg-white shadow-md rounded-2xl p-6 mt-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add a Bookmark
          </h2>

          <input
            type="text"
            placeholder="Bookmark Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Bookmark URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            + Add Bookmark
          </button>
        </form>

        {/* Bookmark List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Bookmarks
          </h2>

          {bookmarks.length === 0 ? (
            <p className="text-gray-600 bg-white p-4 rounded-xl shadow-md">
              No bookmarks yet. Add one above!
            </p>
          ) : (
            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {bookmark.title}
                    </h3>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {bookmark.url}
                    </a>
                  </div>

                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}