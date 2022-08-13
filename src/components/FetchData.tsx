import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loding } from "../_global";
import { addPost, deletePost, fetchPosts } from "../api/apiPosts";

const FetchData = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [load, setLoad] = useState(false);
  let len = 1;
  const { isLoading, isFetching, isError, error, data } = useQuery(
    ["posts"],
    fetchPosts,
  );
  if (!isLoading && !isFetching) len = data.length;
  const addMutation = useMutation(addPost, {
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setLoad(false);
      alert("Post added successfully");
    },
    onError: () => {
      alert("Post addition failed");
    }
  });
  const deleteMutation = useMutation(deletePost, {
    onMutate: () => {
      setLoad(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setLoad(false);
      alert("Post deleted successfully");
    },
    onError: () => {
      alert("Post deletion failed");
    }
  });
  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate({ userId: 11, id: len + 1, title, body });
    setTitle("");
    setBody("");
  };
  return (
    <div>
      {load && <h2 className="text-center">Please wait...🔃🔃</h2>}
      {isLoading && <h2>{loding}</h2>}
      {isError && <h2>{(error as { message: any }).message}⛔⛔</h2>}
      <form onSubmit={handleSubmit} className="col-4 p-3">
        <div className="col-12 pt-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={title}
            className="form-control"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="col-12 pt-3">
          <label htmlFor="title" className="form-label">
            Body
          </label>
          <input
            type="text"
            value={body}
            className="form-control"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div className="col-12 pt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ul className="col-6 p-3">
        {data &&
          data.map((post: any) => {
            return (
              <li
                key={post.id}
                className="mt-3"
                style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}
              >
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <button
                  id={post.id}
                  className="btn btn-danger"
                  onClick={() => {
                    deleteMutation.mutate({ id: post.id });
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FetchData;
