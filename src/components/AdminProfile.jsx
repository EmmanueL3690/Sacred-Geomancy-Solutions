"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card } from "./ui/Card.jsx";
import { solutionsData } from "./solutionsData.js";

// Sacred Numbers Setup (1–16 × A–P)
const letters = "ABCDEFGHIJKLMNOP".split("");
const numbers = Array.from({ length: 16 }, (_, i) => i + 1);

export default function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  // Fetch User Details
  useEffect(() => {
    const q = query(collection(db, "userDetails"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  // Fetch Testimonies
  useEffect(() => {
    const q = query(collection(db, "testimonies"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setTestimonies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const handleDelete = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const handleCellClick = (number, letter) => {
    setSelectedCell(`${number}${letter}`);
  };

  const closeModal = () => setSelectedCell(null);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
    ));

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      {/* Users */}
      <section>
        <h2 className="text-xl font-black mb-4">👥 User Details</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No user details yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="p-4 relative bg-gradient-to-br from-yellow-50 to-orange-100 shadow-lg rounded-xl border-2 border-orange-200">
                <p className="font-bold text-lg">{user.name} ({user.age})</p>
                <p className="text-sm text-gray-700">{user.location}</p>
                <p className="text-sm text-gray-700">{user.email}</p>
                <p className="text-sm text-gray-700">{user.phone}</p>
                <p className="mt-2 font-semibold text-orange-600">
                  Picked Numbers: {user.numberPicked?.join(", ")}
                </p>
                <button
                  onClick={() => handleDelete("userDetails", user.id)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Testimonies */}
      <section>
        <h2 className="text-xl font-black mb-4">💬 User Testimonies</h2>
        {testimonies.length === 0 ? (
          <p className="text-gray-600">No testimonies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonies.map((t) => (
              <Card key={t.id} className="p-4 relative bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg rounded-xl border-2 border-emerald-200">
                <div className="mb-2">{renderStars(t.rating)}</div>
                <p className="text-gray-800">{t.message}</p>
                <p className="text-sm text-gray-600 mt-2">— {t.name}</p>
                <button
                  onClick={() => handleDelete("testimonies", t.id)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
