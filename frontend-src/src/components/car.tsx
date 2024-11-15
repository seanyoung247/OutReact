
import CarImg from '../assets/car-plain.svg'

export const Car = () => (
    <div className="car" style={{
        position: 'absolute',
        left: '50%',
        bottom: '0',
        width: '50lvh',
        maxWidth: '50lvw',
        transform: 'translate3d(-50%,0,-1lvh)'
    }}>
        <img src={CarImg} alt="The Player's Car" />
    </div>
)