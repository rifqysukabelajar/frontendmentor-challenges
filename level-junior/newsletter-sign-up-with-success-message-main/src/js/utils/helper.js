export function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function saveEmail(email) {
  const raw = localStorage.getItem("users");
  const users = raw ? JSON.parse(raw) : [];

  const alreadyExist = users.some((user) => user.email === email);
  if (alreadyExist) return false;

  users.push({ id: Date.now(), email });
  localStorage.setItem("users", JSON.stringify(users));

  return true;
}
