import React from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function Index() {
  const [setPostpageHeader] = useOutletContext();
  useEffect(() => {
    setPostpageHeader("Posts List");
  }, [setPostpageHeader]);
  return <div>index</div>;
}

export default Index;
