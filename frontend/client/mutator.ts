export const customFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    // 異なるオリジンからのCookieを保存する
    // 異なるオリジンへCookieを送信する
    credentials: "include",
  });

  const response: { status: number; data?: unknown } = { status: res.status };
  const contentType = res.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    response.data = await res.json();
  }

  return response;
};
