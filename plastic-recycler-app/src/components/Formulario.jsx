export function Label({labelText, placeholderText, type, name}) {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">{labelText}</span>
            <input type={type} name={name} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder={placeholderText}/>
        </div>
    )
}