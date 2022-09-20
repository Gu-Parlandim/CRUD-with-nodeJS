const getData = async () => {
  const res = await fetch("http://localhost:3000/dados/get");
  console.log(res);

  const data = await res.json();
  console.log(data);
  let msg = "";
  for (item of data) {
    msg += `
    <p><span>id: </span>${item.id}</p>
    <p><span>Nome: </span>${item.name}</p>
    <p><span>Senha: </span>${item.password}</p>
    <hr>`;
  }
  const htmlData = document.querySelector(".data");
  htmlData.innerHTML = msg;
};

const createData = async () => {
  const name = document.querySelector(".create_form #name").value;
  const password = document.querySelector(".create_form #password").value;

  const db = JSON.stringify({ name, password });
  console.log(db);

  const res = await fetch("http://localhost:3000/dados/create", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: db,
  });
};

const updateData = async () => {
  const id = document.querySelector(".update_form #id").value;
  const name = document.querySelector(".update_form #name").value;
  const password = document.querySelector(".update_form #password").value;

  const db = JSON.stringify({ name, password });
  console.log(db);

  const res = await fetch(`http://localhost:3000/dados/update/${id}`, {
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    method: "PUT",
    body: db,
  });
};

const deleteData = async () => {
  const id = document.querySelector(".getId").value;
  const res = await fetch(`http://localhost:3000/dados/delete/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  await getData();
};

document.querySelector(".get").addEventListener("click", getData);
document.querySelector(".create").addEventListener("click", createData);
document.querySelector(".update").addEventListener("click", updateData);
document.querySelector(".delete").addEventListener("click", deleteData);
