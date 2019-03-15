import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import Navegation from './Navegation';
import Form from './boards/Form';
import Board from './boards/Board';


class App extends Component {
    state = {
        tableros: {}
    };

    componentDidMount() {
        this.cargarDatos();
    }

    cargarDatos = () => {
        var config = {
            headers: {'Authorization': "Token b1b93253a301da3f7c055d9d44f6f7b25c55c39e"}
        };
        const url = `http://3.85.113.134/api/auth/boards/`;
        axios.get(url, config)
            .then(res=>{
                this.setState({
                    tableros: res.data.results
                });
            });
    };

    createBoard = (board) => {
        const config = {
            headers: {'Authorization': "Token b1b93253a301da3f7c055d9d44f6f7b25c55c39e"}
        };
        const url = `http://3.85.113.134/api/auth/boards/`;
        axios.post(url, board, config)
            .then(res=>{
                this.setState({
                    tableros: [...this.state.tableros, res.data]
                });
            });
    };

    removeBoard = (id) => {
        const config = {
            headers: {'Authorization': "Token b1b93253a301da3f7c055d9d44f6f7b25c55c39e"}
        };
        const url = `http://3.85.113.134/api/auth/boards/${id}/`;
        axios.delete(url,config)
            .then(data=>{
                if(data.status === 204 ){
                    const boards = [...this.state.tableros];
                    let res = boards.filter(obj=>(
                        obj.id !== id
                    ));
                    this.setState({
                        tableros: res
                    })
                }
            });
    };

    createIdea = (index, idea) => {
        const config = {
            headers: {'Authorization': "Token b1b93253a301da3f7c055d9d44f6f7b25c55c39e"}
        };
        const url = `http://3.85.113.134/api/auth/ideas/`;
        axios.post(url, idea, config)
            .then(res => {
                const boards = [...this.state.tableros];
                const ideas = [...boards[index].ideas, idea];
                boards[index].ideas = ideas;
                this.setState({
                    tableros: boards
                });
            });
    };

    removeIdea = (index, id) => {
        const config = {
            headers: {'Authorization': "Token b1b93253a301da3f7c055d9d44f6f7b25c55c39e"}
        };
        const url = `http://3.85.113.134/api/auth/ideas/${id}/`;
        axios.delete(url,config)
            .then(data => {
                if(data.status === 204 ){
                    const boards = [...this.state.tableros];
                    let ideas = boards[index].ideas.filter(obj=>(
                        obj.id !== id
                    ));
                    boards[index].ideas = ideas;
                    this.setState({
                        tableros: boards
                    })
                }
            });
    };

    // Render Method
    render() {
        const tableros = Object.keys(this.state.tableros).map((key, i) => (
            <Board
                key={i}
                i={i}
                tablero={this.state.tableros[i]}
                removeBoard={this.removeBoard }
                createIdea={this.createIdea}
                removeIdea={this.removeIdea}
            />
        ));
        return (
            <div className="App">
                <Navegation />
                <div className="container mt-3 mb-lg-3">
                    <div className="row justify-content-center align-items-center">
                        <Form
                            createBoard={this.createBoard}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {tableros}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
