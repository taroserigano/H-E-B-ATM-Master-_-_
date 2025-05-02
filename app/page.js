"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [account, setAccount] = useState("");
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, pin }),
    });

    console.log({ account, pin });

    if (res.ok) {
      setLoggedIn(true);
      fetchItems();
    } else {
      alert("Login failed");
    }
  };

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    } else {
      setLoggedIn(false);
    }
  };

  const addItem = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    });
    const data = await res.json();
    setItems(data.items || []);
    setNewItem("");
  };

  useEffect(() => {
    fetchItems(); // Check if session cookie already exists
  }, []);

  if (!loggedIn) {
    return (
      <main style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Account #"
        />
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          type="password"
        />
        <button onClick={login}>Login</button>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Items</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New item"
      />
      <button onClick={addItem}>Add</button>
    </main>
  );
}
