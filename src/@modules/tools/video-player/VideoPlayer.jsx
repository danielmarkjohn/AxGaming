import React, { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'

export default function VideoPlayer() {
  const [video, setVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith('video/')) return

    const url = URL.createObjectURL(file)
    setVideo({
      name: file.name,
      url,
      type: file.type,
      size: file.size
    })
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = pos * duration
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate)
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
    }
  }

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Video Player</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Upload size={16} />
              Upload Video
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {video && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="mb-4">
              <video
                ref={videoRef}
                src={video.url}
                className="w-full rounded"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            {/* Controls */}
            <div className="space-y-3">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-gray-700 rounded cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => skip(-10)} className="p-2 hover:bg-white/10 rounded">
                    <SkipBack size={20} />
                  </button>
                  <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={() => skip(10)} className="p-2 hover:bg-white/10 rounded">
                    <SkipForward size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  
                  <select 
                    value={playbackRate} 
                    onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                    className="bg-surface border border-white/10 rounded px-2 py-1 text-sm"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>

                  <button onClick={toggleFullscreen} className="p-1 hover:bg-white/10 rounded">
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!video && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="text-muted mb-4">
              <Play size={48} className="mx-auto mb-2 opacity-50" />
              <p>Upload a video file to start playing</p>
              <p className="text-sm mt-2">Supports: MP4, WebM, AVI, MOV, and more</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}