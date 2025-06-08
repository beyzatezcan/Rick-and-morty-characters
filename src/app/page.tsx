'use client';

import React, { useEffect, useState } from 'react';
import { getManyCharacters } from '@/services/api';
import { Character } from '@/types/character';


const PAGE_SIZE_OPTIONS = [10, 20, 40, 50];

//siralama filtresi, arttirilabilir
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'id-asc', label: 'ID (Ascending)' },
  { value: 'id-desc', label: 'ID (Descending)' },
  { value: 'random', label: 'Random' },
];

export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' });
  const [selected, setSelected] = useState<Character | null>(null);
  const [pageSize, setPageSize] = useState(20); // sayfada her acildiginda hep 20 bilesen olacaktir, kullanici degistirebilir
  const [sort, setSort] = useState('random'); // sayfa her acildiginda random siralama yapilacak

  
  useEffect(() => {
    setLoading(true);
    getManyCharacters(260) //karakter sayisini 260 olarak belirledim, degistirilebilir
  
      .then((data) => {
        setAllCharacters(data);
        setError(null);
      })
      .catch(() => setError('No characters found according to the filter.')) //hata mesaji
      .finally(() => setLoading(false));
  }, []);

  // Filtre secenekleri
  const statusOptions = ['', 'Alive', 'Dead', 'unknown'];
  const genderOptions = ['', 'Female', 'Male', 'Genderless', 'unknown'];
  const speciesOptions = ['', 'Human', 'Alien', 'Humanoid', 'Mythological', 'unknown'];

  // Filtre secince uygun olanlari sayfa 1den baslayarak gostersin
  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  }

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

    // Siralama islemi
    function getSortedCharacters(chars: Character[]) {
    let sorted = [...chars];
    if (sort === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'id-asc') sorted.sort((a, b) => a.id - b.id);
    if (sort === 'id-desc') sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }

  // Sayfalama islemi
  const sortedCharacters = getSortedCharacters(filtered);
  const totalPages = Math.ceil(sortedCharacters.length / pageSize);
  const pagedCharacters = sortedCharacters.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 20 }}>

  {/* H1 ve P aynı kutuda */}
  <div style={{ 
    padding: 25, 
    borderRadius: 15, 
    background: 'rgba(0, 0, 0, 0.8)', 
    boxShadow: '0 0 20px #00ff00',
    textAlign: 'center',
    marginBottom: 30
  }}>
    <h1 style={{ 
      fontSize: 64, 
      fontWeight: 'bolder', 
      color: '#00bfff',
      fontFamily: 'var(--font-get-schwifty), "Comic Sans MS", cursive',
      textShadow: '1px 1px 0 #00ff00, -1px -1px 0 #00ff00, 1px -1px 0 #00ff00, -1px 1px 0 #00ff00',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      WebkitTextStroke: '1px #00ff00',
      margin: 0,
      marginBottom: 10
    }}>
      RICK AND MORTY CHARACTERS
    </h1>

    <p style={{
      color: '#48d1cc',
      fontSize: 18,
      fontFamily: 'Comic Sans MS',
      margin: 0
    }}>
      Explore characters from all episodes of Rick and Morty.
    </p>
  </div>
  
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Sol Sidebar filtreler */}
        <div style={{ 
          width: 250, 
          padding: 20, 
          background: '#48d1cc', 
          color: 'black',
          borderRadius: 6,
          height: 'fit-content',
          fontFamily: 'Comic Sans MS',
          position: 'sticky',
          top: 20
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Filters</h2>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Status</label>
            <select 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
            >
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Statuses'}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Gender</label>
            <select 
              name="gender" 
              value={filters.gender} 
              onChange={handleFilterChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
            >
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Genders'}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Species</label>
            <select 
              name="species" 
              value={filters.species} 
              onChange={handleFilterChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
            >
              {speciesOptions.map(opt => <option key={opt} value={opt}>{opt || 'All Species'}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Show per page</label>
            <select 
              value={pageSize} 
              onChange={handlePageSizeChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
            >
              {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Sort by</label>
            <select 
              value={sort} 
              onChange={handleSortChange}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
            >
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        {/* Sağ taraf - Karakterler grid */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{ margin: 40, textAlign: 'center' }}>Loading...</div>
          ) : (error && error.toString().includes('404')) || pagedCharacters.length === 0 ? (
            <div style={{ margin: 40, textAlign: 'center' }}>No characters found according to the filter.</div>
          ) : error ? (
            <div style={{ margin: 40, color: 'red', textAlign: 'center' }}>{error}</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 20,
              fontFamily: 'Comic Sans MS',
              marginBottom: 30
            }}>
              {pagedCharacters.map((character) => (
                <div
                  key={character.id}
                  style={{
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: selected?.id === character.id ? '0 0 15px #00ff00' : '0 2px 8px #0001',
                    padding: 12,
                    color: 'black',
                    cursor: 'pointer',
                    border: selected?.id === character.id ? '2px solid #00ff00' : '1px solid #eee'
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

          {/* Sayfa numaralari */}
          <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap',fontFamily: 'Comic Sans MS', }}>
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
              background: 'rgba(255, 255, 255, 0.9)',
              color: 'black',
              borderRadius: 8,
              boxShadow: '0 2px 8px #0001',
              display: 'flex',
              gap: 20,
              fontFamily: 'Comic Sans MS',
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
      </div>
    </div>
  );
}
