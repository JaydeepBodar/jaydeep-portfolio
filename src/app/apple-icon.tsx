import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%)',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: '82%',
            height: '82%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#020617',
            borderRadius: 28,
            color: '#2dd4bf',
            fontSize: 88,
            fontWeight: 800,
            fontFamily: 'sans-serif',
          }}
        >
          JB
        </div>
      </div>
    ),
    { ...size }
  );
}
