import React, { Component } from 'react';
import Idea from './Idea';

class Board extends Component {

    nombreRef  = React.createRef();
    estadodRef = React.createRef();

    // Add Idea
    addIdea = (e) => {
        e.preventDefault();
        const idea = {
            board: this.props.tablero.id,
            nombre: this.nombreRef.current.value,
            estado: this.estadodRef.current.value
        };
        this.props.createIdea(this.props.i, idea);
        e.currentTarget.reset(); // Optional
    };

    deleteIdea = (index, id) => {
        this.props.removeIdea(index, id);
    };

    // Render Method
    render(){
        const {id, nombre, ideas} = this.props.tablero;
        const listaIdeas = Object.keys(ideas).map((key, i) => (
            <Idea
                key={i}
                index={i}
                idea={ideas[i]}
                removeIdea={this.deleteIdea}
            />
        ));
        return(
            <div className="col-md-6">
                <div className="card border-primary mb-3">
                    <div className="card-header">
                        <span id={`tablero-${id}`}>{nombre}</span>
                        <button className="btn btn-danger btn-sm ml-2 mb-1 float-right" onClick={ () => this.props.removeBoard(id) } >Del</button>
                    </div>
                    <div className="card-body text-primary">
                        {listaIdeas}
                    </div>
                    <div className="card-footer">
                        <div className="row justify-content-center">
                            <form className="form-inline" onSubmit={this.addIdea}>
                                <input type="text" className="form-control mr-2" placeholder="Escribe tu idea..." required ref={this.nombreRef} />
                                <select name="estado" className="custom-select mr-2" ref={this.estadodRef}>
                                    <option>Estado...</option>
                                    <option value="PUBLICO">Público</option>
                                    <option value="PRIVADO">Privado</option>
                                </select>
                                <button type="submit" className="btn btn-primary btn-sm rounded-pill">+ Nueva Idea</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board;