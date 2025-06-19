'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const heightLogo = 40;
  const widthLogo = 890 * heightLogo / 269;
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(!!data.user);
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="d-flex justify-content-around align-items-center py-3"
      style={{ backgroundColor: "var(--light-background)" }}>
      <Link href='/'><Image src="/logo.png" alt="Logo" height={heightLogo} width={widthLogo} /></Link>
      <h2 className='fs-3' style={{ color: "var(--orange-deep)" }}>Welcome and select your destination</h2>
      <div className="d-flex align-items-center gap-2">
        <Link href='/auth/register' className='btn btn-outline-warning'>
          Register
        </Link>
        {loggedIn ? (
          <div className="position-relative" ref={dropdownRef}>
            <button
              className="btn btn-outline-warning d-flex align-items-center"
              style={{ borderRadius: '50%', width: 40, height: 40, padding: 0 }}
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="User menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow" style={{ minWidth: 150, zIndex: 1000 }}>
                <Link href="/dashboard/user/profile" className="dropdown-item d-block py-1 px-2" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                <Link href="/dashboard/booking" className="dropdown-item d-block py-1 px-2" onClick={() => setDropdownOpen(false)}>
                  Booking
                </Link>
                <Link href="/auth/logout" className="dropdown-item d-block py-1 px-2" onClick={() => setDropdownOpen(false)}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href='/auth/login' className='btn btn-outline-warning'>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}


// if loggedIn 
// .navbutton 
//   a(href="/user/logout") Logout
// else 
// .navbutton 
//   a(href="/user/login") Login