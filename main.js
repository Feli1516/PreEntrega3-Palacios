const menu = [
    {id: 1, nombre: "milanesa", precio: 2000},
    {id: 2, nombre: "pizza", precio: 1700},
    {id: 3, nombre: "hamburguesa", precio: 1900},
    {id: 4, nombre: "fideos", precio: 1600},
    {id: 5, nombre: "agua", precio: 600},
    {id: 6, nombre: "jugos", precio: 600},
    {id: 7, nombre: "gaseosa", precio: 700},
    {id: 8, nombre: "vino", precio: 1500},
];

let carrito = [];
let verCarrito = document.getElementById("verCarrito");
let container = document.getElementById("container");
let elMenu = document.getElementById("elMenu");
let vaciar = document.getElementById("vaciar");


menu.forEach((item) => {
    let div = document.createElement("div");
    div.className = "productos";
    div.innerHTML = `
    <h3 class="id-productos">id: ${item.id}</h3>
    <p>Nombre: ${item.nombre}</p>
    <b>$${item.precio}</b>
    `;
    elMenu.append(div);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";

    div.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
    });
});


verCarrito.addEventListener("click", () => {
    container.innerHTML = "";
    container.style.display = "flex";
    const headerCarrito = document.createElement("div");
    headerCarrito.className = "titulo-carrito";
    headerCarrito.innerHTML = `
        <h1>Carrito</h1>
    `
    container.append(headerCarrito);

    const exitCarrito = document.createElement("button");
    exitCarrito.className = "boton-exit";
    exitCarrito.innerText = "x";

    exitCarrito.addEventListener("click", () => {
        container.style.display = "none";
    });

    container.append(exitCarrito);

    let carritoStorage = localStorage.getItem("carrito");

    if (carritoStorage) {
        carrito = JSON.parse(carritoStorage);
    }else{
        let div = document.createElement("div");
        div.className = "sin-productos";
        div.innerHTML = "No hay productos en el carrito";
        container.append(div);
    }
    carrito.forEach((product) => {
        let contentCarrito = document.createElement("div");
        contentCarrito.className = "content-carrito";
        contentCarrito.innerHTML = `
        <h2>nombre: ${product.nombre}</h2>
        <p>precio: ${product.precio}</p>
        `;
    
        container.append(contentCarrito);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    
    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total";
    totalCarrito.innerHTML = `Total a pagar:$${total}`;
    container.append(totalCarrito);

});

vaciar.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});