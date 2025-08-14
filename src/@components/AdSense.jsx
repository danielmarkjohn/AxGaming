import React, { useEffect } from 'react'

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = {},
  className = ''
}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.log('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-9934152871716402"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// Predefined ad components for common placements
export function BannerAd({ className = '' }) {
  return (
    <AdSense
      adSlot="1234567890" // Replace with your actual ad slot ID
      adFormat="horizontal"
      className={`banner-ad ${className}`}
      style={{ minHeight: '90px' }}
    />
  )
}

export function SidebarAd({ className = '' }) {
  return (
    <AdSense
      adSlot="0987654321" // Replace with your actual ad slot ID
      adFormat="vertical"
      className={`sidebar-ad ${className}`}
      style={{ minHeight: '250px', minWidth: '300px' }}
    />
  )
}

export function InContentAd({ className = '' }) {
  return (
    <AdSense
      adSlot="1122334455" // Replace with your actual ad slot ID
      adFormat="fluid"
      className={`in-content-ad ${className}`}
      style={{ minHeight: '200px' }}
    />
  )
}