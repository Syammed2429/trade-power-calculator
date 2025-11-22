import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className='w-full py-4 mt-8 border-t border-slate-800 text-center text-xs text-white'>
      Made with ❤️ by
      <Link
        href={"https://github.com/Syammed2429"}
        target='_blank'
        className='mx-1 underline hover:text-slate-400 text-white'
      >
        Khalandar
      </Link>
    </footer>
  );
};
