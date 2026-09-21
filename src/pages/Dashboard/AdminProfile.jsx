"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card } from "../../components/ui/Card";

export default function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [newCount, setNewCount] = useState(0);

  const firstLoad = useRef(true);
  const previousUserCount = useRef(0);

  // Sound Effect
const playSound = () => {
  const audio = new Audio("notification.wav"); 
  audio.play().catch(err => console.log("Audio error:", err));
};


  // Fetch User Details + Detect New Messages
  useEffect(() => {
    const q = query(collection(db, "userDetails"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Detect new entries (Skip first load)
      if (!firstLoad.current) {
        if (data.length > previousUserCount.current) {
          playSound(); // 🔊 PLAY SOUND
          setNewCount((prev) => prev + 1); // Increase notification badge
        }
      }

      previousUserCount.current = data.length;
      setUsers(data);
      firstLoad.current = false;
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

  const closeModal = () => setSelectedCell(null);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ⭐
      </span>
    ));

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      
      {/* Notification Header */}
      <div className="flex justify-center mb-4 relative">
        <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* Notification Bell */}
        <div className="ml-4 relative">
          <span className="text-3xl">🔔</span>

          {/* Badge */}
          {newCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {newCount}
            </span>
          )}
        </div>
      </div>

      {/* USERS */}
      <section>
        <h2 className="text-xl font-black mb-4">👥 User Details</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No user details yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card
                key={user.id}
                className="p-4 relative bg-gradient-to-br from-yellow-50 to-orange-100 shadow-lg rounded-xl border-2 border-orange-200"
              >
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

      {/* TESTIMONIES */}
      <section>
        <h2 className="text-xl font-black mb-4">💬 User Testimonies</h2>
        {testimonies.length === 0 ? (
          <p className="text-gray-600">No testimonies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonies.map((t) => (
              <Card
                key={t.id}
                className="p-4 relative bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg rounded-xl border-2 border-emerald-200"
              >
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

      {/* MODAL */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Selected Cell</h3>
            <p className="text-lg">{selectedCell}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
