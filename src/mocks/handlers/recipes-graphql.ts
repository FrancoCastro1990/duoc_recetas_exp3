import { graphql, HttpResponse } from 'msw';
import { mockRecipesDetail } from './recipes-rest';

/**
 * GraphQL Handlers for Recipes
 * Provides detailed recipe information via GraphQL queries
 */
export const recipesGraphQLHandlers = [
  // Query: GetRecipeById
  graphql.query('GetRecipeById', ({ variables }) => {
    const { id } = variables as { id: string };
    const recipe = mockRecipesDetail.find(r => r.id === id);

    if (!recipe) {
      return HttpResponse.json({
        errors: [
          {
            message: 'Recipe not found',
            extensions: {
              code: 'NOT_FOUND',
            },
          },
        ],
        data: null,
      });
    }

    return HttpResponse.json({
      data: {
        recipe,
      },
    });
  }),
];
