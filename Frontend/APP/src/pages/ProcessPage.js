import React ,{useState} from 'react'
import Select from 'react-select';
//import {fetchAPI,fetchAPI2} from '../helpers/fetch';
//import '../css/TableWithSearch.css'


export const ProcessPage = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const artistOptions = [
    { value: 'artista1', label: 'Artista 1' },
    { value: 'artista2', label: 'Artista 2' },
    // Agrega más opciones de artistas aquí
  ];

  const yearOptions = [
    { value: '1966', label: '1966' },
    // Agrega más opciones de años aquí
  ];

  const albumOptions = [
    { value: 'album1', label: 'Album 1' },
    { value: 'album2', label: 'Album 2' },
    // Agrega más opciones de álbumes aquí
  ];

  const handleArtistChange = (selected) => {
    setSelectedArtist(selected);
  };

  const handleYearChange = (selected) => {
    setSelectedYear(selected);
  };

  const handleAlbumChange = (selected) => {
    setSelectedAlbum(selected);
  };



  return (
	<div>
      <h3>Selecciona un artista, año y nombre del álbum:</h3>
      <div>
        <Select
          placeholder="Artista"
          options={artistOptions}
          value={selectedArtist}
          onChange={handleArtistChange}
        />
        <Select
          placeholder="Año"
          options={yearOptions}
          value={selectedYear}
          onChange={handleYearChange}
        />
        <Select
          placeholder="Álbum"
          options={albumOptions}
          value={selectedAlbum}
          onChange={handleAlbumChange}
        />
      </div>
    </div>
  )
}
