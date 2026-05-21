let apiBrevo = "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";

// Función para mostrar alertas estilizadas
function mostrarAlerta(tipo, titulo, mensaje) {
  console.log(tipo, titulo, mensaje);
  // Remover alerta anterior si existe
  const alertaExistente = document.querySelector(".alerta-custom");
  if (alertaExistente) {
    alertaExistente.remove();
  }

  // Configuración de estilos según el tipo
  const estilos = {
    exito: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-900",
      iconColor: "text-green-500",
      icon: '<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/>',
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-900",
      iconColor: "text-red-500",
      icon: '<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/>',
    },
    info: {
      bg: "bg-teal-100",
      border: "border-teal-500",
      text: "text-teal-900",
      iconColor: "text-teal-500",
      icon: '<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>',
    },
    advertencia: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-900",
      iconColor: "text-yellow-500",
      icon: '<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/>',
    },
  };

  const estilo = estilos[tipo] || estilos.info;

  // Crear la alerta
  const alerta = document.createElement("div");
  alerta.className = `alerta-custom ${estilo.bg} border-t-4 ${estilo.border} rounded-b ${estilo.text} px-4 py-3 shadow-md fixed bottom-4 right-4 z-100 max-w-md`;
  alerta.setAttribute("role", "alert");

  alerta.innerHTML = `
        <div class="flex">
            <div class="py-1">
                <svg class="fill-current h-6 w-6 ${estilo.iconColor} mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    ${estilo.icon}
                </svg>
            </div>
            <div class="flex-1">
                <p class="font-bold">${titulo}</p>
                <p class="text-sm">${mensaje}</p>
            </div>
            <button class="ml-4 text-xl font-bold hover:opacity-70" onclick="this.parentElement.parentElement.remove()">
                ×
            </button>
        </div>
    `;

  document.body.appendChild(alerta);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (alerta.parentElement) {
      alerta.style.transition = "opacity 0.5s";
      alerta.style.opacity = "0";
      setTimeout(() => alerta.remove(), 500);
    }
  }, 5000);
}

// Función para enviar notificación al administrador
async function enviarNotificacionAdmin(datos, base) {
  console.log(base);
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiBrevo, // ⚠️ Reemplaza con tu API key
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "PrestaSoluciones Web",
          email: "noreply@prestasolucionescol.com",
        },
        to: [
          {
            email: "nickdevbarrientos@gmail.com",
            name: "Administrador Web",
          },
        ],
        subject: `Nuevo mensaje desde la web de PrestaSoluciones de ${datos.name}`,
        htmlContent: `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding: 30px 0;">
    <tr>
      <td align="center">
 
        <!-- Contenedor principal -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:4px; overflow:hidden; max-width:600px; width:100%;">
 
          <!-- Barra superior naranja -->
          <tr>
            <td style="background-color:#0183c5; height:52px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
 
          <!-- Cuerpo del correo -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
 
              <!-- Título -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
 
                <!-- Párrafo 1 -->
                <tr>
                  <td style="padding-bottom: 16px; font-size:15px; color:#333333; line-height:1.6; font-family: Arial, sans-serif;">
                    Hemos recibido un mensaje desde la web de PrestaSoluciones con la siguiente solicitud:
                  </td>
                </tr>

 
                <!-- Lista de datos -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      
                      <!-- Nombre -->
                      <tr>
                        <td style="padding: 5px 0 5px 10px; font-size:15px; color:#333333; font-family: Arial, sans-serif; line-height:1.6;">
                          <span style="color:#555555; font-size:18px; vertical-align:middle; margin-right:8px;">&bull;</span>
                          <strong>Nombre:</strong> ${datos.name}
                        </td>
                      </tr>
                      
                      <!-- Nombre -->
                      <tr>
                        <td style="padding: 5px 0 5px 10px; font-size:15px; color:#333333; font-family: Arial, sans-serif; line-height:1.6;">
                          <span style="color:#555555; font-size:18px; vertical-align:middle; margin-right:8px;">&bull;</span>
                          <strong>Telefono:</strong> <a href="https://wa.me/57${datos.phone}" target="_blank">${datos.phone}</a>
                        </td>
                      </tr>
 
                      <!-- Servicio -->
                      <tr>
                        <td style="padding: 5px 0 5px 10px; font-size:15px; color:#333333; font-family: Arial, sans-serif; line-height:1.6;">
                          <span style="color:#555555; font-size:18px; vertical-align:middle; margin-right:8px;">&bull;</span>
                          <strong>Email:</strong> ${datos.email}
                        </td>
                      </tr>
 
                      <!-- Teléfono -->
                      <tr>
                        <td style="padding: 5px 0 5px 10px; font-size:15px; color:#333333; font-family: Arial, sans-serif; line-height:1.6;">
                          <span style="color:#555555; font-size:18px; vertical-align:middle; margin-right:8px;">&bull;</span>
                          <strong>Departamento:</strong> ${datos.city}
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 5px 0 5px 10px; font-size:15px; color:#333333; font-family: Arial, sans-serif; line-height:1.6;">
                          <span style="color:#555555; font-size:18px; vertical-align:middle; margin-right:8px;">&bull;</span>
                          <strong>Detalles:</strong><br> ${datos.message}
                        </td>
                      </tr>
 
                    </table>
                  </td>
                </tr>
 
 
 
              </table>
            </td>
          </tr>
 
          <!-- Línea divisoria -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border:none; border-top:1px solid #e0e0e0; margin:0;" />
            </td>
          </tr>
 
 
        </table>
        <!-- Fin contenedor principal -->
 
      </td>
    </tr>
  </table>    
                `,
        replyTo: {
          email: datos.email,
          name: datos.name,
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Notificación enviada al admin:", result);
      return result;
    } else {
      throw new Error(result.message || "Error al enviar notificación al admin");
    }
  } catch (error) {
    console.error("Error al notificar admin:", error);
    throw error;
  }
}

// Función para enviar confirmación al usuario
async function enviarConfirmacionUsuario(datos) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiBrevo, // ⚠️ Reemplaza con tu API key
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "PrestaSoluciones",
          email: "noreply@prestasoluciones.com",
        },
        to: [
          {
            email: datos.email,
            name: datos.name,
          },
        ],
        subject: "¡Gracias por contactarnos! de parte de PrestaSoluciones",
        htmlContent: `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding: 30px 0;">
    <tr>
      <td align="center">
 
        <!-- Contenedor principal -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:4px; overflow:hidden; max-width:600px; width:100%;">
 
          <!-- Barra superior naranja -->
          <tr>
            <td style="background-color:#0183c5; height:52px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
 
          <!-- Cuerpo del correo -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
 
              <!-- Título -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 28px;">
                    <h1 style="margin:0; font-size:22px; font-weight:bold; color:#0183c5; font-family: Arial, sans-serif;">
                      Gracias por contactarnos, ${datos.name}
                    </h1>
                  </td>
                </tr>
 
                <!-- Párrafo 1 -->
                <tr>
                  <td style="padding-bottom: 16px; font-size:15px; color:#333333; line-height:1.6; font-family: Arial, sans-serif;">
                    Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.
                  </td>
                </tr>
 
                <!-- Lista de datos -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      
 
                <!-- Párrafo final -->
                <tr>
                  <td style="padding-bottom: 10px; font-size:15px; color:#333333; line-height:1.6; font-family: Arial, sans-serif;">
                    Si tienes alguna pregunta adicional, no dudes en generar otra solicitud.
                  </td>
                </tr>
 
              </table>
            </td>
          </tr>
 
          <!-- Línea divisoria -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border:none; border-top:1px solid #e0e0e0; margin:0;" />
            </td>
          </tr>
 
          <!-- Pie de página -->
          <tr>
            <td align="center" style="padding: 18px 40px 28px 40px;">
              <p style="margin:0; font-size:12px; color:#999999; font-family: Arial, sans-serif; line-height:1.5;">
                Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
              </p>
            </td>
          </tr>
 
        </table>
        <!-- Fin contenedor principal -->
 
      </td>
    </tr>
  </table>
                `,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Confirmación enviada al usuario:", result);
      return result;
    } else {
      throw new Error(result.message || "Error al enviar confirmación al usuario");
    }
  } catch (error) {
    console.error("Error al enviar confirmación:", error);
    throw error;
  }
}

// Función principal que envía ambos emails
async function enviarEmail(datos) {
  try {
    // Enviar ambos emails en paralelo
    await Promise.all([enviarNotificacionAdmin(datos), enviarConfirmacionUsuario(datos)]);

    mostrarAlerta("exito", "¡Correo enviado exitosamente!", "Tu mensaje ha sido enviado. Te responderemos pronto.");

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    mostrarAlerta("error", "Error al enviar el correo", "Por favor intenta de nuevo más tarde.");
    throw error;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formularioContacto");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const btnEnviar = document.getElementById("btnEnviar");

    btnEnviar.disabled = true;
    mostrarAlerta("info", "Enviando mensaje...", "Por favor espera un momento.");

    try {
      await enviarEmail(data);
      formulario.reset();
    } catch (error) {
      mostrarAlerta("error", "Error al enviar", "Inténtalo de nuevo.");
      console.error(error);
    } finally {
      btnEnviar.disabled = false;
    }
  });
});
