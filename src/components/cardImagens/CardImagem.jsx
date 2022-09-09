import "./CardImagem.css"
import { useEffect, useState } from "react";
import Etiqueta from "./etiqueta/Etiqueta";
import { FaHeart } from "react-icons/fa";

export default ({qtde, listaRacas, cardSelecionado, estadoCardSelecao}) => { 

    function reconhecendoRacaCachorro(link, listaRacas) {
         const linkImagem = link;

            for (const key in listaRacas) {
                if(linkImagem.indexOf(key) != -1){
                    return key;
                } 
            }
    }

    // Validando se o card está na lista de compartilhamento 
        // se passou pela condicional de limite de lista

    function validandoSeFoiSelecionado(qtde) {
        const incluso = estadoCardSelecao.includes(qtde)
        return incluso === true ? "card_selecionado" : ''; 
    }

    const [gostei, setGostei] = useState(qtde); 

    return(
        <section className="section_cards">
            {
                qtde.map((qtde, i) => {
                    return (

                        <div className={`card ${validandoSeFoiSelecionado(qtde)}`} key={i} onClick={() => {
                            cardSelecionado(qtde, i, reconhecendoRacaCachorro(qtde, listaRacas))
                            }}>

                            <img src={qtde} />

                            <Etiqueta raca={reconhecendoRacaCachorro(qtde, listaRacas)}/>
                            
                            <FaHeart 
                            onClick={() => (
                                console.log(gostei)
                                // gostei === false ? setGostei(true) :  setGostei(false)
                            )}

                            className={`icon_heart ${gostei === true ? "ativo" : ''} `}
                            />

                        </div>
                    )
                })
                
            }
        </section>
    )
}