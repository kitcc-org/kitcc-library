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
  const data = await res.json();

  return { status: res.status, data: data };
};
