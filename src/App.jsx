import React, { useState, useRef } from 'react'
import { GoogleMap, LoadScript, Circle, InfoWindow } from '@react-google-maps/api'
import './App.css'

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
  { lat: 40.694203, lng: -73.986579, radius: 50, info: 'Circle 1 Info' },
  { lat: 40.695203, lng: -73.987579, radius: 100, info: 'Circle 2 Info' },
  // Add more circles as needed
]

function App() {
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState(initialCenter)
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [hoveredCircle, setHoveredCircle] = useState(null)
  const mapRef = useRef(null)

  const handleCircleClick = (circle) => {
    setSelectedCircle(circle)
    if (mapRef.current) {
      mapRef.current.panTo({ lat: circle.lat, lng: circle.lng })
    }
  }

  const handleMouseOver = (circle) => {
    setHoveredCircle(circle)
  }

  const handleMouseOut = () => {
    setHoveredCircle(null)
  }

  return (
    <div className="app">
      <LoadScript googleMapsApiKey="AIzaSyCjqNB6gI0fYv37yoJkjoCvrw26-a2FT9Q">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={map => (mapRef.current = map)}
        >
          {circles.map((circle, index) => (
            <Circle
              key={index}
              center={{ lat: circle.lat, lng: circle.lng }}
              radius={hoveredCircle === circle ? circle.radius * 1.5 : circle.radius}
              options={{
                fillColor: 'rgba(255, 0, 0, 0.5)',
                strokeColor: 'rgba(255, 0, 0, 0.8)',
                strokeWeight: 2,
                clickable: true,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
              }}
              onClick={() => handleCircleClick(circle)}
              onMouseOver={() => handleMouseOver(circle)}
              onMouseOut={handleMouseOut}
            />
          ))}
          {selectedCircle && (
            <InfoWindow
              position={{ lat: selectedCircle.lat, lng: selectedCircle.lng }}
              onCloseClick={() => setSelectedCircle(null)}
            >
              <div>
                <h2>Info</h2>
                <p>{selectedCircle.info}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default App