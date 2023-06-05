document.getElementById('editarBtn').addEventListener('click', function() {
    document.getElementById('nombreUsuario').readOnly = false;
    document.getElementById('nombre').readOnly = false;
    document.getElementById('apellidos').readOnly = false;
    document.getElementById('correo').readOnly = false;
    document.getElementById('numSensores').readOnly = false;
    
    document.getElementById('editarBtn').classList.add('d-none');
    document.getElementById('guardarBtn').classList.remove('d-none');
  });

  document.getElementById('perfilForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    var nuevoNombreUsuario = document.getElementById('nombreUsuario').value;
    var nuevoNombre = document.getElementById('nombre').value;
    var nuevoApellidos = document.getElementById('apellidos').value;
    var nuevoCorreo = document.getElementById('correo').value;
    var nuevoNumSensores = document.getElementById('numSensores').value;
    
    // Aquí puedes realizar las acciones necesarias para guardar los nuevos datos
    // Por ejemplo, puedes enviarlos a un servidor o guardarlos en una base de datos
    
    // Una vez que los datos se hayan actualizado correctamente, actualizamos la vista
    document.getElementById('nombreUsuario').value = nuevoNombreUsuario;
    document.getElementById('nombre').value = nuevoNombre;
    document.getElementById('apellidos').value = nuevoApellidos;
    document.getElementById('correo').value = nuevoCorreo;
    document.getElementById('numSensores').value = nuevoNumSensores;

    document.getElementById('nombreUsuario').readOnly = true;
    document.getElementById('nombre').readOnly = true;
    document.getElementById('apellidos').readOnly = true;
    document.getElementById('correo').readOnly = true;
    document.getElementById('numSensores').readOnly = true;

    document.getElementById('guardarBtn').classList.add('d-none');
    document.getElementById('editarBtn').classList.remove('d-none');
  });