import { Link } from "react-router-dom"
import { CustomerServiceRoutes, AboutRoutes } from "../components/LayoutNavigation"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next';

export default function(){

    const {t} = useTranslation()
    const customerNavigation = CustomerServiceRoutes(t)
    const aboutNavigation = AboutRoutes(t)

    return (
        <div className='container mx-auto px-4 py-2 text-lg'>
            <div className='mx-2 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1'>
            
            <div>
                <h3 className='py-4'>Customer Service</h3>
                <ul>
                {customerNavigation.map((customerRoutes) => (
                    <li key={customerRoutes.navLink} className='py-1'>
                        <Link to={customerRoutes.navRoute}>{customerRoutes.navLink}</Link>
                    </li>
                ))}
                </ul>
                <div className='flex py-2'>
                    <ReactCountryFlag countryCode='CM' svg className='mr-2 my-2' />
                    <p>Cameroon</p>
                </div>
            </div>

            <div>
                <h3 className='py-4'>About Us</h3>
                <ul>
                {aboutNavigation.map((aboutRoutes) => (
                    <li key={aboutNavigation.navLink} className='py-1'>
                        <Link to={aboutRoutes.navRoute}>{aboutRoutes.navLink}</Link>
                    </li>
                ))}
                </ul>
            </div>

            </div>
        </div>
    )
}