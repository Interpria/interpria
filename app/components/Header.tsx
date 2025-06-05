import Link from 'next/link';
import Image from 'next/image';
export default function Header() {
  const heightLogo = 40;
  const widthLogo = 890 * heightLogo / 269;
  return (
    <header   className="d-flex justify-content-around align-items-center py-2"
    style={{ backgroundColor: "var(--light-background)" }}> 
      <Link href='/'><Image src="/logo.png" alt="Logo" height={heightLogo} width={widthLogo} /></Link>
      <h2 className='fs-3'>Admin Dashboard</h2> 
      <Link href='/user/register' className='btn btn-outline-warning'>
        Register
      </Link>
      <Link href='/user/login' className='btn btn-outline-warning'>
        Login
      </Link>
    </header> 
  ); 
} 


// if loggedIn 
// .navbutton 
//   a(href="/user/logout") Logout
// else 
// .navbutton 
//   a(href="/user/login") Login