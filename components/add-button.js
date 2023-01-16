import React, { useState } from 'react';

export default function AddButton() {
  const [showForm, setShowForm] = useState(false);

  const showFormMethod = () => {
    setShowForm(!showForm);
  }

  return (
    <div>
      <form>
        <button onClick={showFormMethod}></button>
      </form>

      {showForm && (
        <form>
          ...
        </form>
      )}
    </div>
  )
}