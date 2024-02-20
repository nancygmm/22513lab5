// Función para crear y configurar el elemento h1
function titulo() {
    const h1 = document.createElement("h1");
    h1.textContent = "WASSUP";
    return h1;
  }
  
  // Función para crear y configurar el div del chat
  function chat() {
    const divChatWindow = document.createElement("div");
    divChatWindow.id = "chat-window";
    divChatWindow.classList.add("chat-window");
    divChatWindow.style.height = "calc(100vh - 120px)";
    divChatWindow.style.overflowY = "scroll";
    divChatWindow.style.border = "1px solid #ccc";
    divChatWindow.style.padding = "10px";
    divChatWindow.style.marginBottom = "20px";
    divChatWindow.style.height = "680px";
    return divChatWindow;
  }
  
  // Función para crear y configurar el div del contenedor de entrada
  function contenedorMensaje() {
    const divInputContainer = document.createElement("div");
    divInputContainer.classList.add("input-container");
    return divInputContainer;
  }
  
  // Función para crear y configurar el campo de entrada de mensaje
  function mensaje() {
    const inputMessage = document.createElement("input");
    inputMessage.type = "text";
    inputMessage.classList.add("message-input");
    inputMessage.id = "message-input";
    inputMessage.placeholder = "Escribe aquí... (max 140 characters)...";
    inputMessage.style.flex = "1";
    inputMessage.style.marginRight = "10px";
    inputMessage.style.width = "95%";
  
    // Agregar controlador de eventos para el evento 'keypress'
    inputMessage.onkeypress = function (event) {
      // Verificar si la tecla presionada es 'Enter' (código de tecla 13)
      if (event.keyCode === 13) {
        // Obtener el botón de enviar
        const buttonSend = document.querySelector(".submit-button");
        // Simular un clic en el botón de enviar
        buttonSend.click();
      }
    };
  
    return inputMessage;
  }
  
  // Función para realizar una petición GET y agregar mensajes al chat
  function obtenerYAgregarMensajesAlChat() {
      fetch('https://chat.arpanetos.lol/messages')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Iterar sobre cada mensaje en orden inverso y agregarlo al chat
          for (let i = data.length - 1; i >= 0; i--) {
              agregarMensajeAlChat(data[i]);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  
  // Función para crear y agregar un mensaje al chat
  function agregarMensajeAlChat(mensaje) {
      // Crear un nuevo elemento de mensaje
      const nuevoMensaje = document.createElement("div");
      nuevoMensaje.textContent = mensaje.message;
  
      // Aplicar estilos en línea al elemento de mensaje
      nuevoMensaje.style.backgroundColor = "#f2f2f2";
      nuevoMensaje.style.borderRadius = "5px";
      nuevoMensaje.style.padding = "10px";
      nuevoMensaje.style.marginBottom = "5px";
      nuevoMensaje.style.maxWidth = "70%";
  
      // Agregar el nuevo mensaje al chat
      const chatWindow = document.getElementById("chat-window");
      // Agregar el nuevo mensaje al principio del chat
      chatWindow.insertBefore(nuevoMensaje, chatWindow.firstChild);
  }
  
  // Función para realizar una petición POST
  function postRequest(url, data, callback) {
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          callback(null, data);
      })
      .catch(error => {
          callback(error);
      });
  }
  
  // Función para crear y configurar el botón de enviar
  function enviar() {
    const buttonSend = document.createElement("button");
    buttonSend.textContent = "Enviar";
    buttonSend.classList.add("submit-button");
    buttonSend.style.padding = "5px 10px";
    buttonSend.style.cursor = "pointer";
    buttonSend.style.backgroundColor = "#4CAF50";
    buttonSend.style.color = "white";
    buttonSend.style.border = "none";
    buttonSend.style.borderRadius = "5px";
    buttonSend.style.transition = "background-color 0.3s ease";
  
    // Asignar el controlador de eventos al botón de enviar
    buttonSend.onclick = function () {
      // Obtener el valor del inputMessage
      const inputMessage = document.getElementById("message-input");
      const mensaje = inputMessage.value;
      const fecha = new Date();
      const ahorita = fecha.toLocaleTimeString();
      const postData = { username: "gaby", message: mensaje, created_at: ahorita };
      postRequest(
        "https://chat.arpanetos.lol/messages",
        postData,
        function (error, response) {
          if (error) {
            console.error("Error:", error);
          } else {
            console.log("Response:", response);
          }
        }
      );
  
      // Crear un nuevo elemento de mensaje
      const nuevoMensaje = document.createElement("div");
      nuevoMensaje.textContent = mensaje;
  
      // Aplicar estilos en línea al elemento de mensaje
      nuevoMensaje.style.backgroundColor = "#f2f2f2";
      nuevoMensaje.style.borderRadius = "5px";
      nuevoMensaje.style.padding = "10px";
      nuevoMensaje.style.marginBottom = "5px";
      nuevoMensaje.style.maxWidth = "70%";
  
      // Agregar el nuevo mensaje al chat
      const chatWindow = document.getElementById("chat-window");
      // Agregar el nuevo mensaje al principio del chat
      chatWindow.insertBefore(nuevoMensaje, chatWindow.firstChild);
  
      // Limpiar el campo de entrada
      inputMessage.value = "";
    };
  
    return buttonSend;
  }
  
  // Función para crear y configurar el botón de modo oscuro
  function crearBotonModoOscuro() {
    const buttonDarkMode = document.createElement("button");
    buttonDarkMode.textContent = "Modo Oscuro";
    buttonDarkMode.classList.add("dark-mode-button");
    buttonDarkMode.style.padding = "5px 10px";
    buttonDarkMode.style.cursor = "pointer";
    buttonDarkMode.style.backgroundColor = "#333";
    buttonDarkMode.style.color = "white";
    buttonDarkMode.style.border = "none";
    buttonDarkMode.style.borderRadius = "5px";
    buttonDarkMode.style.transition = "background-color 0.3s ease";
  
    let darkModeEnabled = false; // Estado inicial del modo oscuro
  
    // Asignar el controlador de eventos al botón de modo oscuro
    buttonDarkMode.onclick = function () {
      // Alternar entre modo claro y oscuro
      darkModeEnabled = !darkModeEnabled;
  
      if (darkModeEnabled) {
        // Cambiar a modo oscuro
        document.body.style.backgroundColor = "#222";
        buttonDarkMode.style.backgroundColor = "#ccc"; // Cambiar color de fondo del botón para indicar que está activado
      } else {
        // Cambiar a modo claro
        document.body.style.backgroundColor = "#fff";
        buttonDarkMode.style.backgroundColor = "#333"; // Cambiar color de fondo del botón para indicar que está desactivado
      }
    };
  
    return buttonDarkMode;
  }
  
  // Agregar elementos al DOM
  document.body.appendChild(titulo());
  document.body.appendChild(chat());
  
  const divInputContainer = contenedorMensaje();
  divInputContainer.appendChild(mensaje());
  divInputContainer.appendChild(enviar());
  document.body.appendChild(divInputContainer);
  document.body.appendChild(crearBotonModoOscuro());
  
  // Llamar a la función para obtener y agregar mensajes al chat
  obtenerYAgregarMensajesAlChat();
  