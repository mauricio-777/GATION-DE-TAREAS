import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLink, setNewLink] = useState({ name: "", url: "", visible: true });
  const [editingLink, setEditingLink] = useState(null);

  async function getAllTasks() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/links", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  }

  async function createTask() {
    try {
      const response = await fetch("http://localhost:4000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      const result = await response.json();

      setData((prevData) => [...prevData, result]);

      setNewLink({ name: "", url: "", visible: true });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  async function updateTask() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/links/${editingLink._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLink),
        }
      );

      const result = await response.json();

      setData((prevData) =>
        prevData.map((link) => (link._id === editingLink._id ? result : link))
      );

      setNewLink({ name: "", url: "", visible: true });
      setEditingLink(null);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  async function deleteTask(_id) {
    try {
      await fetch(`http://localhost:4000/api/links/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData((prevData) => prevData.filter((link) => link._id !== _id));
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  function handleEdit(link) {
    setEditingLink(link);
    setNewLink({ name: link.name, url: link.url, visible: link.visible });
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  if (isLoading) return <h1 className="loading">Está cargando...</h1>;
  if (error) return <h1 className="error">Error: {error.message}</h1>;

  return (
    <div className="container">
      
      <h1>GESTION DE TAREAS</h1>

      <div className="new-link-form">
        <h2>{editingLink ? "Editar enlace" : "Crear un nuevo enlace"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newLink.name}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newLink.visible}
            onChange={(e) =>
              setNewLink({ ...newLink, visible: e.target.checked })
            }
          />
          Visible
        </label>
        <button onClick={editingLink ? updateTask : createTask}>
          {editingLink ? "Actualizar Enlace" : "Crear Enlace"}
        </button>
      </div>

      {data.length === 0 ? (
        <h1 className="no-links">No hay enlaces disponibles</h1>
      ) : (
        data.map((item) => (
          <div key={item._id} className="link-item">
            <h1 className="link-name">{item.name}</h1>
            <p className="link-url">{item.url}</p>
            <p className="link-visible">
              {item.visible ? "Visible" : "Oculto"}
            </p>
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => deleteTask(item._id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
