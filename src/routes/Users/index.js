import React from "react";
import styles from "./index.css";
import UserPage from "./Users";
import MainLayout from "../../components/MainLayout";

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UserPage />
      </div>
    </MainLayout>
  );
}
export default Users;
