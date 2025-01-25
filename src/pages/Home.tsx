import { Header } from '../components/Layout';
import { Footer } from '../components/Layout';

export default function Home () {
    return (
        <>
            <Header title="Accueil"></Header>
            <main id='home-main'>
                <h1>Resto Resto</h1>
                <img src="../public/assets/images/Food Photo 162291.jpg" alt="Egg dish on a plate" id='main-photo'/>
            </main>
            <Footer></Footer>
        </>
    )
}

