import React, { useState, useRef, useEffect } from 'react'
import { GoogleMap, LoadScript, Circle, InfoWindow, Marker } from '@react-google-maps/api'
import { NavLink } from 'react-router-dom'
import '../css/index.css'
import communityButton from '../assets/community.png'

const containerStyle = {
  width: '100vw',
  height: '100vh'
}

const initialCenter = {
  lat: 40.694203,
  lng: -73.986579
}

const mapOptions = {
  streetViewControl: false, // Disable Street View control
  mapTypeControl: false, // Disable map type control
  fullscreenControl: true, // Enable fullscreen control
  zoomControl: true, // Enable zoom control
  scaleControl: true, // Enable scale control
}

const circles = [
  { id: 1, lat: 40.694203, lng: -73.986579, radius: 50, color: 'rgba(255, 0, 0, 0.5)', stroke_color: 'rgba(255, 0, 0, 0.8)', title: 'HackNYU', description: 'HackNYU is a 48-hour hackathon hosted by NYU students around the world. Come build your dream project, learn from our talks and mentors, and win prizes! Date: 2/8/25-2/9/25' },
  { id: 2, lat: 42.360001, lng: -71.092003, radius: 50, color: 'rgba(0, 200, 255, 0.5)', stroke_color: 'rgba(0, 200, 255, 0.8)', title: 'HackMIT', description: 'HackMIT is a weekend-long event where students from around the globe work together to design and build innovative technology projects. As one of the largest hackathons in the world, we welcome over 1,000 talented undergraduate students to MIT\'s campus each fall.' },
  { id: 3, lat: 40.692203, lng: -73.98710, radius: 30, color: 'rgba(0, 255, 68, 0.5)', stroke_color: 'rgba(0, 255, 68, 0.8)', title: 'Supreme Pizza', description: 'Free pizza mon-fri during dinner' },
  { id: 4, lat: 42.2780, lng: -83.7382, radius: 50, color: 'rgba(0, 0, 255, 0.5)', stroke_color: 'rgba(0, 0, 255, 0.8)', title: 'MHack', description: 'MHack is a hackathon hosted by the University of Michigan. Join us for a weekend of innovation and creativity!' },
  { id: 5, lat: 40.1020, lng: -88.2272, radius: 50, color: 'rgba(255, 165, 0, 0.5)', stroke_color: 'rgba(255, 165, 0, 0.8)', title: 'HackIllinois', description: 'HackIllinois is a hackathon hosted by the University of Illinois at Urbana-Champaign. Come and build amazing projects with us!' },
  { id: 6, lat: 40.697203, lng: -73.984579, radius: 40, color: 'rgba(255, 0, 200, 0.5)', stroke_color: 'rgba(255, 0, 200, 0.8)', title: '', description: '' },
  { id: 7, lat: 40.695203, lng: -73.988579, radius: 30, color: 'rgba(255, 238, 0, 0.5)', stroke_color: 'rgba(255, 238, 0, 0.8)', title: '', description: '' },
  { id: 8, lat: 40.699203, lng: -73.989579, radius: 20, color: 'rgba(255, 0, 93, 0.5)', stroke_color: 'rgba(255, 0, 93, 0.8)', title: '', description: '' },
  { id: 9, lat: 40.695203, lng: -73.988579, radius: 30, color: 'rgba(255, 123, 0, 0.5)', stroke_color: 'rgba(255, 123, 0, 0.8)', title: '', description: '' },
  { id: 10, lat: 40.712203, lng: -73.989579, radius: 40, color: 'rgba(93, 0, 255, 0.5)', stroke_color: 'rgba(93, 0, 255, 0.8)', title: '', description: '' },
  { id: 11, lat: 40.691203, lng: -73.988579, radius: 30, color: 'rgba(0, 115, 255, 0.5)', stroke_color: 'rgba(0, 115, 255, 0.8)', title: '', description: '' },
  { id: 12, lat: 40.694203, lng: -73.995079, radius: 25, color: 'rgba(0, 255, 145, 0.5)', stroke_color: 'rgba(0, 255, 145, 0.8)', title: '', description: '' },
]

const Home = () => {
  const [zoom, setZoom] = useState(17)
  const [center, setCenter] = useState(initialCenter)
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [hoveredCircleId, setHoveredCircleId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const mapRef = useRef(null)

  useEffect(() => {
    // Get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          setCenter({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error("Error getting current location:", error)
        }
      )
    }
  }, [])

  const handleCircleClick = (circle) => {
    setSelectedCircle(circle)
    if (mapRef.current) {
      mapRef.current.panTo({ lat: circle.lat, lng: circle.lng })
    }
  }

  const handleMouseOver = (circleId) => {
    setHoveredCircleId(circleId)
  }

  const handleMouseOut = () => {
    setHoveredCircleId(null)
  }

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
    if (searchTerm) {
      const results = circles.filter(circle =>
        circle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circle.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSearchResultClick = (circle) => {
    setSelectedCircle(circle)
    setCenter({ lat: circle.lat, lng: circle.lng })
    setZoom(18)
    setSearchTerm('')
    setSearchResults([])
  }

  return (
    <div className="app">
      <input className='search-bar'
        type="text"
        placeholder="Search bubbles..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
      />
      {searchResults.length > 0 && (
        <ul className="search-results" style={{ position: 'absolute', top: '40px', left: '10px', zIndex: 1000, backgroundColor: 'white', listStyleType: 'none', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          {searchResults.map((circle) => (
            <li className='search' key={circle.id} onClick={() => handleSearchResultClick(circle)} style={{ cursor: 'pointer', padding: '5px 0' }}>
              {circle.title}
            </li>
          ))}
        </ul>
      )}
      <LoadScript googleMapsApiKey="AIzaSyCjqNB6gI0fYv37yoJkjoCvrw26-a2FT9Q">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={map => (mapRef.current = map)}
        >
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              center={{ lat: circle.lat, lng: circle.lng }}
              radius={hoveredCircleId === circle.id ? circle.radius * 1.05 : circle.radius}
              options={{
                fillColor: circle.color,
                strokeColor: circle.stroke_color,
                strokeWeight: 2,
                clickable: true,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
              }}
              onClick={() => handleCircleClick(circle)}
              onMouseOver={() => handleMouseOver(circle.id)}
              onMouseOut={handleMouseOut}
            />
          ))}
          {currentLocation && (
            <>
              <Marker
                position={currentLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
              <Circle
                center={currentLocation}
                radius={10}
                options={{
                  fillColor: 'rgba(0, 110, 255, 0.95)',
                  strokeWeight: 0,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  zIndex: 2,
                }}
              />
            </>
          )}
          {selectedCircle && (
            <InfoWindow
              position={{ lat: selectedCircle.lat, lng: selectedCircle.lng }}
              onCloseClick={() => setSelectedCircle(null)}
            >
              <div className='info-window'>
                <h2>{selectedCircle.title}</h2>
                <p>{selectedCircle.description}</p>
                <NavLink to="/bubbleinfo">
                  <button>Join</button>
                </NavLink>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <NavLink className='community-button' to="/community">
        <img src={communityButton} alt="Community" className="community-button-image" />
      </NavLink>
    </div>
  )
}

export default Home