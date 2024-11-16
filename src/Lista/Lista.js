import React, { useState } from 'react';
import './Lista.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newNote, setNewNote] = useState('');
  const [selectedNoteType, setSelectedNoteType] = useState('small');

  const generateDates = () => {
    const dates = [];
    for (let i = 16; i <= 22; i++) {
      dates.push({ day: i, month: 'NOV' });
    }
    return dates;
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, { text: newNote, type: selectedNoteType }]);
    setNewNote('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <h1 className="todo-title">Lista de quehaceres</h1>

        <div className="calendar-strip">
          {generateDates().map((date, index) => (
            <div key={index} className={`calendar-day ${index === 0 ? 'active' : ''}`}>
              <div className="calendar-number">{date.day}</div>
              <div className="calendar-month">{date.month}</div>
            </div>
          ))}
        </div>

        <div className="content-grid">
          <div className="section-card">
            <h2 className="section-title">Quehaceres</h2>

            <form onSubmit={handleAddTodo} className="input-form">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Agregar nueva tarea..."
                className="text-input"
              />
              <button type="submit" className="add-button">Agregar</button>
            </form>

            <div className="todo-list">
              {todos.map((todo, index) => (
                <div key={index} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                    className="todo-checkbox"
                  />
                  <span>{todo.text}</span>
                </div>
              ))}
            </div>

            <div className="todo-actions">
              <button onClick={deleteAllTodos} className="add-button">
                Eliminar Todo
              </button>
              <button onClick={deleteCompletedTodos} className="add-button">
                Eliminar Completados
              </button>
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">Notas</h2>

            <form onSubmit={handleAddNote} className="input-form">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Agregar nueva nota..."
                className="text-input"
              />
              <select
                value={selectedNoteType}
                onChange={(e) => setSelectedNoteType(e.target.value)}
                className="select-input"
              >
                <option value="main">Nota Principal</option>
                <option value="small">Nota Pequeña</option>
              </select>
              <button type="submit" className="add-button">Agregar</button>
            </form>

            <div className="notes-grid">
              {notes.filter(note => note.type === 'main').map((note, index) => (
                <div key={index} className="main-note">
                  <p>{note.text}</p>
                </div>
              ))}

              <div className="small-notes-grid">
                {notes.filter(note => note.type === 'small').map((note, index) => (
                  <div key={index} className="small-note">
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
