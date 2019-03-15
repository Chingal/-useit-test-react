import React, { Component } from 'react';


class Idea extends Component {

    // Render Method
    render(){
        const {id, nombre, estado} = this.props.idea;

        return(
            <div className="card mt-2 shadow-lg">
                <div className="card-body">
                    <span>
                        {nombre} - <small className="text-muted">({estado})</small>
                        <button className="btn btn-outline-danger btn-sm float-right" onClick={ () =>
                            this.props.removeIdea(this.props.index, id) }>-
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}

export default Idea;