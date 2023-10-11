import {Link} from 'react-router-dom'
import { IonIcon } from "@ionic/react";
import { bagHandleOutline } from 'ionicons/icons';

export default function(){
    return (
        <Link className='ml-6' to='cart' >
            {/* <IonIcon icon='bag-handle-outline' style={{color:'black'}} /> */}
            <IonIcon icon={bagHandleOutline} size='large' />
        </Link>
    )
}

