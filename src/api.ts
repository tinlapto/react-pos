import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";
import _ from "lodash";
import { Item, ItemDetail } from "./type";

export type ApiReturn<T> = {
  data: T;
};

export type GetItems = {
  items: Item[];
};

export const useGetItems = (
  params?: any,
  options?: UseQueryOptions<ApiReturn<GetItems>, Error, Item[]>
) =>
  useQuery<ApiReturn<GetItems>, Error, Item[]>(
    "get-items",
    async () => await axios.get("/items", { params }),
    {
      select: (data) => data?.data?.items || [],
      ...options,
    }
  );

export type GetItemArgs = {
  id: number;
};

export type GetItem = {
  item: ItemDetail;
};

export const useGetItem = (
  params: GetItemArgs,
  options?: UseQueryOptions<ApiReturn<GetItem>, Error, ItemDetail>
) =>
  useQuery<ApiReturn<GetItem>, Error, ItemDetail>(
    "get-item",
    async () =>
      await axios.get(`/item/${params.id}`, {
        params: _.omit(params, ["id"]),
      }),
    {
      select: (data) => data?.data?.item || {},
      ...options,
    }
  );
