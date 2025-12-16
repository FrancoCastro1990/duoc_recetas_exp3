export const recipesExplorerKeys = {
  all: ['recipes-explorer'] as const,
  lists: () => [...recipesExplorerKeys.all, 'list'] as const,
  list: (filters?: string) => [...recipesExplorerKeys.lists(), { filters }] as const,
  details: () => [...recipesExplorerKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipesExplorerKeys.details(), id] as const,
} as const;
