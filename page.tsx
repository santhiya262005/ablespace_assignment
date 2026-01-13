'use client';

import { useEffect, useState } from 'react';

type NavItem = {
  title: string;
  url: string | null;
};

export default function HomePage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/scrape/navigation')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItems(data.filter((i: NavItem) => i.title));
        setLoading(false);
      })
      .catch(() => {
        setError('Backend not reachable');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading navigation…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        World of Books Navigation
      </h1>

      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="border p-3 rounded hover:bg-gray-50 transition"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
