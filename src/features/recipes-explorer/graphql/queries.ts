import { gql } from '@apollo/client';

/**
 * GraphQL Query: Get Recipe By ID
 * Fetches complete recipe details including ingredients, instructions, and tips
 */
export const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: String!) {
    recipe(id: $id) {
      id
      title
      description
      difficulty
      category
      imageUrl
      cookingTime
      prepTime
      servings
      ingredients {
        name
        amount
        unit
      }
      instructions
      tips
      author
    }
  }
`;
