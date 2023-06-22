import React from "react";

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Create Category</h4>

        <div>
          <input
            className="inputCat"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />

          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </>
  );
}

export default CategoryForm;
