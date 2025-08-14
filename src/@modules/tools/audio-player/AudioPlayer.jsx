import React, { useState, useRef, useEffect } from 'react'
import { Upload, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react'

export default function AudioPlayer() {
  const [playlist, setPlaylist] = useState([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState('none') // none, one, all
  const audioRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'))
    
    const newTracks = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name.replace(/\.[^/.]+$/, ""),
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size
    }))

    setPlaylist(prev => [...prev, ...newTracks])
    if (playlist.length === 0 && newTracks.length > 0) {
      setCurrentTrack(0)
    }
  }

  const togglePlay = () => {
    if (audioRef.current && playlist.length > 0) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playTrack = (index) => {
    setCurrentTrack(index)
    setIsPlaying(true)
  }

  const nextTrack = () => {
    if (playlist.length === 0) return
    
    let nextIndex
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length)
    } else {
      nextIndex = (currentTrack + 1) % playlist.length
    }
    setCurrentTrack(nextIndex)
  }

  const prevTrack = () => {
    if (playlist.length === 0) return
    
    const prevIndex = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
    setCurrentTrack(prevIndex)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else if (repeatMode === 'all' || currentTrack < playlist.length - 1) {
      nextTrack()
    } else {
      setIsPlaying(false)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const time = pos * duration
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const removeTrack = (index) => {
    const newPlaylist = playlist.filter((_, i) => i !== index)
    setPlaylist(newPlaylist)
    if (index === currentTrack && newPlaylist.length > 0) {
      setCurrentTrack(0)
    } else if (index < currentTrack) {
      setCurrentTrack(currentTrack - 1)
    }
  }

  useEffect(() => {
    if (audioRef.current && playlist[currentTrack]) {
      audioRef.current.src = playlist[currentTrack].url
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrack, playlist])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Audio Player</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Upload size={16} />
              Add Audio Files
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {playlist.length > 0 && (
          <>
            {/* Now Playing */}
            <div className="panel panel-border p-6 rounded-xl">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">{playlist[currentTrack]?.name}</h3>
                <p className="text-sm text-muted">Track {currentTrack + 1} of {playlist.length}</p>
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-gray-700 rounded cursor-pointer mb-4"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`p-2 rounded ${isShuffled ? 'bg-blue-600' : 'hover:bg-white/10'}`}
                  >
                    <Shuffle size={16} />
                  </button>
                  <button onClick={prevTrack} className="p-2 hover:bg-white/10 rounded">
                    <SkipBack size={20} />
                  </button>
                  <button onClick={togglePlay} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded">
                    <SkipForward size={20} />
                  </button>
                  <button 
                    onClick={() => setRepeatMode(repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none')}
                    className={`p-2 rounded ${repeatMode !== 'none' ? 'bg-blue-600' : 'hover:bg-white/10'}`}
                  >
                    <Repeat size={16} />
                    {repeatMode === 'one' && <span className="text-xs ml-1">1</span>}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => {
                        const vol = parseFloat(e.target.value)
                        setVolume(vol)
                        if (audioRef.current) audioRef.current.volume = vol
                      }}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="panel panel-border p-4 rounded-xl">
              <h3 className="text-lg font-medium mb-3">Playlist ({playlist.length} tracks)</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {playlist.map((track, index) => (
                  <div 
                    key={track.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                      index === currentTrack ? 'bg-blue-600/20' : 'hover:bg-white/5'
                    }`}
                    onClick={() => playTrack(index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted w-6">{index + 1}</span>
                      <span className="text-sm">{track.name}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        removeTrack(index)
                      }}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {playlist.length === 0 && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="text-muted mb-4">
              <Volume2 size={48} className="mx-auto mb-2 opacity-50" />
              <p>Upload audio files to start playing</p>
              <p className="text-sm mt-2">Supports: MP3, WAV, OGG, AAC, and more</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}