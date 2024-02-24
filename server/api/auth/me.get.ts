export default defineEventHandler((event) => {
  const token = getCookie(event, "token");
  if (!token) return createError({ status: 403, message: "Unauthorized" });

  return verifyToken(token);
});
