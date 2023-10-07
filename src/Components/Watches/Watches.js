import Junghan from './Junghans.jpg';
import Maurice from './Maurice Lacroix.jpg';
import Polar from './Polar_Vantage-M2_frontleft_black_HR153.jpg';
import Unisex from './Unisex Marathon.jpg'; 

const Watches = () => {

    return (
        <div className= "container mx-auto px-4 grid lg:grid-cols-3" style={{ marginTop: '10rem', marginBottom: '8rem' }}>
            <div>
                <img src={Polar} alt='polar_vantage_watch' style={{ height: '40.5rem', width: '20rem' }} />
            </div>
            <div>
                <img src={Unisex} alt='unisex_marathon_watch' style={{ height: '40.5rem', width: '20rem' }} />
            </div>
            <div className='grid lg:grid-rows-2 gap-2'>
                <div>
                    <img src={Junghan} alt='junghans_watch' style={{ height: '20rem', width: '20rem' }} />
                </div>
                <div>
                    <img src={Maurice} alt='maurice_lacroix' style={{ height: '20rem', width: '20rem' }} />
                </div>
            </div>
        </div>
    );

};

export default Watches;