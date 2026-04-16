// historia.js
// Lógica de lectura/escritura de historias clínicas.

const rolesApi = window.MCRoles;

function currentLang() {
  return localStorage.getItem("mediconnect_lang") || "es";
}

const HIST_I18N = {
  es: {
    noDiagnosis: "Sin diagnóstico registrado",
    personalData: "Datos personales",
    background: "Antecedentes",
    medications: "Medicamentos",
    consults: "Consultas",
    documents: "Documentos",
    editData: "Editar datos",
    edit: "Editar",
    diagnosis: "Diagnóstico",
    treatment: "Tratamiento",
    notes: "Notas evolución",
    doctor: "Médico",
    attachments: "Adjuntos",
    name: "Nombre",
    birthDate: "Fecha de nacimiento",
    sex: "Sexo",
    bloodType: "Tipo de sangre",
    allergies: "Alergias",
    baseDiseases: "Enfermedades base",
    surgicalHistory: "Antecedentes quirúrgicos",
    familyHistory: "Antecedentes familiares",
    from: "desde",
    noMeds: "Sin medicamentos registrados",
    noConsults: "Sin consultas registradas",
    consultLabel: "consulta",
    noDocs: "No hay documentos adjuntos",
    myClinicalHistory: "Mi historia clínica",
    noHistoryForUser: "No existe historia disponible para este usuario.",
    myDigitalHistory: "Mi historia clínica digital",
    readOnlyMsg: "Solo lectura — Contacta a tu médico para modificaciones",
    clinicalHistory: "Historia clínica",
    historyNotExists: "La historia no existe.",
    accessDenied: "Acceso denegado",
    noPermission: "No tienes permisos para ver esta historia clínica.",
    lastUpdate: "Última actualización",
    editGeneralData: "Editar datos generales",
    allergiesComma: "Alergias (separadas por coma)",
    medsOnePerLine: "Medicamentos (uno por línea: nombre|dosis|desde)",
    saveChanges: "Guardar cambios",
    newConsult: "Nueva consulta",
    consultReason: "Motivo de consulta",
    indicatedTreatment: "Tratamiento indicado",
    evolutionNotes: "Notas de evolución",
    attachmentsMock: "Adjuntos (nombres simulados)",
    saveConsult: "Guardar consulta",
    cancelEdit: "Cancelar edición",
    changeHistory: "Historial de cambios",
    updatedBy: "Actualizado por",
    noChanges: "Sin cambios registrados.",
    historyUpdated: "Historia actualizada",
    generalDataEdited: "Edición de datos generales",
    editConsult: "Editar consulta",
    completeRequired: "Completa fecha, motivo y diagnóstico",
    consultEditLog: "Edición de consulta {{id}}",
    generalMedicine: "Medicina general",
    newConsultLog: "Nueva consulta {{id}}"
  },
  en: {
    noDiagnosis: "No diagnosis recorded",
    personalData: "Personal data",
    background: "Background",
    medications: "Medications",
    consults: "Consultations",
    documents: "Documents",
    editData: "Edit data",
    edit: "Edit",
    diagnosis: "Diagnosis",
    treatment: "Treatment",
    notes: "Progress notes",
    doctor: "Doctor",
    attachments: "Attachments",
    name: "Name",
    birthDate: "Birth date",
    sex: "Sex",
    bloodType: "Blood type",
    allergies: "Allergies",
    baseDiseases: "Underlying diseases",
    surgicalHistory: "Surgical history",
    familyHistory: "Family history",
    from: "since",
    noMeds: "No medications recorded",
    noConsults: "No consultations recorded",
    consultLabel: "consultation",
    noDocs: "No attached documents",
    myClinicalHistory: "My clinical history",
    noHistoryForUser: "No history is available for this user.",
    myDigitalHistory: "My digital clinical history",
    readOnlyMsg: "Read-only — Contact your doctor for updates",
    clinicalHistory: "Clinical history",
    historyNotExists: "The history does not exist.",
    accessDenied: "Access denied",
    noPermission: "You don't have permission to view this clinical history.",
    lastUpdate: "Last update",
    editGeneralData: "Edit general data",
    allergiesComma: "Allergies (comma-separated)",
    medsOnePerLine: "Medications (one per line: name|dose|since)",
    saveChanges: "Save changes",
    newConsult: "New consultation",
    consultReason: "Reason for consultation",
    indicatedTreatment: "Recommended treatment",
    evolutionNotes: "Progress notes",
    attachmentsMock: "Attachments (simulated names)",
    saveConsult: "Save consultation",
    cancelEdit: "Cancel edit",
    changeHistory: "Change history",
    updatedBy: "Updated by",
    noChanges: "No changes recorded.",
    historyUpdated: "History updated",
    generalDataEdited: "General data edited",
    editConsult: "Edit consultation",
    completeRequired: "Complete date, reason, and diagnosis",
    consultEditLog: "Consultation edited {{id}}",
    generalMedicine: "General medicine",
    newConsultLog: "New consultation {{id}}"
  },
  pt: {
    noDiagnosis: "Sem diagnóstico registrado",
    personalData: "Dados pessoais",
    background: "Antecedentes",
    medications: "Medicamentos",
    consults: "Consultas",
    documents: "Documentos",
    editData: "Editar dados",
    edit: "Editar",
    diagnosis: "Diagnóstico",
    treatment: "Tratamento",
    notes: "Notas de evolução",
    doctor: "Médico",
    attachments: "Anexos",
    name: "Nome",
    birthDate: "Data de nascimento",
    sex: "Sexo",
    bloodType: "Tipo sanguíneo",
    allergies: "Alergias",
    baseDiseases: "Doenças de base",
    surgicalHistory: "Antecedentes cirúrgicos",
    familyHistory: "Antecedentes familiares",
    from: "desde",
    noMeds: "Sem medicamentos registrados",
    noConsults: "Sem consultas registradas",
    consultLabel: "consulta",
    noDocs: "Não há documentos anexados",
    myClinicalHistory: "Meu histórico clínico",
    noHistoryForUser: "Não existe histórico disponível para este usuário.",
    myDigitalHistory: "Meu histórico clínico digital",
    readOnlyMsg: "Somente leitura — Contate seu médico para alterações",
    clinicalHistory: "Histórico clínico",
    historyNotExists: "O histórico não existe.",
    accessDenied: "Acesso negado",
    noPermission: "Você não tem permissão para ver este histórico clínico.",
    lastUpdate: "Última atualização",
    editGeneralData: "Editar dados gerais",
    allergiesComma: "Alergias (separadas por vírgula)",
    medsOnePerLine: "Medicamentos (uma linha por item: nome|dose|desde)",
    saveChanges: "Salvar alterações",
    newConsult: "Nova consulta",
    consultReason: "Motivo da consulta",
    indicatedTreatment: "Tratamento indicado",
    evolutionNotes: "Notas de evolução",
    attachmentsMock: "Anexos (nomes simulados)",
    saveConsult: "Salvar consulta",
    cancelEdit: "Cancelar edição",
    changeHistory: "Histórico de alterações",
    updatedBy: "Atualizado por",
    noChanges: "Sem alterações registradas.",
    historyUpdated: "Histórico atualizado",
    generalDataEdited: "Edição de dados gerais",
    editConsult: "Editar consulta",
    completeRequired: "Preencha data, motivo e diagnóstico",
    consultEditLog: "Edição da consulta {{id}}",
    generalMedicine: "Medicina geral",
    newConsultLog: "Nova consulta {{id}}"
  }
};

HIST_I18N.de = { ...HIST_I18N.en };
HIST_I18N.it = { ...HIST_I18N.en };
HIST_I18N.pl = { ...HIST_I18N.en };
HIST_I18N.tr = {
  noDiagnosis: "Tanı kaydı yok",
  personalData: "Kişisel bilgiler",
  background: "Geçmiş",
  medications: "İlaçlar",
  consults: "Konsültasyonlar",
  documents: "Belgeler",
  editData: "Verileri düzenle",
  edit: "Düzenle",
  diagnosis: "Tanı",
  treatment: "Tedavi",
  notes: "Süreç notları",
  doctor: "Doktor",
  attachments: "Ekler",
  name: "Ad",
  birthDate: "Doğum tarihi",
  sex: "Cinsiyet",
  bloodType: "Kan grubu",
  allergies: "Alerjiler",
  baseDiseases: "Temel hastalıklar",
  surgicalHistory: "Cerrahi geçmiş",
  familyHistory: "Aile geçmişi",
  from: "başlangıç",
  noMeds: "Kayıtlı ilaç yok",
  noConsults: "Kayıtlı konsültasyon yok",
  consultLabel: "konsültasyon",
  noDocs: "Ekli belge yok",
  myClinicalHistory: "Klinik geçmişim",
  noHistoryForUser: "Bu kullanıcı için geçmiş bulunmuyor.",
  myDigitalHistory: "Dijital klinik geçmişim",
  readOnlyMsg: "Salt okunur — Değişiklik için doktorunuzla iletişime geçin",
  clinicalHistory: "Klinik geçmiş",
  historyNotExists: "Geçmiş mevcut değil.",
  accessDenied: "Erişim reddedildi",
  noPermission: "Bu klinik geçmişi görüntüleme izniniz yok.",
  lastUpdate: "Son güncelleme",
  editGeneralData: "Genel verileri düzenle",
  allergiesComma: "Alerjiler (virgülle ayırın)",
  medsOnePerLine: "İlaçlar (satır başına: ad|doz|başlangıç)",
  saveChanges: "Değişiklikleri kaydet",
  newConsult: "Yeni konsültasyon",
  consultReason: "Konsültasyon nedeni",
  indicatedTreatment: "Önerilen tedavi",
  evolutionNotes: "Süreç notları",
  attachmentsMock: "Ekler (simüle adlar)",
  saveConsult: "Konsültasyonu kaydet",
  cancelEdit: "Düzenlemeyi iptal et",
  changeHistory: "Değişiklik geçmişi",
  updatedBy: "Güncelleyen",
  noChanges: "Kayıtlı değişiklik yok.",
  historyUpdated: "Geçmiş güncellendi",
  generalDataEdited: "Genel veriler düzenlendi",
  editConsult: "Konsültasyonu düzenle",
  completeRequired: "Tarih, neden ve tanıyı doldurun",
  consultEditLog: "Konsültasyon düzenlendi {{id}}",
  generalMedicine: "Genel tıp",
  newConsultLog: "Yeni konsültasyon {{id}}"
};

function th(key, vars = {}) {
  const lang = currentLang();
  const base = HIST_I18N[lang]?.[key] || HIST_I18N.es[key] || key;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), base);
}

function getHistorias() {
  return rolesApi.loadJSON(rolesApi.STORAGE_KEYS.historias, []);
}

function saveHistorias(historias) {
  rolesApi.saveJSON(rolesApi.STORAGE_KEYS.historias, historias);
}

function getHistoriaByPacienteId(pacienteId) {
  return getHistorias().find((h) => h.pacienteId === Number(pacienteId));
}

function formatDateTime(value) {
  return new Date(value).toLocaleString();
}

function pushBitacora(historia, by, what) {
  if (!Array.isArray(historia.bitacora)) historia.bitacora = [];
  historia.bitacora.unshift({ at: new Date().toISOString(), by, what });
  historia.ultimaActualizacion = new Date().toISOString().slice(0, 10);
  historia.actualizadoPor = by;
}

function getLatestDiagnosis(historia) {
  if (!historia?.consultas?.length) return th("noDiagnosis");
  return historia.consultas[0]?.diagnostico || th("noDiagnosis");
}

function buildTabs(prefix, editable) {
  return `
    <div class="inline-actions" style="margin:0.5rem 0 1rem;">
      <button class="btn-outline" data-${prefix}-tab="personales">${th("personalData")}</button>
      <button class="btn-outline" data-${prefix}-tab="antecedentes">${th("background")}</button>
      <button class="btn-outline" data-${prefix}-tab="medicamentos">${th("medications")}</button>
      <button class="btn-outline" data-${prefix}-tab="consultas">${th("consults")}</button>
      <button class="btn-outline" data-${prefix}-tab="documentos">${th("documents")}</button>
      ${editable ? `<button class="btn-primary" id="btn-editar-datos">${th("editData")}</button>` : ""}
    </div>
  `;
}

function getAdjuntos(historia) {
  const out = [];
  (historia.consultas || []).forEach((c) => {
    (c.adjuntos || []).forEach((a) => out.push({ consultaId: c.id, nombre: a }));
  });
  return out;
}

function renderConsultasCards(consultas, editable) {
  return (consultas || [])
    .map(
      (c) => `
      <details class="card" style="margin-bottom:0.7rem;">
        <summary style="cursor:pointer; display:flex; justify-content:space-between; gap:0.5rem; align-items:center;">
          <span><strong>${c.fecha}</strong> · ${c.especialidad} · ${c.motivo}</span>
          ${editable ? `<button class="btn-outline" data-edit-consulta="${c.id}" type="button">✏️ ${th("edit")}</button>` : ""}
        </summary>
        <div style="margin-top:0.6rem;">
          <p><strong>${th("diagnosis")}:</strong> ${c.diagnostico || "-"}</p>
          <p><strong>${th("treatment")}:</strong> ${c.tratamiento || "-"}</p>
          <p><strong>${th("notes")}:</strong> ${c.notasEvolucion || "-"}</p>
          <p><strong>${th("doctor")}:</strong> ${c.medico}</p>
          ${c.adjuntos?.length ? `<p><strong>${th("attachments")}:</strong> ${c.adjuntos.join(", ")}</p>` : ""}
        </div>
      </details>
    `
    )
    .join("");
}

function wireTabs(container, prefix, historia, editable) {
  const tabContent = container.querySelector(`#${prefix}-tab-content`);
  const draw = (tab) => {
    if (tab === "personales") {
      tabContent.innerHTML = `
        <div class="grid grid-2">
          <div class="card"><strong>${th("name")}:</strong> ${historia.pacienteNombre}</div>
          <div class="card"><strong>${th("birthDate")}:</strong> ${historia.fechaNacimiento}</div>
          <div class="card"><strong>${th("sex")}:</strong> ${historia.sexo}</div>
          <div class="card"><strong>${th("bloodType")}:</strong> ${historia.tipoSangre}</div>
          <div class="card"><strong>${th("allergies")}:</strong> ${(historia.alergias || []).join(", ")}</div>
        </div>
      `;
      return;
    }

    if (tab === "antecedentes") {
      tabContent.innerHTML = `
        <div class="card"><strong>${th("baseDiseases")}:</strong> ${(historia.enfermedadesBase || []).join(", ") || "N/A"}</div>
        <div class="card" style="margin-top:0.6rem;"><strong>${th("surgicalHistory")}:</strong> ${(historia.antecedentesQuirurgicos || []).join(", ") || "N/A"}</div>
        <div class="card" style="margin-top:0.6rem;"><strong>${th("familyHistory")}:</strong> ${historia.antecedentesFamiliares || "N/A"}</div>
      `;
      return;
    }

    if (tab === "medicamentos") {
      tabContent.innerHTML = `
        ${(historia.medicamentosActuales || [])
          .map((m) => `<div class="card" style="margin-bottom:0.5rem;"><strong>${m.nombre}</strong> · ${m.dosis} · ${th("from")} ${m.desde}</div>`)
          .join("") || `<div class="card">${th("noMeds")}</div>`}
      `;
      return;
    }

    if (tab === "consultas") {
      tabContent.innerHTML = renderConsultasCards([...(historia.consultas || [])].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)), editable) || `<div class="card">${th("noConsults")}</div>`;
      return;
    }

    const docs = getAdjuntos(historia);
    tabContent.innerHTML = docs.length
      ? docs.map((d) => `<div class="card" style="margin-bottom:0.5rem;"><i class="fa-solid fa-download"></i> ${d.nombre} <small>(${th("consultLabel")} ${d.consultaId})</small></div>`).join("")
      : `<div class="card">${th("noDocs")}</div>`;
  };

  container.querySelectorAll(`[data-${prefix}-tab]`).forEach((btn) => {
    btn.addEventListener("click", () => draw(btn.dataset[`${prefix}Tab`]));
  });

  draw("personales");
}

function renderMiHistoria(container, user) {
  const historia = getHistoriaByPacienteId(user.id);
  if (!historia) {
    container.innerHTML = `<section class="card"><h2>${th("myClinicalHistory")}</h2><p>${th("noHistoryForUser")}</p></section>`;
    return;
  }

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">${th("myDigitalHistory")}</h2>
      <div class="badge warning">${th("readOnlyMsg")}</div>
      <p style="margin-top:0.7rem;"><strong>${historia.pacienteNombre}</strong> · ${historia.tipoSangre} · ${th("allergies")}: ${(historia.alergias || []).join(", ")}</p>
      ${buildTabs("patient", false)}
      <div id="patient-tab-content"></div>
    </section>
  `;

  wireTabs(container, "patient", historia, false);
}

function renderHistoriaDetalle(container, { viewer, pacienteId, toast }) {
  const historia = getHistoriaByPacienteId(pacienteId);

  if (!historia) {
    container.innerHTML = `<section class="card"><h2>${th("clinicalHistory")}</h2><p>${th("historyNotExists")}</p></section>`;
    return;
  }

  const canView = rolesApi.canViewHistoria(viewer, pacienteId);
  if (!canView) {
    container.innerHTML = `<section class="card"><h2>${th("accessDenied")}</h2><p>${th("noPermission")}</p></section>`;
    return;
  }

  const canEdit = rolesApi.canEditHistoria(viewer, pacienteId);

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">${th("clinicalHistory")} · ${historia.pacienteNombre}</h2>
      <p><strong>${th("lastUpdate")}:</strong> ${historia.ultimaActualizacion} · ${historia.actualizadoPor}</p>
      ${buildTabs("doctor", canEdit)}
      <div id="doctor-tab-content"></div>
    </section>

    ${canEdit ? `
    <section class="card" style="margin-top:1rem; display:none;" id="edit-general-box">
      <h3>${th("editGeneralData")}</h3>
      <label>${th("allergiesComma")}</label>
      <input id="edit-alergias" value="${(historia.alergias || []).join(", ")}" />
      <label style="margin-top:0.5rem;">${th("baseDiseases")}</label>
      <input id="edit-enfermedades" value="${(historia.enfermedadesBase || []).join(", ")}" />
      <label style="margin-top:0.5rem;">${th("surgicalHistory")}</label>
      <input id="edit-quirurgicos" value="${(historia.antecedentesQuirurgicos || []).join(", ")}" />
      <label style="margin-top:0.5rem;">${th("familyHistory")}</label>
      <textarea id="edit-familiares" rows="2">${historia.antecedentesFamiliares || ""}</textarea>
      <label style="margin-top:0.5rem;">${th("medsOnePerLine")}</label>
      <textarea id="edit-meds" rows="4">${(historia.medicamentosActuales || []).map((m) => `${m.nombre}|${m.dosis}|${m.desde}`).join("\n")}</textarea>
      <div class="inline-actions" style="margin-top:0.6rem;">
        <button class="btn-primary" id="save-general">${th("saveChanges")}</button>
      </div>
    </section>

    <section class="card" style="margin-top:1rem;" id="consulta-form-box">
      <h3 id="consulta-form-title">${th("newConsult")}</h3>
      <div class="grid grid-2">
        <input type="date" id="c-fecha" />
        <input id="c-motivo" placeholder="${th("consultReason")}" />
      </div>
      <textarea id="c-diagnostico" rows="2" placeholder="${th("diagnosis")}"></textarea>
      <textarea id="c-tratamiento" rows="2" placeholder="${th("indicatedTreatment")}"></textarea>
      <textarea id="c-notas" rows="2" placeholder="${th("evolutionNotes")}"></textarea>
      <label>${th("attachmentsMock")}</label>
      <input id="c-adjuntos" type="file" multiple />
      <div class="inline-actions" style="margin-top:0.6rem;">
        <button class="btn-primary" id="save-consulta">${th("saveConsult")}</button>
        <button class="btn-outline" id="cancel-edit-consulta" style="display:none;">${th("cancelEdit")}</button>
      </div>
    </section>
    ` : ""}

    <section class="card" style="margin-top:1rem;">
      <h3>${th("changeHistory")}</h3>
      <div id="bitacora-list">
        ${(historia.bitacora || []).map((b) => `<p>${th("updatedBy")} ${b.by} — ${formatDateTime(b.at)} · ${b.what}</p>`).join("") || `<p>${th("noChanges")}</p>`}
      </div>
    </section>
  `;

  wireTabs(container, "doctor", historia, canEdit);

  if (!canEdit) return;

  let editingConsultaId = null;

  const persist = (what) => {
    const list = getHistorias();
    const idx = list.findIndex((h) => h.pacienteId === Number(pacienteId));
    if (idx < 0) return;
    pushBitacora(historia, viewer.nombre, what);
    list[idx] = historia;
    saveHistorias(list);
    toast(th("historyUpdated"));
    renderHistoriaDetalle(container, { viewer, pacienteId, toast });
  };

  const editGeneralBox = container.querySelector("#edit-general-box");
  container.querySelector("#btn-editar-datos")?.addEventListener("click", () => {
    editGeneralBox.style.display = editGeneralBox.style.display === "none" ? "block" : "none";
  });

  container.querySelector("#save-general")?.addEventListener("click", () => {
    historia.alergias = container.querySelector("#edit-alergias").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.enfermedadesBase = container.querySelector("#edit-enfermedades").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.antecedentesQuirurgicos = container.querySelector("#edit-quirurgicos").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.antecedentesFamiliares = container.querySelector("#edit-familiares").value.trim();
    historia.medicamentosActuales = container
      .querySelector("#edit-meds")
      .value.split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [nombre, dosis, desde] = line.split("|");
        return { nombre: nombre?.trim() || "", dosis: dosis?.trim() || "", desde: desde?.trim() || "" };
      });

    persist(th("generalDataEdited"));
  });

  container.querySelectorAll("[data-edit-consulta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const consulta = (historia.consultas || []).find((c) => c.id === btn.dataset.editConsulta);
      if (!consulta) return;

      editingConsultaId = consulta.id;
      container.querySelector("#consulta-form-title").textContent = `${th("editConsult")} ${consulta.id}`;
      container.querySelector("#c-fecha").value = consulta.fecha;
      container.querySelector("#c-motivo").value = consulta.motivo;
      container.querySelector("#c-diagnostico").value = consulta.diagnostico;
      container.querySelector("#c-tratamiento").value = consulta.tratamiento;
      container.querySelector("#c-notas").value = consulta.notasEvolucion;
      container.querySelector("#cancel-edit-consulta").style.display = "inline-flex";
      container.querySelector("#consulta-form-box").scrollIntoView({ behavior: "smooth" });
    });
  });

  container.querySelector("#cancel-edit-consulta")?.addEventListener("click", () => {
    editingConsultaId = null;
    container.querySelector("#consulta-form-title").textContent = th("newConsult");
    container.querySelector("#cancel-edit-consulta").style.display = "none";
    ["#c-fecha", "#c-motivo", "#c-diagnostico", "#c-tratamiento", "#c-notas"].forEach((id) => {
      container.querySelector(id).value = "";
    });
  });

  container.querySelector("#save-consulta")?.addEventListener("click", () => {
    const fecha = container.querySelector("#c-fecha").value;
    const motivo = container.querySelector("#c-motivo").value.trim();
    const diagnostico = container.querySelector("#c-diagnostico").value.trim();
    const tratamiento = container.querySelector("#c-tratamiento").value.trim();
    const notas = container.querySelector("#c-notas").value.trim();

    if (!fecha || !motivo || !diagnostico) {
      toast(th("completeRequired"));
      return;
    }

    const fileInput = container.querySelector("#c-adjuntos");
    const adjuntos = Array.from(fileInput.files || []).map((f) => f.name);

    if (editingConsultaId) {
      const c = historia.consultas.find((x) => x.id === editingConsultaId);
      if (!c) return;
      c.fecha = fecha;
      c.motivo = motivo;
      c.diagnostico = diagnostico;
      c.tratamiento = tratamiento;
      c.notasEvolucion = notas;
      c.adjuntos = adjuntos.length ? adjuntos : c.adjuntos;
      persist(th("consultEditLog", { id: c.id }));
      return;
    }

    const newId = `c${String(Date.now()).slice(-5)}`;
    historia.consultas.unshift({
      id: newId,
      fecha,
      medico: viewer.nombre,
      especialidad: viewer.especialidad || th("generalMedicine"),
      motivo,
      diagnostico,
      tratamiento,
      notasEvolucion: notas,
      adjuntos
    });

    persist(th("newConsultLog", { id: newId }));
  });
}

const api = {
  getHistorias,
  saveHistorias,
  getHistoriaByPacienteId,
  renderMiHistoria,
  renderHistoriaDetalle,
  getLatestDiagnosis
};

window.MCHistoria = api;

export default api;
