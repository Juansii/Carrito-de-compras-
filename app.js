//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //cuando agrega un curso presionando AGREGAR AL CARRITO
  listaCursos.addEventListener('click', agregarCurso);

  //Elimina curso del carrito
  carrito.addEventListener('click', eliminarCurso);

  // vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];

    limpiarHTML(); // así tambien los elementos se eliminan en HTML
  })
}

function agregarCurso(e) {
  e.preventDefault(); //con esto evito que la pagina al hacer click en agregar carrito vuelva para arriba

  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if(e.target.classList.contains('borrar-curso')); {
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    //console.log(articulosCarrito); 
    carritoHTML();
  }
}

//lee el contenido del HTML al que le dimos click
function leerDatosCurso(curso) {
  //  console.log(curso);

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // revisa si un elemento ya existe en el carrito 

  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
      //actualizamos la cantidad 
      const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id) {
          curso.cantidad++;
          return curso; // retorna el objeto actualizado 
        } else {
          return curso; // retorna los objetos que no son los duplicados
        }
      }); 
      articulosCarrito = [...cursos];
    } else {
      //agregamos el curso al carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
  //agrega elementos al arreglo de carrito 
  
  console.log(articulosCarrito);
  carritoHTML();
}

//muestra carrito de compra en HTML
function carritoHTML() {

  limpiarHTML();


  //recorre carrito y genera HTML
  articulosCarrito.forEach(curso => {
    const {imagen, titulo, precio, cantidad, id}= curso; 
    const row = document.createElement('tr');
    row.innerHTML = `
           <td>
            <img src="${imagen}" width="100">
           </td>
           <td>${titulo}</td>
           <td>${precio}</td>
           <td>${cantidad}</td>
           <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
           </td>
        `;

    contenedorCarrito.appendChild(row);
  })
}

//Elimina los cursos del tbody 

function limpiarHTML() {
  contenedorCarrito.innerHTML = '';
}