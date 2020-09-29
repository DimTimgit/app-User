import gql from "graphql-tag";

const FETCH_USERS = gql`
  {
    getUsers {
      name
      email
      id
    }
  }
`;
export default FETCH_USERS;
