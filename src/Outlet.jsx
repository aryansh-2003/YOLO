import Navbar from './Navbar/navbar'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom';



export default function Layout(){
    return(
        <>
        <Navbar/>
        <div className='md:pt-20'>
                    <Outlet/>

        </div>
        <div className='mb-20 md:m-0'>
        <Footer/>
        </div>
        </>
    )
}