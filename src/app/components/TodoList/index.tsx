export default async function TodoList() {
  const response = await fetch(process.env.API_HOST + 'api/todos').then((res) =>
    res.json()
  );

  console.log(response);

  return <div>Todo List </div>;
}
