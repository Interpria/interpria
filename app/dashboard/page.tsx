import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (  
    <>
      <div className='d-flex flex-column align-items-center justify-content-center gap-5 p-5 m-5'>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/user' className='btn btn-outline-warning'>Manage User</Link>
          <Link href='/dashboard/user/booking' className='btn btn-outline-warning'>Manage Booking</Link>
        </div>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/attraction' className='btn btn-outline-warning'>Manage Attraction</Link>
          <Link href='/dashboard/attraction/availability-attraction' className='btn btn-outline-warning'>Manage Attraction's Availability</Link>
        </div>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5'>
          <Link href='/dashboard/interpreter' className='btn btn-outline-warning'>Manage Interpreter</Link>
          <Link href='/dashboard/interpreter/language' className='btn btn-outline-warning'>Manage Language</Link>
          <Link href='/dashboard/interpreter/interpreterxlanguage' className='btn btn-outline-warning'>Manage Interpreter x Language</Link>
          <Link href='/dashboard/interpreter/availability-interpreter' className='btn btn-outline-warning'>Manage Interpreter's Availability</Link>
          <Link href='/dashboard/interpreter/interpreterxattraction' className='btn btn-outline-warning'>Manage Interpreter x Attraction</Link>
        </div>
      </div>
    </>
  );
}
