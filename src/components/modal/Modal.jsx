import { useEffect, useState } from "react";
import "./Modal.css"
import { FaDog } from 'react-icons/fa';

export default ({estado}) => {

    return(
        <>
            <div className={`modal ${estado === true ? "ativo" : ''}`}>
                <FaDog className="iconDog"/>
                <p className="texto_modal"> 
                    gerando as fotinhas  
                </p>
            </div>
        </>
    )
}