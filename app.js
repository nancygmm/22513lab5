function titulo() {
  const h1 = document.createElement("h1");
  h1.textContent = "WASSUP";
  return h1;
}

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

function contenedorMensaje() {
  const divInputContainer = document.createElement("div");
  divInputContainer.classList.add("input-container");
  return divInputContainer;
}
function mensaje() {
  const inputMessage = document.createElement("input");
  inputMessage.type = "text";
  inputMessage.classList.add("message-input");
  inputMessage.id = "message-input";
  inputMessage.placeholder = "Escribe aquí... (max 140 characters)...";
  inputMessage.style.flex = "1";
  inputMessage.style.marginRight = "10px";
  inputMessage.style.width = "95%";

  inputMessage.onkeypress = function (event) {
    if (event.keyCode === 13) {
      const buttonSend = document.querySelector(".submit-button");
      buttonSend.click();
    }
  };

  return inputMessage;
}

function obtenerYAgregarMensajesAlChat() {
    fetch('https://chat.arpanetos.lol/messages')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        for (let i = data.length - 1; i >= 0; i--) {
            agregarMensajeAlChat(data[i]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function agregarMensajeAlChat(mensaje) {
    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.textContent = mensaje.message;

    nuevoMensaje.style.backgroundColor = "#f2f2f2";
    nuevoMensaje.style.borderRadius = "5px";
    nuevoMensaje.style.padding = "10px";
    nuevoMensaje.style.marginBottom = "5px";
    nuevoMensaje.style.maxWidth = "70%";

    const chatWindow = document.getElementById("chat-window");
    chatWindow.insertBefore(nuevoMensaje, chatWindow.firstChild);
}

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

  buttonSend.onclick = function () {
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

    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.textContent = mensaje;

    nuevoMensaje.style.backgroundColor = "#f2f2f2";
    nuevoMensaje.style.borderRadius = "5px";
    nuevoMensaje.style.padding = "10px";
    nuevoMensaje.style.marginBottom = "5px";
    nuevoMensaje.style.maxWidth = "70%";

    const chatWindow = document.getElementById("chat-window");
    chatWindow.insertBefore(nuevoMensaje, chatWindow.firstChild);

    inputMessage.value = "";
  };

  return buttonSend;
}

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

  let darkModeEnabled = false; 

  buttonDarkMode.onclick = function () {
    darkModeEnabled = !darkModeEnabled;

    if (darkModeEnabled) {

      document.body.style.backgroundColor = "#222";
      buttonDarkMode.style.backgroundColor = "#ccc"; 
    } else {
      document.body.style.backgroundColor = "#fff";
      buttonDarkMode.style.backgroundColor = "#333"; 
    }
  };

  return buttonDarkMode;
}

document.body.appendChild(titulo());
document.body.appendChild(chat());

const divInputContainer = contenedorMensaje();
divInputContainer.appendChild(mensaje());
divInputContainer.appendChild(enviar());
document.body.appendChild(divInputContainer);
document.body.appendChild(crearBotonModoOscuro());

obtenerYAgregarMensajesAlChat();
