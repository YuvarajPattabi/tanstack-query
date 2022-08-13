import React from "react";
import { useQuery } from "@tanstack/react-query";
import { loding } from "../_global";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualPost } from "../api/apiPosts";

const PostById = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const fetchPost =  () => {
    return getIndividualPost(id) ;
  };
  const { isLoading, isError, error, data } = useQuery(
    ["posts", id],
    fetchPost
  );
  return (
    <div>
      {isLoading && <h2>{loding}</h2>}
      {isError && <h2>{(error as { message: any }).message}⛔⛔</h2>}
      <div className="col-12">
      <div className="p-3">
        <button className="btn btn-info text-white" onClick={() => {navigate('/posts')}}>Back to posts</button>
        </div>
        {data && (
          <div className="p-3">
            <p>
              <b>Title: </b> {data.title}
            </p>
            <p>
              <b>Body: </b> {data.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostById;
