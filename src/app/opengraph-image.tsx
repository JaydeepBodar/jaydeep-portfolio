import { ImageResponse } from 'next/og';
import { personalInfo } from '../data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: '#020617',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(45,212,191,0.18), transparent 45%), radial-gradient(circle at 85% 85%, rgba(139,92,246,0.18), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%)',
              color: '#020617',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            JB
          </div>
          <div style={{ display: 'flex', color: '#2dd4bf', fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
            PORTFOLIO
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          {personalInfo.name}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 600,
            marginTop: 20,
            background: 'linear-gradient(to right, #2dd4bf, #a78bfa, #34d399)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {personalInfo.title}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#94a3b8',
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {personalInfo.focus} — {personalInfo.location}
        </div>
      </div>
    ),
    { ...size }
  );
}
