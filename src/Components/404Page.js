import { Link } from 'react-router-dom'

export default function({messageHeader, messageBody, homeRoute, homeNavigation, contactSupport, pageAlert}){
    return (
        <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-black">{messageHeader}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{pageAlert}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{messageBody}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={homeRoute}
                className="
                rounded-md bg-black px-3.5 
                py-2.5 text-sm font-semibold 
                text-white shadow-sm 
                hover:bg-black focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-gray-600"
              >
                {homeNavigation}
              </Link>
              <Link to="#" className="text-sm font-semibold text-gray-900">
                {contactSupport} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
}