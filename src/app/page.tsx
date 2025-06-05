'use client';

import React, { useEffect, useState } from 'react';
import { getManyCharacters } from '@/services/api';
import { Character } from '@/types/character';
import { BoldIcon } from '@heroicons/react/16/solid';

const PAGE_SIZE_OPTIONS = [10, 20, 40, 50];
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'id-asc', label: 'ID (Ascending)' },
  { value: 'id-desc', label: 'ID (Descending)' },
];

export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' });
  const [selected, setSelected] = useState<Character | null>(null);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState('name-asc');

  // Tüm karakterleri bir defa çek
  useEffect(() => {
    setLoading(true);
    getManyCharacters(260)
      .then((data) => {
        setAllCharacters(data);
        setError(null);
      })
      .catch(() => setError('No characters found according to the filter.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtre seçenekleri
  const statusOptions = ['', 'Alive', 'Dead', 'unknown'];
  const genderOptions = ['', 'Female', 'Male', 'Genderless', 'unknown'];
  const speciesOptions = ['', 'Human', 'Alien', 'Humanoid', 'Mythological', 'unknown'];

  // Filtre değişince sayfa başa dönsün
  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  }

  // Sıralama ve sayfa boyutu değişince sayfa başa dönsün
  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }
  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
    setCurrentPage(1);
  }

  // Filtreleme
  const filtered = allCharacters.filter(c =>
    (!filters.status || c.status === filters.status) &&
    (!filters.gender || c.gender === filters.gender) &&
    (!filters.species || c.species === filters.species)
  );

  // Sıralama işlemi
  function getSortedCharacters(chars: Character[]) {
    let sorted = [...chars];
    if (sort === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'id-asc') sorted.sort((a, b) => a.id - b.id);
    if (sort === 'id-desc') sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }

  // Sayfalama işlemi
  const sortedCharacters = getSortedCharacters(filtered);
  const totalPages = Math.ceil(sortedCharacters.length / pageSize);
  const pagedCharacters = sortedCharacters.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>Rick and Morty Characters</h1>

      {/* Filtreler ve sayfa ayarları */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Statuses'}</option>)}
        </select>
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          {genderOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Genders'}</option>)}
        </select>
        <select name="species" value={filters.species} onChange={handleFilterChange}>
          {speciesOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Species'}</option>)}
        </select>
        <span style={{ marginLeft: 20, fontWeight: 'bold' }}>Show per page:</span>
        <select value={pageSize} onChange={handlePageSizeChange}>
          {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <span style={{ marginLeft: 20, fontWeight: 'bold' }}>Sort:</span>
        <select value={sort} onChange={handleSortChange}>
          {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {/* Karakterler grid */}
      {loading ? (
        <div style={{ margin: 40, textAlign: 'center' }}>Loading...</div>
      ) : (error && error.toString().includes('404')) || pagedCharacters.length === 0 ? (
        <div style={{ margin: 40, textAlign: 'center' }}>No characters found according to the filter.</div>
      ) : error ? (
        <div style={{ margin: 40, color: 'red', textAlign: 'center' }}>{error}</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 30
        }}>
          {pagedCharacters.map((character) => (
            <div
              key={character.id}
              style={{
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 8px #0001',
                padding: 12,
                color: 'black',
                cursor: 'pointer',
                border: selected?.id === character.id ? '2px solid #3b82f6' : '1px solid #eee'
              }}
              onClick={() => setSelected(character)}
            >
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }}
              />
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>{character.name}</div>
              <div style={{ fontSize: 14, color: '#555' }}>{character.status} - {character.species}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{character.gender}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sayfa numaraları */}
      <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: '1px solid #ccc',
              background: currentPage === i + 1 ? '#3b82f6' : '#f3f4f6',
              color: currentPage === i + 1 ? 'white' : 'black',
              fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Detay */}
      {selected && (
        <div style={{
          marginTop: 30,
          padding: 20,
          background: 'white',
          color: 'black',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0001',
          display: 'flex',
          gap: 20,
          alignItems: 'center'
        }}>
          <img src={selected.image} alt={selected.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }} />
          <div>
            <h2><b>{selected.name}</b> <span style={{ fontSize: 14, color: '#888', fontWeight: 'bold' }}>#{selected.id}</span></h2>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Species:</b> {selected.species}</p>
            <p><b>Gender:</b> {selected.gender}</p>
            <p><b>Origin:</b> {selected.origin.name}</p>
            <p><b>Location:</b> {selected.location.name}</p>
            <p><b>Episode Count:</b> {selected.episode.length}</p>
            <button onClick={() => setSelected(null)} style={{ marginTop: 10, padding: '6px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 4 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
