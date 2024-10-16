export function parseReqToParams(req) {
  const url = new URL(req.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  const page = queryParams.page ? parseInt(queryParams.page) : 1;
  const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;

  delete queryParams.page;
  delete queryParams.limit;

  let params = {};
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value.includes(",")) {
      params[key] = value.split(",");
    } else {
      params[key] = value;
    }
  });

  return { page, limit, ...params };
}

export function renderSuccessResponse({ data, count }) {
  return new Response(JSON.stringify({ data, count }), {
    status: 200,
  });
}

export function renderErrorResponse({ error, message, statusCode = 400 }) {
  return new Response(
    JSON.stringify({ error, message: message || "Something went wrong" }),
    {
      status: statusCode,
    }
  );
}
