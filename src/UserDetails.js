import React from "react";

const UserDetails = ({ match }) => {
  return <p>You're reading profile of user {match.params.name}</p>;
};

export default UserDetails;
