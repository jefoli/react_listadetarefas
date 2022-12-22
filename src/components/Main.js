import React, { Component } from 'react';
import Form from './Form';
import Tarefas from './Tarefas';
import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  // para salvar no storage do Google Chrome:
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  // Criamos para não atualizar em cada letra:
  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;

    // console.log('teste: tarefas mudaram', tarefas);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novaTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novaTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novaTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novaTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,

    });
  };

  handleEdit = (e, index) => {
    // console.log('Edit', index);
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    // console.log('Delete', index);
    const { tarefas } = this.state;
    const novaTarefas = [...tarefas];
    novaTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novaTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (

      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

      </div>
    );
  }
}
