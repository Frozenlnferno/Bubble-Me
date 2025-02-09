import React, { useState, useRef } from 'react'
import { GoogleMap, LoadScript, Circle, InfoWindow } from '@react-google-maps/api'
import { NavLink } from 'react-router-dom'
import '../css/index.css'

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
  fullscreenControl: true, // Disable fullscreen control
  zoomControl: true, // Enable zoom control
  scaleControl: true, // Enable scale control
}

const circles = [
  { id: 1, lat: 40.694203, lng: -73.986579, radius: 50, color: 'rgba(255, 0, 0, 0.5)', stroke_color: 'rgba(255, 0, 0, 0.8)', title: 'NYU Hackathon', description: 'Location for NYU Hackathon 2025' },
  { id: 2, lat: 40.695203, lng: -73.987579, radius: 50, color: 'rgba(0, 200, 255, 0.5)', stroke_color: 'rgba(0, 200, 255, 0.8)', title: 'Circle 2', description: 'Description for Circle 2' },
  { id: 3, lat: 40.693203, lng: -73.987579, radius: 50, color: 'rgba(0, 255, 68, 0.5)', stroke_color: 'rgba(0, 255, 68, 0.8)', title: 'Free Pizza!', description: 'Free pizza mon-fri during dinner' },
  // Add more circles as needed
]

const Home = () => {
  const [zoom, setZoom] = useState(17)
  const [center, setCenter] = useState(initialCenter)
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [hoveredCircleId, setHoveredCircleId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const mapRef = useRef(null)

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
    setSearchTerm(event.target.value)
  }

  const filteredCircles = circles.filter(circle =>
    circle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circle.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search circles..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
      />
      <LoadScript googleMapsApiKey="AIzaSyCjqNB6gI0fYv37yoJkjoCvrw26-a2FT9Q">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={map => (mapRef.current = map)}
        >
          {filteredCircles.map((circle) => (
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
    </div>
  )
}

export default Home

