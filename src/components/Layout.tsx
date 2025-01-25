import { useEffect } from 'react';
import AccountIcon from './ui/icons/AccountIcon';
import CartIcon from './ui/icons/CartIcon';
import { Link } from 'react-router-dom';

interface Props {
    title: string,
}

export const Header = ({ title }: Props) => {

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/product/starter"><li>Starters</li></Link>
                        <Link to="/product/main"><li>Main Course</li></Link>
                        <Link to="/product/dessert"><li>Desserts</li></Link>
                        <Link to="/product/beverage"><li>Beverages</li></Link>
                    </ul>
                </nav>
                <div>
                    <Link to="/login" className="header-icon"><AccountIcon/></Link>
                    <Link to="/cart" className="header-icon"><CartIcon/></Link>
                </div>
            </header>
        </>
    )
}


export const Footer = () => {
    return (
        <>
            <footer>
                <p>Copyright restoresto 2025 ©️</p>
            </footer>
        </>
    )
}