import "./Button.css"

export default ({chamada, quandoClicar, size = "gr"}) => {
    return (
        <>
            {
                size === "gr" ? (<button className="button" onClick={quandoClicar}> {chamada} </button>) : 
                (<button className="button md" onClick={quandoClicar}> {chamada} </button>)
            }
            
        </>
    )
}

