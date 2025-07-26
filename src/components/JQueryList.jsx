import { useEffect, useRef, useState } from "react";
import $ from "jquery";

export default function JQueryList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    // jQuery fade-out error
    if (error) {
      const timer = setTimeout(() => setError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (!value) {
      setError(true);
      return;
    }

    const id = Date.now();
    const newItem = { id, text: value };

    setItems((prev) => [...prev, newItem]);
    inputRef.current.value = "";
  };

  const handleDelete = (id) => {
    $(`#item-${id}`).fadeOut(300, () => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter item"
          className="form-control form-control-sm rounded-pill shadow-sm"
        />
        <button onClick={handleAdd} className="btn btn-primary px-2 py-0 rounded-2 shadow-sm fw-semibold"
        style={{ width: "150px", height: "30px" }}>
          Add Item
        </button>
      </div>

      {error && (
        <div className="alert alert-danger py-1 px-2 small" role="alert">
          Please enter something!
        </div>
      )}

      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            id={`item-${item.id}`}
            className="list-group-item d-flex justify-content-between align-items-center small py-2 px-3 mb-2 rounded shadow-sm"
          >
            <span>{item.text}</span>
            <button
              onClick={() => handleDelete(item.id)}
              className="btn btn-sm btn-danger rounded- d-flex align-items-center justify-content-center"
               style={{ width: "50px", height: "30px" }}
              title="Delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
