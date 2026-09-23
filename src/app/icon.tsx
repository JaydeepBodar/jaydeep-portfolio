import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 8,
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
            borderRadius: 5,
            color: '#2dd4bf',
            fontSize: 16,
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
