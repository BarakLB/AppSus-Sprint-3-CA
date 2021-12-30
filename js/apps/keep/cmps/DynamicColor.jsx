const colors = ['#CFFFDC', '#93FFD8', '#548CFF', '#7900FF', '#F9D371', '#FE7E6D'];

export function DynamicColor({ handleColorChange }) {
    return (
        <div className="palette-container ">
        <button className="icon-button">
            <div className="color-palette" id="color-palette-icon"><i title="change color" className="fas fa-palette"></i></div>
        </button>
        <div className="palette-colors-container">
            {colors.map((color, i) => (
                <div key={i} id={`color-${i}`} onClick={() => handleColorChange(color)} style={{ backgroundColor: color }}></div>
            ))}
        </div>
    </div>
    )
}