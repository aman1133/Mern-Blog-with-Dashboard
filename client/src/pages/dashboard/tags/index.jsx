import React from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTagsByUser, deleteTag } from "../../../features/tags/tagsSlice";

function Index() {
  const dispatch = useDispatch();
  // destructure the following from tagsSlice
  const { tags, loading, error } = useSelector((state) => state.tags);
  const { token } = useSelector((state) => state.auth.user);
  const [setTagpageHeader] = useOutletContext();

  //set the page header
  useEffect(() => {
    setTagpageHeader("Tags List");
  }, [setTagpageHeader]);

  // // fetch Tags when components mount
  useEffect(() => {
    dispatch(fetchTagsByUser(token));
  }, [dispatch, token]);

  // // Function to truncate description to five words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
  };

  // // function to delete Tags
  const handleDelete = (tagId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag!"
    );

    if (confirmDelete) {
      dispatch(deleteTag(tagId, token));
    }
  };
  //const handleDelete = () => {};

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> Tags</h3>
              <div className="card-tools">
                <Link to="create" className="btn btn-sm btn-primary">
                  {" "}
                  Add new
                </Link>
              </div>
            </div>
            <div className="card-body table-reponsive p-0">
              {loading && <p>Loading...</p>}
              {error && <p>Error fetching tags: {error.message}</p>}
              {!loading && !error && (
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags?.length > 0 ? (
                      tags.map((tag, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{tag.title}</td>
                          <td>{truncateDescription(tag.description)}</td>
                          <td>
                            <Link
                              to={`edit/${tag._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(tag._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No tags available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
