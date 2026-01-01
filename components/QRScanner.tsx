
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, Zap, Image as ImageIcon, LayoutGrid } from 'lucide-react';

interface QRScannerProps {
  onClose: () => void;
  onGalleryClick?: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onClose, onGalleryClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay with transparent center */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Top Buttons */}
      <div className="absolute top-12 left-6 right-6 flex justify-between items-center z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={2.5} />
        </button>
        <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform">
          <Zap className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* Scanning Brackets Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 relative">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-white rounded-tl-[32px]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-white rounded-tr-[32px]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-white rounded-bl-[32px]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-white rounded-br-[32px]"></div>
        </div>
      </div>

      {/* Instruction text - Moved Higher */}
      <div className="absolute top-1/2 mt-40 left-0 right-0 text-center text-white/90 text-sm font-normal tracking-wide px-4 pointer-events-none">
        Наведите камеру на QR-код
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-16 items-start z-10 px-10">
        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => onGalleryClick?.()}
            className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-xl"
          >
            <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <span className="text-white text-sm font-normal tracking-wide">Галерея</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-xl">
            <LayoutGrid className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <span className="text-white text-sm font-normal tracking-wide">Мой QR</span>
        </div>
      </div>
    </div>
  );
};
