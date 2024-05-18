// Función para obtener y mostrar la lista de prendas
async function obtenerPrendas() {
    try {
        //mi api
        const response = await fetch('ropa-api.php');

        if (response.ok) {
            const prendas = await response.json();
            const listaHTML = prendas.map(prenda => `
                <div class="prenda">
                    <p><strong>Nombre:</strong> ${prenda.nombre}</p>
                    <p><strong>Precio:</strong> ${prenda.precio}</p>
                    <img src="${prenda.imagen_url}" alt="${prenda.nombre}" style="width: 100px; height: auto;">
                    <button onclick="editarPrenda(${prenda.id}, '${prenda.nombre}', ${prenda.precio}, '${prenda.imagen_url}')">Editar</button>
                    <button onclick="eliminarPrenda(${prenda.id})">Eliminar</button>
                </div>
            `).join('');

           //motrar prendas
            document.getElementById('lista-prendas').innerHTML = listaHTML;
        } else {
            document.getElementById('lista-prendas').textContent = 'Error al obtener la lista de prendas';
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        document.getElementById('lista-prendas').textContent = 'Error al realizar la solicitud';
    }
}

function cargarImagenPrenda(imagenURL) {
    const imagenElement = document.getElementById('imagen-prenda');
    imagenElement.src = imagenURL;
}
window.onload = obtenerPrendas;

const formulario = document.getElementById('agregar-formulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    
    const formData = new FormData(formulario);
    
    try {
        // Realizar una solicitud POST a la API para agregar la prenda
        const response = await fetch('agregar-ropa.php', {
            method: 'POST',
            body: formData // Enviar datos del formulario
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('mensaje').textContent = data.mensaje;
            // Limpiar el formulario después de agregar la prenda
            formulario.reset();
        } else {
            document.getElementById('mensaje').textContent = 'Error al agregar la prenda';
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Mostrar mensaje de error en caso de excepción
        document.getElementById('mensaje').textContent = 'Error al realizar la solicitud';
    }
});
function eliminarPrenda(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta prenda?')) {
        fetch('eliminar-ropa.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            obtenerPrendas(); // Actualizar la lista de prendas después de eliminar
        })
        .catch(error => console.error('Error al eliminar la prenda:', error));
    }
}

function cargarDatosPrendaEnFormulario(id, nombre2, precio2, imagen2) {
    document.getElementById('id').value = id;
    document.getElementById('nombre2').value = nombre2;
    document.getElementById('precio2').value = precio2;
}

function editarPrenda(id, nombre, precio, imagen) {
    cargarDatosPrendaEnFormulario(id, nombre, precio, imagen);
    const modal = document.getElementById('modal-edicion');
    modal.style.display = 'block';

    // Evento para cerrar el modal al hacer clic en la "X"
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const formularioActualizar = document.getElementById('actualizar-formulario');

formularioActualizar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formDataActualizar = new FormData(formularioActualizar);

    try {
        const response = await fetch('editar-ropa.php', {
            method: 'POST',
            body: formDataActualizar
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('mensaje-actualizacion').textContent = data.mensaje;
            formularioActualizar.reset();
            obtenerPrendas();
        } else {
            document.getElementById('mensaje-actualizacion').textContent = 'Error al actualizar la prenda';
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        document.getElementById('mensaje-actualizacion').textContent = 'Error al realizar la solicitud de actualización';
    }
});
