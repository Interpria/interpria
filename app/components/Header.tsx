'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const heightLogo = 50;
  const widthLogo = 890 * heightLogo / 269;
  const [loggedIn, setLoggedIn] = useState(false);
  const [flagDropdownOpen, setFlagDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const flagDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [isInterpreter, setIsInterpreter] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(!!data.user);
          // Check if user is an interpreter
          if (data.user && data.user.userId) {
            const userRes = await fetch(`/api/user/${data.user.userId}`);
            if (userRes.ok) {
              const userData = await userRes.json();
              setIsInterpreter(
                !!(Array.isArray(userData) ? userData[0]?.interpreter_id : userData?.interpreter_id)
              );
            }
          }
        } else {
          setLoggedIn(false);
          setIsInterpreter(false);
        }
      } catch {
        setLoggedIn(false);
        setIsInterpreter(false);
      }
    };
    checkLogin();
  }, []);

  // Close flag dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (flagDropdownRef.current && !flagDropdownRef.current.contains(event.target as Node)) {
        setFlagDropdownOpen(false);
      }
    }
    if (flagDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [flagDropdownOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="d-flex justify-content-around align-items-center py-3"
      style={{ backgroundColor: "var(--light-background)" }}>
      <Link href='/'><Image src="/logo.png" alt="Logo" height={heightLogo} width={widthLogo} /></Link>
      <h2 className='fs-3' style={{ color: "var(--orange-deep)" }}>Welcome and find your interpreter</h2>
      <div className="d-flex align-items-center gap-2">
        {mounted && loggedIn && (
          isInterpreter ? (
            <div className="position-relative" ref={flagDropdownRef}>
              <button type="button">
                <i
                  className="bi bi-flag-fill mr-8"
                  onClick={() => setFlagDropdownOpen((open) => !open)}
                  aria-label="Interpreter menu"
                  style={{ fontSize: 40, color: 'var(--orange-deep)' }}
                  title="You are an interpreter"
                ></i>
              </button>
              {flagDropdownOpen && (
                <div className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow" style={{ minWidth: 150, zIndex: 1000 }}>
                  <Link href="/profile/interpreter" className="dropdown-item d-block py-1 px-2" onClick={() => setFlagDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/profile/interpreter/booking" className="dropdown-item d-block py-1 px-2" onClick={() => setFlagDropdownOpen(false)}>
                    Booking
                  </Link>
                  <Link href="/profile/interpreter/attraction" className="dropdown-item d-block py-1 px-2" onClick={() => setFlagDropdownOpen(false)}>
                    Attraction
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href='/profile/interpreter/register' className='btn btn-outline-warning'>
              Become an Interpreter
            </Link>
          )
        )}

        {mounted && (
          loggedIn ? (
            <div className="position-relative" ref={userDropdownRef}>
              <button type="button">
                <i className="bi bi-person-circle" onClick={() => setUserDropdownOpen((open) => !open)}
                  aria-label="User menu" style={{ fontSize: 40, color: 'var(--orange-deep)' }}></i>
              </button>
              {userDropdownOpen && (
                <div className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow" style={{ minWidth: 150, zIndex: 1000 }}>
                  <Link href="/profile/user" className="dropdown-item d-block py-1 px-2" onClick={() => setUserDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/profile/user/booking" className="dropdown-item d-block py-1 px-2" onClick={() => setUserDropdownOpen(false)}>
                    Booking
                  </Link>
                  <button
                    className="dropdown-item d-block py-1 px-2"
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await handleLogout();
                    }}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href='/auth/login' className='btn btn-outline-warning'>
              Login
            </Link>
          )
        )}
      </div>
    </header>
  );
}