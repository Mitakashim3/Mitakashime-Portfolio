"use client"

export function BlackHole() {
  return (
    <div className="w-full h-96 relative">
      <div className="sketchfab-embed-wrapper w-full h-full">
        <iframe
          title="Blackhole"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src="https://sketchfab.com/models/74cbeaeae2174a218fe9455d77902b5c/embed"
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}
