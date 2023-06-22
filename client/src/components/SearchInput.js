import axios from "axios";
import React from "react";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [values, setValues] = useSearch();
  const nav = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      nav("/search");
      console.log(values.keyword);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="d-flex search mx-auto"
      role="search"
      onSubmit={handleSearch}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
