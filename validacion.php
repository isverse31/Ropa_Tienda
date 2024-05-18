<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "isverse31";
$password = "Reyesdario31?";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Obtener datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Consulta SQL para verificar las credenciales
$sql = "SELECT * FROM usuarios WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    echo "¡Inicio de sesión exitoso!";
    header("Location: admin.html");
} else {
    // Credenciales incorrectas
    echo "Nombre de usuario o contraseña incorrectos.";
}

$conn->close();
?>
