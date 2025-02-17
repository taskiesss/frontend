import React from "react";
import ProtectedPage from "../../_components/common/ProtectedPage";

export default function page() {
  return (
    <ProtectedPage message="You don't have access to this page, You may want to login to access this page" />
  );
}
