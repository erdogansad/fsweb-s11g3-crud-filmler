import { useState } from "react";
import axiosInterface from "../endpoint/api";

const REQ_TYPES = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
});

const useAxios = (initialValue = null) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const doRequest = ({ endpoint, reqType = REQ_TYPES.GET, payload, config }) => {
    setLoading(true);
    return axiosInterface[reqType](endpoint, payload, config)
      .then((res) => {
        setData(res.data);
        setError(null);
        return res.data;
      })
      .catch((err) => {
        setError(err);
        setData(initialValue);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  return [doRequest, data, loading, error];
};

export { useAxios, REQ_TYPES };
