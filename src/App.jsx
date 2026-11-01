import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('api');
  
  // Estados para (PokeAPI)
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonId, setPokemonId] = useState(25); // Pikachu por defecto

  // Formulario
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [enviado, setEnviado] = useState(false);

  // Obtener datos de la API pública (PokeAPI)
  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar la API:", err);
        setLoading(false);
      });
  }, [pokemonId]);

  // Array local de objetos con imagen
  const localItems = [
    {
      id: 1,
      titulo: "Bulbasaur",
      tipo: "Planta / Veneno",
      descripcion: "Este Pokémon germina una semilla desde que nace, la cual crece con él a lo largo de su vida.",
      imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
      id: 2,
      titulo: "Charmander",
      tipo: "Fuego",
      descripcion: "La llama en su cola indica su estado vital. Si está débil, la llama arde con menos intensidad.",
      imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
      id: 3,
      titulo: "Squirtle",
      tipo: "Agua",
      descripcion: "Cuando retrae su largo cuello en el caparazón, dispara agua a una presión considerable.",
      imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    }
  ];

  // Manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={styles.container}>
      {/* Barra de Navegación (SPA) */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Trabajo Práctico React</div>
        <div style={styles.navLinks}>
          <button 
            style={currentPage === 'api' ? styles.activeTab : styles.tab} 
            onClick={() => setCurrentPage('api')}
          >
            Consigna A (API)
          </button>
          <button 
            style={currentPage === 'local' ? styles.activeTab : styles.tab} 
            onClick={() => setCurrentPage('local')}
          >
            Consigna B (Local)
          </button>
          <button 
            style={currentPage === 'contact' ? styles.activeTab : styles.tab} 
            onClick={() => setCurrentPage('contact')}
          >
            Consigna C (Contacto)
          </button>
        </div>
      </nav>

      {/* Contenido Dinámico según la Página */}
      <main style={styles.main}>
        {currentPage === 'api' && (
          <div style={styles.section}>
            <h2>Consigna A: Datos desde una API Pública (PokeAPI)</h2>
            <p>Se consumen más de 3 datos y una imagen obligatoria usando <code>fetch</code> y <code>useEffect</code>.</p>
            
            <div style={styles.selectorContainer}>
              <button style={styles.btnSelect} onClick={() => setPokemonId(Math.floor(Math.random() * 150) + 1)}>
                Cargar Pokémon Aleatorio
              </button>
            </div>

            {loading ? (
              <p>Cargando datos de la API...</p>
            ) : pokemon ? (
              <div style={styles.card}>
                {/* Imagen obligatoria */}
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                  style={styles.image}
                />
                <h3>{pokemon.name.toUpperCase()}</h3>
                <ul style={styles.list}>
                  {/* Más de 3 datos requeridos */}
                  <li><strong>Tipo principal:</strong> {pokemon.types[0].type.name}</li>
                  <li><strong>Altura:</strong> {pokemon.height / 10} m</li>
                  <li><strong>Peso:</strong> {pokemon.weight / 10} kg</li>
                  <li><strong>Experiencia Base:</strong> {pokemon.base_experience} XP</li>
                </ul>
              </div>
            ) : (
              <p>No se pudieron cargar los datos.</p>
            )}
          </div>
        )}

        {currentPage === 'local' && (
          <div style={styles.section}>
            <h2>Consigna B: Datos desde un Array Local de Objetos</h2>
            <p>Elementos renderizados a partir de una estructura local con sus respectivas imágenes.</p>
            
            <div style={styles.grid}>
              {localItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <img src={item.imagen} alt={item.titulo} style={styles.image} />
                  <h3>{item.titulo}</h3>
                  <p><strong>Tipo:</strong> {item.tipo}</p>
                  <p>{item.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div style={styles.section}>
            <h2>Consigna C: Formulario de Contacto y Mapa</h2>
            <div style={styles.contactLayout}>
              {/* Formulario funcional */}
              <div style={styles.formContainer}>
                {enviado ? (
                  <div style={styles.successBox}>
                    <h3>¡Mensaje enviado con éxito!</h3>
                    <p>Gracias por contactarte. El mensaje ha sido procesado.</p>
                    <button style={styles.btnSelect} onClick={() => setEnviado(false)}>Enviar otro</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={styles.form}>
                    <h3>Formulario de Contacto</h3>
                    <div style={styles.formGroup}>
                      <label>Nombre:</label>
                      <input 
                        type="text" 
                        required 
                        style={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label>Correo Electrónico:</label>
                      <input 
                        type="email" 
                        required 
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label>Mensaje:</label>
                      <textarea 
                        required 
                        style={{...styles.input, height: '100px'}}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button type="submit" style={styles.btnSubmit}>Enviar Mensaje</button>
                    <div style={{marginTop: '10px'}}>
                      <a 
                        href={`mailto:tu-correo@example.com?subject=Contacto desde la Web&body=Nombre: ${formData.name}%0D%0AMensaje: ${formData.message}`}
                        style={styles.mailLink}
                      >
                        O enviar mediante cliente de correo (Mailto)
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* Mapa embebido */}
              <div style={styles.mapContainer}>
                <h3>Ubicación</h3>
                <iframe 
                  title="Ubicación Mapa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889445!2d-58.38413162349733!3d-34.603738857272895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb6%3A0x11bead4e6345be58!2sObelisco!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar" 
                  width="100%" 
                  height="350" 
                  style={{border: 0, borderRadius: '8px'}} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Estilos limpios y organizados en objeto CSS-in-JS
const styles = {
  container: { fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f7f6', minHeight: '100vh' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2c3e50', color: 'white', padding: '1rem 2rem' },
  logo: { fontSize: '1.2rem', fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '10px' },
  tab: { backgroundColor: 'transparent', border: 'none', color: 'white', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', fontSize: '0.95rem' },
  activeTab: { backgroundColor: '#3498db', border: 'none', color: 'white', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', fontSize: '0.95rem', fontWeight: 'bold' },
  main: { padding: '2rem', maxWidth: '1100px', margin: '0 auto' },
  section: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  selectorContainer: { margin: '1.5rem 0', textAlign: 'center' },
  btnSelect: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '350px', margin: '0 auto' },
  image: { width: '150px', height: '150px', objectFit: 'contain', marginBottom: '1rem' },
  list: { listStyle: 'none', padding: 0, textAlign: 'left', marginTop: '1rem', lineHeight: '1.6' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '1.5rem' },
  contactLayout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '1.5rem' },
  formContainer: { backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  btnSubmit: { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  mailLink: { color: '#2980b9', fontSize: '0.9rem', textDecoration: 'none' },
  mapContainer: { backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' },
  successBox: { textAlign: 'center', padding: '2rem' }
};