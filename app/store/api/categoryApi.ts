import { baseApi } from "./baseApi";

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategories: builder.query<Category[], void>({
      query: () => "/categories/",
    }),
  }),
});

export const { useListCategoriesQuery } = categoryApi;
