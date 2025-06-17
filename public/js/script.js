function derivadoVisible() {
  const tipoAdmisionSelect = document.getElementById('tipoAdmision');
  const medicoDerivanteInput = document.getElementById('medicoDerivante');
  if (!tipoAdmisionSelect || !medicoDerivanteInput) return;

  function toggleMedicoDerivante() {
    const selected = tipoAdmisionSelect.options[tipoAdmisionSelect.selectedIndex];
    if (selected && selected.textContent.trim().toLowerCase() === 'derivado') {
      medicoDerivanteInput.disabled = false;
      medicoDerivanteInput.classList.remove('bg-gray-100', 'cursor-not-allowed');
      medicoDerivanteInput.classList.add('bg-white', 'focus:ring-blue-500');
    } else {
      medicoDerivanteInput.disabled = true;
      medicoDerivanteInput.value = '';
      medicoDerivanteInput.classList.add('bg-gray-100', 'cursor-not-allowed');
      medicoDerivanteInput.classList.remove('bg-white', 'focus:ring-blue-500');
    }
  }

  tipoAdmisionSelect.addEventListener('change', toggleMedicoDerivante);
  toggleMedicoDerivante();
}


function localidadesPorProvincia() {
  const provinciaSelect = document.getElementById('provincia');
  const localidadSelect = document.getElementById('localidad');
  if (!provinciaSelect || !localidadSelect) return;

  provinciaSelect.addEventListener('change', function() {
    const provinciaId = parseInt(this.value);
    localidadSelect.innerHTML = '<option value="" selected disabled>Seleccionar</option>';
    const provincia = provinciasData.find(p => p.id === provinciaId);
    if (provincia && provincia.Localidades) {
      provincia.Localidades.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc.id;
        option.textContent = loc.nombre;
        localidadSelect.appendChild(option);
      });
    }
  });
}

function dropdownMenu(){
  const accountMenuButton = document.getElementById('account-menu-button');
  const accountMenu = document.getElementById('account-menu');
  
  // Alternar el menú desplegable
  accountMenuButton.addEventListener('click', function() {
    const isExpanded = accountMenu.classList.toggle('hidden');
    accountMenuButton.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener('click', function(event) {
    if (!accountMenu.contains(event.target) && event.target !== accountMenuButton) {
      accountMenu.classList.add('hidden');
      accountMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Acción para el botón de salir
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      // Aquí iría tu lógica para cerrar sesión
      console.log('Saliendo...');
      // Por ejemplo: window.location.href = '/logout';
    });
  }
}





document.addEventListener('DOMContentLoaded', function() {
  derivadoVisible();              // Habilita o deshabilita el campo de médico derivante
  localidadesPorProvincia();      // Carga las localidades al seleccionar una provincia
  dropdownMenu();                 // Muestra un submenu en el navbar
});

