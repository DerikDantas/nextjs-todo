export async function GET() {
  const response = await fetch('https://api.github.com/users/derikdantas');
  const user = await response.json();

  return Response.json({ user });
}
