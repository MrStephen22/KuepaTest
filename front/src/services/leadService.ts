import { get, post } from "../util/http";
const api = "/lead";
export const leadService = {
  api,
  get: async ({ _id }: { _id: string }) => {
    return await get({ api: `${api}/get/${_id}` });
  },
};

export const postLeadService = {
  api,
  post: async (data: any) => {
    return await post({
      api: `${api}/upsert`,
      options: {
        data, 
      }
    });
  },
};