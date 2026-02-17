import { baseApi } from "./baseApi";

export interface Category {
  id: number;
  name_en: string;
  name_ru: string;
  name_uz: string;
  slug: string;
  is_active: boolean;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategories: builder.query<
      { results: Category[]; count: number; next?: string | null; previous?: string | null },
      { page?: number } | void
    >({
      query: (params) => ({
        url: "/categories/",
        params,
      }),
    }),

    getCategory: builder.query<Category, number>({
      query: (id) => `/categories/${id}/`,
    }),
  }),
});

export const { useListCategoriesQuery, useGetCategoryQuery } = categoryApi;
