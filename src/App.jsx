import "./App.css"
import { useEffect, useState } from "react"

// Componentes sendo chamados
import Input from "./components/input/Input";
import CardImagem from "./components/cardImagens/CardImagem";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
import Option from "./components/option/Option";
import CardsSelecionados from "./components/cardsSelecionados/CardsSelecionados";

export default props => {

    // Estado do input controlado de quantidade
    const [valorInput, setValorInput] = useState(1); 

    // Esse estado é responsável por ativar o UseEffect quando o valor de valorInput === numeroImagens
    // Por serem iguais, não existe uma mudança de estado
    const [gerarNovamente, setGerarNovamente] = useState(false); 

    // Estados que compõem a quantidade de imagens geradas e suas URLs
    const [qtdUrls, setQtdUrls] = useState([]);

    // Estado do select
    const [selectAtivo, setSelectAtivo] = useState(false) 
    const [select, setSelect] = useState("default"); 

    const [modal, setModal] = useState(true)

    const [listaDogs, setListaDogs] = useState(); 

    const request = async function chamandoCachorro(valorInput, raca){
        // Colocar varáveis de escopo de função, deve ser atribuido fora do escopo do TRY, CATCH ou Finally!
        const armazenaURL = [];  
        const dogs = raca === "default" ? "https://dog.ceo/api/breeds/image/random" : `https://dog.ceo/api/breed/${raca}/images/random`; 

        try {
            setModal(true)

            for (let index = 0; index < valorInput; index++) {
                const request = await fetch(dogs)
                const img = await request.json(); 
                const imgUrl = await img.message

                if(armazenaURL.includes(imgUrl) === true){
                   request = await fetch(dogs)
                   img = await request.json(); 
                   imgUrl = await img.message
                   
                   armazenaURL[index] = imgUrl;   
                } else {
                    armazenaURL[index] = imgUrl;   
                } 
                
            }

        } catch (e){
            console.log(e)

        } finally {
            // Graças ao escopo global, eu consigo fazer a atribuição ao final!
            setQtdUrls(Array(...armazenaURL))

            setTimeout(() => {
                setModal(false)
            }, 1000)

        }
    }

    // function clearArray() {
    //     setQtdUrls((prev) => (prev.splice(0, prev.length)))
    // }

    useEffect(() => {

        console.log("Ativando o Hoocks");
        
        if (listaDogs === undefined) {
            GerandoListaDogs()
        }

        request(valorInput, select)

        // Outras formas de gerar um array a partir do zero... testar dps

        // setQtdUrls((preve) => ([...preve, ...armazenaURL]))
        // setQtdUrls([armazenaURL])
        // console.log(qtdUrls);

    }, [gerarNovamente])

    const GerandoListaDogs = async function chamandoCachorro() {
        try{
            const JSON = await fetch("https://dog.ceo/api/breeds/list/all")
            const requireList = await JSON.json()
            setListaDogs(requireList.message)

        } catch(e){
            console.log(e);
        }finally{
            console.log("Lista de raças de cachorros gerada!")
        }
    }

    // 1 - Validar a imagem que foi selecionada: 
    //      1.1 - Fazendo uso de uma condionacional para saber se a imagem escolhida já esta contida na lista
    //      1.2 - Limitando a lista a até 5 imagens a serem compartilhadas
    // 2 - Se as duas condições forem falsas, realizamos a atribuição da imagem na lista

    const [listaCards, setListaCards] = useState([]); 

    function handleCardSelecionado(qtde, key, etiqueta) {
        
        if(listaCards.includes(qtde) != true){
            listaCards.length == 5 ? alert("Você só pode compartilhar 5 imagens por vez") : 
                setListaCards((prev) => ([
                    ...prev, qtde
                ]));
        } else {
            alert("Você já salvou essa imagem!")
        }
        
        console.log(listaCards);
    }

    function handleDeletandoSelecao(key){
        console.log("key selecionada: " + key)
        
        const cardRemovido = listaCards.splice(key, 1)
        setListaCards((prev) => ([
            ...listaCards
        ]));
    }

    return(
        <div className="container_conteudo">
            <div className="box_pesquisa">
                <Input 
                titulo={"Quantidade de imagens a serem geradas"}

                type="number" 
                value={valorInput}
                funcao={(e) => (
                    e.target.value > 15 ? setValorInput(15) : setValorInput(+e.target.value)
                )}           
                />

                <select value={select.value}

                onChange={(e) => {setSelect(e.target.value)
                console.log(select)}
                }

                onClick={() => setSelectAtivo(true)}
                className="select">
                    <option value="default">Escolha a Raça dos cachorros</option>
                    <Option 
                    estado={selectAtivo}
                    listaDogs={listaDogs}/>
                </select>

                <Button chamada={"Gerar Imagens"}
                quandoClicar={() => {
                    console.log(listaCards);
                    gerarNovamente === false ? setGerarNovamente(true) :  setGerarNovamente(false);    
                }}
                />


            </div>


            <div>
                
                <h3 className="titulo">
                    Imagens Geradas
                </h3>
                
                <CardImagem 
                qtde={qtdUrls}
                listaRacas={listaDogs}
                cardSelecionado={handleCardSelecionado}
                estadoCardSelecao={listaCards}
                />

            </div>
            
            <Modal 
                estado={modal}
            />

            <CardsSelecionados 
            listaCards={listaCards}
            deletandoUmSelecao={handleDeletandoSelecao}
            />

        </div>
    )
}