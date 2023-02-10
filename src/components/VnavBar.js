import './VnavBar.css'
import yoga from '../img/yoga.png'
import swim from '../img/swim.png'
import bike from '../img/bike.png'
import gym from '../img/gym.png'
export default function HnavBar(){
    return <nav className="vNavBar">
        <div className='iconContainer'>
            <a className='vAnchor' href='#'><img className='navIcon' src={yoga} alt='yoga'/></a>
            <a className='vAnchor' href='#'><img className='navIcon' src={swim} alt='nage'/></a>
            <a className='vAnchor' href='#'><img className='navIcon' src={bike} alt='velo'/></a>
            <a className='vAnchor' href='#'><img className='navIcon' src={gym} alt='muscu'/></a>
        </div>
        <p id='copyright'>Copiryght, SportSee 2020</p>
    </nav>
}