import "./Input.css"

export default ({titulo, type, value, funcao}) => {
    return(
        <div className="box_input">
            <label
            className="label"
            > {titulo} </label>

            <input
            min={1}
            max={15}
            
            value={value}
            onChange={funcao}
            className="input" 
            type={type}
            />
        </div>
    )
}