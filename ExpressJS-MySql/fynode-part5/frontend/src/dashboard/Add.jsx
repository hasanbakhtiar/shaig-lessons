import axios from "axios";
import { useState } from "react";

const Add = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const formSubmited = (e) => {
    e.preventDefault();
    console.log(e.target.files)
    // axios.post('http://localhost:3000/api/v1/ad/category', {
    //   title_az: title,
    //   title_en: description
    // }, {
    //   headers: {
    //     'fynode-access': 'd832767809bb1a62ceb8168aa4c18072',
    //     'x-auth-token ': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbG5hbWUiOiJIYXNhbiBCYWtodGlhciIsImVtYWlsIjoiaGFzYW5Ad2VibHVuYS5vcmciLCJwaG9uZSI6Iis5OTQgNzAgMzQ3IDk3IDI3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4OTc0ODA1fQ.VnS3mlxYJKg7gWZBusrSHZxouG-8Ol7oe0Z1ZDLn5fg'
    //   }
    // }).then(res => console.log(res))
  }
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h1 className="my-5">Add form</h1>
      <div className="col-5">
        < form onSubmit={formSubmited}>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" onChange={e => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-warning">Send</button>
        </form>
      </div>
    </div >
  )
}

export default Add
