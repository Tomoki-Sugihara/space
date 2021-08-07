import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($object: users_primary_insert_input = { id: "", name: "" }) {
    insert_users_primary_one(object: $object) {
      id
      name
      created_at
    }
  }
`
export const GET_USERS = gql`
  query getUsers {
    users_primary {
      id
      name
      created_at
    }
  }
`
