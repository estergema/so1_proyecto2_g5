import React,{useState,useEffect} from 'react'
import { fetchAPI } from '../helpers/fetch';
import '../css/graficas.css';
import '../css/TableWithSearch.css'
import Select from 'react-select';
export const DataPC = () => {

  const [opciones, setOpciones] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [opciones2, setOpciones2] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [opciones3, setOpciones3] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  const handleArtistChange = async (selected) => {
   /* if(selectedYear != null){
      setSelectedYear(null);
      setOpciones2([]);
      setSelectedAlbum(null);
      setOpciones3([])
    }else if(selectedAlbum != null){
      setSelectedYear(null);
      setOpciones2([]);
      setSelectedAlbum(null);
      setOpciones3([])
    }else if((selectedYear && selectedAlbum) == null){
      setSelectedYear(null);
      setOpciones2([]);
      setSelectedAlbum(null);
      setOpciones3([])*/
      //no se ha tocado nada
      //console.log(selected)
      //console.log("Nada seleccionado");
    /*  const req = await fetchAPI(`artistas/${selected.value}/years`,'GET')
      const opcionesAnios = req.map((objeto) => ({
        value: objeto.year,
        label: objeto.year
      }));
      setOpciones2(opcionesAnios);
      
      const req3 = await fetchAPI(`artistas/${selected.value}/albums`,'GET');
      const opcionesAlbums = req3.map((objeto) => ({
        value: objeto.album,
        label: objeto.album
      }));
      setOpciones3(opcionesAlbums);*/
    //}
   
    setSelectedArtist(selected);
  };

  const handleYearChange = (selected) => {

    /*if(selectedAlbum != null){
      setSelectedAlbum(null);
      setOpciones3([]);
    }else if(selectedAlbum== null){
      setSelectedAlbum(null);
      setOpciones3([]);
    }*/
    setSelectedYear(selected);
  };

  const handleAlbumChange = (selected) => {
    setSelectedAlbum(selected);
  };

  const AplicarFiltro = async () => {
	 if(selectedArtist == null && selectedYear ==null && selectedAlbum == null){
    //sin filtro
    const req = await fetchAPI(`getData`,'GET')
    setFilteredData(req);
   }else if(selectedArtist != null && selectedYear ==null && selectedAlbum == null){
    //filtrado solo por artista
    const req = await fetchAPI(`artistas/${selectedArtist.value}/dataArtist`,'GET')
    setFilteredData(req);
   }
   else if(selectedArtist == null && selectedYear != null && selectedAlbum == null){
    //filtrado solo por artista
    const req = await fetchAPI(`artistas/${selectedYear.value}/datayear`,'GET')
    setFilteredData(req);
   }else if(selectedArtist == null && selectedYear == null && selectedAlbum != null){
    //filtrado solo por album
    const req = await fetchAPI(`artistas/${selectedAlbum.value}/dataalbum`,'GET')
    setFilteredData(req);
   }
   else if(selectedArtist != null && selectedYear !=null && selectedAlbum == null){
    //filtrado por artista y Anio
    const req = await fetchAPI(`artistas/${selectedArtist.value}/${selectedYear.value}/dataArtisanio`,'GET')
    setFilteredData(req);
   }
   else if(selectedArtist != null && selectedYear ==null && selectedAlbum != null){
    //filtrado por artista y Anio
    const req = await fetchAPI(`artistas/${selectedArtist.value}/${selectedAlbum.value}/dataArtisalbum`,'GET')
    setFilteredData(req);
   }
   else if(selectedArtist == null && selectedYear !=null && selectedAlbum != null){
    //filtrado por album y Anio
    const req = await fetchAPI(`artistas/${selectedYear.value}/${selectedAlbum.value}/dataalbumanio`,'GET')
    setFilteredData(req);
   }

   else if(selectedArtist != null && selectedYear !=null && selectedAlbum != null){
    //filtrado por album y Anio
    const req = await fetchAPI(`artistas/${selectedArtist.value}/${selectedYear.value}/${selectedAlbum.value}/alldata`,'GET')
    setFilteredData(req);
   }
	};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetchAPI("artistas",'GET')
        const opcionesArtistas = req.map((objeto) => ({
          value: objeto.artist,
          label: objeto.artist
        }));
        setOpciones(opcionesArtistas);

        const req2 = await fetchAPI("anios",'GET');
        const opcionesAnios = req2.map((objeto) => ({
          value: objeto.year,
          label: objeto.year
        }));
        setOpciones2(opcionesAnios);

        const req3 = await fetchAPI("albums",'GET');
        const opcionesAlbums = req3.map((objeto) => ({
          value: objeto.album,
          label: objeto.album
        }));
        setOpciones3(opcionesAlbums);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);




  return (
    <div>
        <h1>Estadisticas</h1>
      <h3>Selecciona un artista, año y nombre del álbum:</h3>
      <div>
        <Select
          placeholder="Artista"
          options={opciones}
          value={selectedArtist}
          onChange={handleArtistChange}
        />
        <Select
          placeholder="Año"
          options={opciones2}
          value={selectedYear}
          onChange={handleYearChange}
        />
        <Select
          placeholder="Álbum"
          options={opciones3}
          value={selectedAlbum}
          onChange={handleAlbumChange}
        />
      </div>
      <div className="search-container"> 
      <button className="boton" onClick={AplicarFiltro}>
        FILTRAR
	  </button>
      </div>

      <table className="data-table">
	  <thead>
		<tr>
		  <th>No</th>
		  <th>ARTIST</th>
		  <th>ALBUM</th>
		  <th>RANKED</th>
		  <th>NUMBER VOTES</th>
		</tr>
	  </thead>
	  <tbody>
          {filteredData.map((item,index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index +1 }</td>
                <td>{item.artist}</td>
                <td>{item.album}</td>
                <td>{item.promedio}</td>
                <td>{item.cantidad_rankings}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
	</table>




    </div>
  )
}
