'use client';

import React from 'react';

export default function WhatsAppFloat() {
  const phoneNumber = '212638443209';
  const message = encodeURIComponent('Hello Morocco View Travel, I would like to inquire about your tours!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float-btn" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Chat with us on WhatsApp"
      id="whatsapp-floating-btn"
    >
      {/* Tooltip */}
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>

      {/* Official WhatsApp Green Circular Icon */}
      <div className="whatsapp-icon-circle">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFFFFF">
          <path d="M16 2a13.94 13.94 0 0 0-12 21L2 30l7.24-1.9a13.95 13.95 0 1 0 6.76-26.1zm7.88 19.34c-.33.93-1.63 1.77-2.67 2-.72.15-1.65.27-4.81-1.04-4.04-1.67-6.64-5.78-6.84-6.05s-1.65-2.2-1.65-4.19c0-1.99 1.04-2.97 1.41-3.37.37-.4.81-.5 1.08-.5.27 0 .54 0 .78.01.25.01.59-.09.92.71.34.81 1.17 2.85 1.27 3.06.1.2.17.44.03.71-.13.27-.2.44-.4.68-.2.24-.42.5-.6.67-.2.19-.41.39-.18.79.23.39 1.03 1.7 2.21 2.75 1.52 1.35 2.8 1.77 3.2 1.97.4.2.63.17.86-.1.23-.27.98-1.14 1.24-1.53.27-.39.54-.33.91-.19.37.14 2.37 1.12 2.77 1.32.4.2.67.3.77.47.1.17.1 1.01-.23 1.94z"/>
        </svg>
      </div>

      {/* Pulsing Outer Ring */}
      <span className="whatsapp-pulse-ring"></span>
    </a>
  );
}
