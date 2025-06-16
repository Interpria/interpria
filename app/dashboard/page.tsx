import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (  
    <>
      <div className='d-flex flex-column align-items-center justify-content-center gap-5 p-5 m-5'>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/user' className='btn btn-outline-warning'>Manage User</Link>
          <Link href='/dashboard/booking' className='btn btn-outline-warning'>Manage Booking</Link>
        </div>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/attraction' className='btn btn-outline-warning'>Manage Attraction</Link>
          <Link href='/dashboard/availability-attraction' className='btn btn-outline-secondary'>Manage Attraction's Availability</Link>
        </div>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/interpreter' className='btn btn-outline-warning'>Manage Interpreter</Link>
          <Link href='/dashboard/interpreterxlanguage' className='btn btn-outline-secondary'>Manage Interpreter x Language</Link>
          <Link href='/dashboard/availability-interpreter' className='btn btn-outline-secondary'>Manage Interpreter's Availability</Link>
          <Link href='/dashboard/interpreterxattraction' className='btn btn-outline-secondary'>Manage Interpreter x Attraction</Link>
        </div>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/language' className='btn btn-outline-warning'>Manage Language</Link>
        </div>
      </div>
    </>
  );
}
