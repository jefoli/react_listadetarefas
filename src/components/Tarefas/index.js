import propTypes from 'prop-types';
import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import('./Tarefas.css');

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={tarefa}>
          {tarefa}

          <span>
            <FaEdit onClick={(e) => handleEdit(e, index)} className="edit" />
            <FaWindowClose onClick={(e) => handleDelete(e, index)} className="delete" />
          </span>

        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  handleEdit: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  tarefas: propTypes.array.isRequired,
};
