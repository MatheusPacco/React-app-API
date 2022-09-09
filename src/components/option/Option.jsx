export default ({listaDogs, estado}) => {
    let ArrayRacas = []

    if (estado === true) {
        ArrayRacas = Object.keys(listaDogs);
    }

    return (
        <>
            {
                estado === true ? (ArrayRacas.map((ArrayRacas, i) => {
                    return <option key={i} value={ArrayRacas}> {ArrayRacas} </option>
                })) : (<option value="teste"> Teste </option>)
                    // ArrayRacas.map((ArrayRacas, i) => {
                    //     return <option key={i} value={ArrayRacas}> {ArrayRacas} </option>   
                    // })
                
            }
        </>
    )
}