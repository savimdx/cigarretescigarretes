import React from 'react';

interface HeaderBannerProps {
  timeLeft?: number;
}

export default function HeaderBanner(_props: HeaderBannerProps = {}) {
  return (
    <>
      <div className="bg-[#dc2626] text-white py-2.5 px-4 fixed top-0 inset-x-0 w-full z-50 shadow-md flex justify-center items-center text-xs sm:text-sm font-black tracking-wide border-b border-[#b91c1c] select-none text-center">
        <span className="font-black tracking-wider text-white uppercase text-xs sm:text-sm md:text-base drop-shadow-sm text-center">
          ABANDONE ESTE VÍCIO PARA SEMPRE!!!
        </span>
      </div>
      {/* Spacer to prevent content from jumping under fixed banner */}
      <div className="h-11 sm:h-12 w-full" aria-hidden="true" />
    </>
  );
}
