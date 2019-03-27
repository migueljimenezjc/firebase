console.log('TODO CHIDO!')

function getProductsList () {
  var array = [];
  firebase.database().ref("listaDeProductos/").once("value",(snapshot)=> { 
     array = snapshotToArray(snapshot);
  });
  const listaDeProductosAsString = localStorage.getItem('listaDeProductos')
  const listaDeProductos = JSON.parse(listaDeProductosAsString)
  return listaDeProductos
}

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });
  console.log(returnArr);
  return returnArr;
};

function renderProducts (listaDeProductos) {

  $('#product-wrapper').html('')

  let html = ''


  listaDeProductos.forEach(producto => {
    console.log('producto: ', producto)
    html = html + ` 
      <div class="col-md-3">
        <div class="card bg-dark">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 id="product-name" class="card-title">${producto.nombre}</h5>
            <p id="product-description" class="card-text">${producto.descripcion}</p>
            <div class="extra-info d-flex justify-content-between">
              <div id="product-quantity">Cantidad: <span>${producto.cantidad}</span></div>
              <div id="product-price">${producto.precio}</div>
            </div>
            <div class="btn btn-default btn-block mt-3">Agregar al carrito</div>
          </div>
        </div>
      </div>
    `
  })
  $('#product-wrapper').html(html)
}

$(document).ready(function () {
  const listaDeProductos = getProductsList()
  renderProducts(listaDeProductos)
})

