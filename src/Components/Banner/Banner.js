import { Link } from "react-router-dom";
import watch from "./watch.png.webp";

const Banner = () => {
  return (
    <div className=" bg-red-50 mb-2">
      <div
        className="
            container flex justify-center 
            items-center mx-auto px-auto grid lg:grid-cols-2
            gap-80"
      >
        {/* Banner Text */}
        <div className="grid justify-center items-center mb-8 my-8 px-20 overflow-hidden">
          <p className="font-bold text-5xl mb-10 uppercase text-red-500">
            select your new perfect style
          </p>
          <p className="uppercase mt-4 mb-7 text-2xl text-red-500">
            enjoy up to 20% off select pre-owned with code
            <span className="font-bold"> MARCH4103'</span>
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="
                        text-red-500 text-xl
                        animate-bounce
                        rounded-full border-4 border-red-500 
                        hover:bg-red-500 hover:text-white 
                        cursor-pointer uppercase font-bold 
                        transition:ease-out duration-300 
                        tracking-widest p-3"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Link to="/shop" >shop now</Link>
            </button>
          </div>
        </div>
        {/* Banner Image */}
        <div className="hidden lg:block">
          <img src={watch} alt="rolex_watch" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
