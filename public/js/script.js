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


document.addEventListener('DOMContentLoaded', function() {
  derivadoVisible();              // Habilita o deshabilita el campo de médico derivante
  localidadesPorProvincia();      // Carga las localidades al seleccionar una provincia
});

