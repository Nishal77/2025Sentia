import React from 'react';
import { Icons } from './icon';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <a href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-6 h-6" />
              <h2 className="text-lg font-bold font-panchang">Sentia</h2>
            </a>

            <div className="mt-2">
              <a href="mailto:euphoria@mite.ac.in" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button variant='secondary' className="bg-gray-50 hover:bg-gray-100 cursor-pointer" onClick={() => window.location.href = 'mailto:euphoria@mite.ac.in'}>
                  Share Your Thoughts
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </Button>
              </a>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-500 mt-5">
              © {new Date().getFullYear()} Sentia. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#programme" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Programme
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/nSvnC4G3jJRe8nsK7" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Venue
                  </a>
                </li>
                <li>
                  <a href="/register" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Registration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.youtube.com/channel/UCVtkd2xIFa3RmBNSsjU4ewQ" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Youtube
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/miteedu/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/MITEedu/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/sentia.mite/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[7.5rem] mt-10 font-panchang bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-100 select-none font-bold">
            SENTIA 2025
          </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 