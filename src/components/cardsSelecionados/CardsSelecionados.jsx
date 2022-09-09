import "./CardsSelecionados.css"
import Button from "../button/Button"
import { FaRegObjectUngroup } from "react-icons/fa"

export default ({listaCards, deletandoUmSelecao}) => {

    let estado = listaCards.length != 0 ? "ativo" : ''; 

    return(
        <>   
            <div className={`box_card ${estado}`}>
                <div className="part_cards_selecionados">

                    {
                        listaCards.map((qtde , i) => {                             
                            
                            return(
                                <div className="card_selecionado_box" 
                                style={{backgroundImage: `url(${qtde})`}} 
                                key={i}
                                onClick={() => {
                                    deletandoUmSelecao(i); 
                                }}>    
                                
                                </div>         
                            )
                        }) 
                    }
                
                </div>
                
                <div>
                    <Button 
                    chamada="Compartilhar Imagens"
                    size="md"
                    />
                </div>

            </div>
        </>
    )
}