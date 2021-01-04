import React from "react";
import MainLayout from "../../components/MainLayout";
import "./index.css";

function EmptyPage(props) {
  return (
    <MainLayout location={props.location}>
      <h3>EmptyPage-404</h3>
    </MainLayout>
  );
}
export default EmptyPage;
