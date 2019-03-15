import React, { Component } from 'react';

class Form extends Component {
    // Atributes
    nombreRef  = React.createRef();
    estadodRef = React.createRef();

    addBoard = (e) => {
        e.preventDefault();
        const obj = {
            nombre: this.nombreRef.current.value,
            estado: this.estadodRef.current.value
        };
        this.props.createBoard(obj);
        e.currentTarget.reset(); // Optional
    };

    // Render Method
    render(){
        return(
            <form className="form-inline" onSubmit={this.addBoard}>
                <input type="text" className="form-control mr-4" placeholder="Nombre del Tablero" required ref={this.nombreRef} />
                <select name="estado" className="custom-select mr-2" ref={this.estadodRef}>
                    <option>Seleccionel el estado...</option>
                    <option value="PUBLICO">Público</option>
                    <option value="PRIVADO">Privado</option>
                </select>
                <button type="submit" className="btn btn-success">+ Nuevo Tablero</button>
            </form>
        )
    }
}

export default Form;