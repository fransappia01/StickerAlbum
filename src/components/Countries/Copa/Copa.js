import React from 'react';
import '../../Album.css'
import './Copa.css'
import Arg from '../Argentina/arg.png'
import Bra from '../Brasil/bra.png'
import Ita from '../Italia/ita.png'
import Ale from '../Alemania/ale.png'
import Fra from '../Francia/fra.png'
import Uru from '../Uruguay/uru.png'
import Ing from '../Inglaterra/ing.png'
import Esp from '../España/esp.png'

const Copa = () => {

    const cards = Array.from({ length: 12 }, (_, index) => index + 1);

    // Dividir el array en dos grupos de 6 elementos cada uno
    const firstRow = cards.slice(0, 1);

    return (
        <div className='full-screen'>
            <div className='album-container'>
                <div className='copa-album'>
                <div className='text-container'>
                    <div className='cup-title'>
                    <h1 className='album-title-cup'>Álbum de Campeones del Mundo</h1>
                    </div>
                <div className="row-champions-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-champions-cup">
                                <div className='page-album' >1</div>                     
                            <table className="table-champions">
                                <thead>
                                    <tr>
                                        <th>ㅤㅤ</th>
                                        <th>Ganadores</th>
                                        <th>ㅤㅤ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img src={Bra} alt="Brasil" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Brasil</td>
                                        <td><b>5</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ale} alt="Alemania" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Alemania</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ita} alt="Italia" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Italia</td>
                                        <td><b>4</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Arg} alt="Argentina" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Argentina</td>
                                        <td><b>3</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Uru} alt="Uruguay" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Uruguay</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Fra} alt="Francia" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Francia</td>
                                        <td><b>2</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Ing} alt="Inglaterra" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>Inglaterra</td>
                                        <td><b>1</b></td>
                                    </tr>
                                    <tr>
                                        <td><img src={Esp} alt="España" style={{width: 30, height: 30}} /></td>
                                        <td className='country-name'>España</td>
                                        <td><b>1</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        ))}
                    </div>
                </div>
                    <div className="row1-cup">
                        {firstRow.map(card => (
                            <div key={card} className="card-cup">
                                 <div className='page-number'>COP{card}</div>
                            </div>                     
                        ))}
                        <div className="cup-text">
                            Copa del Mundo
                        </div>
                    </div>      
                </div>
            </div>
        </div>
    );
};

export default Copa;