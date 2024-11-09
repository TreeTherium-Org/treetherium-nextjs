import axios from "../libs/axios";
import useSWR from "swr";

const fetcher = async (request, params, returnOriginalData) => {
  const headers = {};

  const result = await axios().get(request, { params, headers });
  if (returnOriginalData) return result;

  return result.data;
};

export default function useQuery(
  request,
  {
    fallbackData,
    immutable = false,
    returnOriginalData = false,
    ...config
  } = {}
) {
  return useSWR(
    request,
    (request) => {
      if (Array.isArray(request)) {
        const [requestStr, params] = request;
        return fetcher(requestStr, params, returnOriginalData);
      } else {
        return fetcher(request, {}, returnOriginalData);
      }
    },
    {
      ...config,
      ...(immutable
        ? {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }
        : {}),
      fallbackData: fallbackData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: fallbackData,
      },
      onErrorRetry: () => {},
    }
  );
}
