import './HnavBar.css'
import logo from '../img/logo.png'
export default function HnavBar(){
    return <nav className="hNavBar">
        <div className='container'>
            <img className='logo' src={logo} alt='logo'/>
            <a className='hAnchor' href='#'>Accueil</a>
            <a className='hAnchor' href='#'>Profil</a>
            <a className='hAnchor' href='#'>Réglage</a>
            <a className='hAnchor' href='#'>Communauté</a>
        </div>
    </nav>
}