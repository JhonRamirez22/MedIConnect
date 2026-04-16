// agenda.js
// Gestión de agenda flexible del médico usando FullCalendar.

const rolesApi = window.MCRoles;

function currentLang() {
  return localStorage.getItem("mediconnect_lang") || "es";
}

const AGENDA_I18N = {
  es: {
    available: "Disponible",
    blocked: "Bloqueado",
    vacations: "Vacaciones",
    title: "Mi agenda flexible",
    subtitle: "Haz clic sobre una franja vacía para crear un slot: Disponible, Bloqueado o Vacaciones.",
    configTitle: "Configuración de agenda",
    duration: "Duración por consulta",
    weekdays: "Días laborales",
    startTime: "Horario inicio",
    endTime: "Horario fin",
    breakTime: "Descanso entre consultas",
    saveConfig: "Guardar configuración",
    promptSlotType: "Tipo de slot: disponible | bloqueado | vacaciones",
    slotSaved: "Slot guardado en agenda",
    confirmDeleteSlot: "¿Eliminar este slot de agenda?",
    promptAction: "Cita de {{patient}}\n1 Confirmar\n2 Reprogramar\n3 Cancelar\n4 Ver historia",
    confirmed: "Cita confirmada",
    promptNewDate: "Nueva fecha/hora inicio (YYYY-MM-DDTHH:mm)",
    rescheduled: "Cita reprogramada",
    canceled: "Cita cancelada",
    configSaved: "Configuración guardada y slots regenerados"
  },
  en: {
    available: "Available",
    blocked: "Blocked",
    vacations: "Vacations",
    title: "My flexible agenda",
    subtitle: "Click an empty time slot to create: Available, Blocked or Vacations.",
    configTitle: "Agenda settings",
    duration: "Consultation duration",
    weekdays: "Working days",
    startTime: "Start time",
    endTime: "End time",
    breakTime: "Break between consultations",
    saveConfig: "Save settings",
    promptSlotType: "Slot type: available | blocked | vacations",
    slotSaved: "Slot saved in agenda",
    confirmDeleteSlot: "Delete this agenda slot?",
    promptAction: "Appointment for {{patient}}\n1 Confirm\n2 Reschedule\n3 Cancel\n4 View record",
    confirmed: "Appointment confirmed",
    promptNewDate: "New start date/time (YYYY-MM-DDTHH:mm)",
    rescheduled: "Appointment rescheduled",
    canceled: "Appointment canceled",
    configSaved: "Settings saved and slots regenerated"
  },
  pt: {
    available: "Disponível",
    blocked: "Bloqueado",
    vacations: "Férias",
    title: "Minha agenda flexível",
    subtitle: "Clique em um intervalo vazio para criar um slot: Disponível, Bloqueado ou Férias.",
    configTitle: "Configuração da agenda",
    duration: "Duração por consulta",
    weekdays: "Dias úteis",
    startTime: "Horário de início",
    endTime: "Horário de término",
    breakTime: "Intervalo entre consultas",
    saveConfig: "Salvar configuração",
    promptSlotType: "Tipo de slot: disponível | bloqueado | férias",
    slotSaved: "Slot salvo na agenda",
    confirmDeleteSlot: "Remover este slot da agenda?",
    promptAction: "Consulta de {{patient}}\n1 Confirmar\n2 Reagendar\n3 Cancelar\n4 Ver histórico",
    confirmed: "Consulta confirmada",
    promptNewDate: "Nova data/hora de início (YYYY-MM-DDTHH:mm)",
    rescheduled: "Consulta reagendada",
    canceled: "Consulta cancelada",
    configSaved: "Configuração salva e slots regenerados"
  },
  de: {
    available: "Verfügbar",
    blocked: "Blockiert",
    vacations: "Urlaub",
    title: "Meine flexible Agenda",
    subtitle: "Klicken Sie auf einen freien Zeitraum, um einen Slot zu erstellen: Verfügbar, Blockiert oder Urlaub.",
    configTitle: "Agenda-Einstellungen",
    duration: "Dauer pro Konsultation",
    weekdays: "Arbeitstage",
    startTime: "Startzeit",
    endTime: "Endzeit",
    breakTime: "Pause zwischen Konsultationen",
    saveConfig: "Einstellungen speichern",
    promptSlotType: "Slot-Typ: verfügbar | blockiert | urlaub",
    slotSaved: "Slot in der Agenda gespeichert",
    confirmDeleteSlot: "Diesen Agenda-Slot löschen?",
    promptAction: "Termin für {{patient}}\n1 Bestätigen\n2 Neu planen\n3 Stornieren\n4 Akte ansehen",
    confirmed: "Termin bestätigt",
    promptNewDate: "Neue Startzeit (YYYY-MM-DDTHH:mm)",
    rescheduled: "Termin neu geplant",
    canceled: "Termin storniert",
    configSaved: "Einstellungen gespeichert und Slots neu erstellt"
  },
  it: {
    available: "Disponibile",
    blocked: "Bloccato",
    vacations: "Ferie",
    title: "La mia agenda flessibile",
    subtitle: "Clicca su una fascia vuota per creare uno slot: Disponibile, Bloccato o Ferie.",
    configTitle: "Configurazione agenda",
    duration: "Durata per consulto",
    weekdays: "Giorni lavorativi",
    startTime: "Ora di inizio",
    endTime: "Ora di fine",
    breakTime: "Pausa tra consulti",
    saveConfig: "Salva configurazione",
    promptSlotType: "Tipo slot: disponibile | bloccato | ferie",
    slotSaved: "Slot salvato in agenda",
    confirmDeleteSlot: "Eliminare questo slot dall'agenda?",
    promptAction: "Appuntamento di {{patient}}\n1 Conferma\n2 Riprogramma\n3 Annulla\n4 Vedi cartella",
    confirmed: "Appuntamento confermato",
    promptNewDate: "Nuova data/ora inizio (YYYY-MM-DDTHH:mm)",
    rescheduled: "Appuntamento riprogrammato",
    canceled: "Appuntamento annullato",
    configSaved: "Configurazione salvata e slot rigenerati"
  },
  pl: {
    available: "Dostępny",
    blocked: "Zablokowany",
    vacations: "Urlop",
    title: "Mój elastyczny harmonogram",
    subtitle: "Kliknij pusty przedział, aby utworzyć slot: Dostępny, Zablokowany lub Urlop.",
    configTitle: "Ustawienia harmonogramu",
    duration: "Czas konsultacji",
    weekdays: "Dni robocze",
    startTime: "Godzina rozpoczęcia",
    endTime: "Godzina zakończenia",
    breakTime: "Przerwa między konsultacjami",
    saveConfig: "Zapisz ustawienia",
    promptSlotType: "Typ slotu: dostępny | zablokowany | urlop",
    slotSaved: "Slot zapisany w harmonogramie",
    confirmDeleteSlot: "Usunąć ten slot z harmonogramu?",
    promptAction: "Wizyta pacjenta {{patient}}\n1 Potwierdź\n2 Przełóż\n3 Anuluj\n4 Zobacz historię",
    confirmed: "Wizyta potwierdzona",
    promptNewDate: "Nowa data/godzina rozpoczęcia (YYYY-MM-DDTHH:mm)",
    rescheduled: "Wizyta przełożona",
    canceled: "Wizyta anulowana",
    configSaved: "Ustawienia zapisane i sloty odtworzone"
  },
  tr: {
    available: "Uygun",
    blocked: "Bloklu",
    vacations: "İzin",
    title: "Esnek ajandam",
    subtitle: "Boş bir zaman aralığına tıklayarak slot oluşturun: Uygun, Bloklu veya İzin.",
    configTitle: "Ajanda ayarları",
    duration: "Görüşme süresi",
    weekdays: "Çalışma günleri",
    startTime: "Başlangıç saati",
    endTime: "Bitiş saati",
    breakTime: "Görüşmeler arası mola",
    saveConfig: "Ayarları kaydet",
    promptSlotType: "Slot türü: uygun | bloklu | izin",
    slotSaved: "Slot ajandaya kaydedildi",
    confirmDeleteSlot: "Bu ajanda slotu silinsin mi?",
    promptAction: "{{patient}} için randevu\n1 Onayla\n2 Yeniden planla\n3 İptal et\n4 Geçmişi gör",
    confirmed: "Randevu onaylandı",
    promptNewDate: "Yeni başlangıç tarihi/saati (YYYY-MM-DDTHH:mm)",
    rescheduled: "Randevu yeniden planlandı",
    canceled: "Randevu iptal edildi",
    configSaved: "Ayarlar kaydedildi ve slotlar yeniden oluşturuldu"
  }
};

function ta(key, vars = {}) {
  const lang = currentLang();
  const base = AGENDA_I18N[lang]?.[key] || AGENDA_I18N.es[key] || key;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), base);
}

function agendaKey(medicoId) {
  return `mc_agenda_${medicoId}`;
}

function getAgenda(medicoId) {
  return rolesApi.loadJSON(agendaKey(medicoId), {
    doctorId: medicoId,
    duracion: 30,
    diasLaborales: [1, 2, 3, 4, 5],
    horaInicio: "08:00",
    horaFin: "17:00",
    descanso: 5,
    slots: []
  });
}

function saveAgenda(medicoId, data) {
  rolesApi.saveJSON(agendaKey(medicoId), data);
}

function getCitas() {
  return rolesApi.loadJSON(rolesApi.STORAGE_KEYS.citas, []);
}

function saveCitas(list) {
  rolesApi.saveJSON(rolesApi.STORAGE_KEYS.citas, list);
}

function eventColor(tipo) {
  if (tipo === "disponible") return "#16a34a";
  if (tipo === "bloqueado") return "#dc2626";
  if (tipo === "vacaciones") return "#f59e0b";
  if (tipo === "cita") return "#1a73e8";
  return "#6b7280";
}

function buildAgendaEvents(medicoId) {
  const agenda = getAgenda(medicoId);
  const citas = getCitas().filter((c) => c.medicoId === Number(medicoId) && c.estado !== "cancelada");

  const slotEvents = (agenda.slots || []).map((s) => ({
    id: s.id,
    title: s.tipo === "disponible" ? ta("available") : s.tipo === "bloqueado" ? ta("blocked") : ta("vacations"),
    start: s.start,
    end: s.end,
    backgroundColor: eventColor(s.tipo),
    borderColor: eventColor(s.tipo),
    extendedProps: { tipo: s.tipo }
  }));

  const citaEvents = citas.map((c) => ({
    id: c.id,
    title: `Cita · ${c.pacienteNombre}`,
    start: c.fechaInicio,
    end: c.fechaFin,
    backgroundColor: eventColor("cita"),
    borderColor: eventColor("cita"),
    extendedProps: { tipo: "cita", citaId: c.id, pacienteId: c.pacienteId }
  }));

  return [...slotEvents, ...citaEvents];
}

function createSlotFromSelection(selectionInfo, tipo) {
  const slot = {
    id: `slot_${Date.now()}`,
    tipo,
    start: selectionInfo.start.toISOString(),
    end: selectionInfo.end.toISOString()
  };

  if (tipo === "vacaciones") {
    const day = new Date(selectionInfo.start);
    day.setHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setDate(day.getDate() + 1);
    slot.start = day.toISOString();
    slot.end = end.toISOString();
  }

  return slot;
}

function regenerateAvailableSlots(medicoId, cfg) {
  const agenda = getAgenda(medicoId);
  const keep = (agenda.slots || []).filter((s) => s.tipo !== "disponible");

  const [iniH, iniM] = cfg.horaInicio.split(":").map(Number);
  const [finH, finM] = cfg.horaFin.split(":").map(Number);

  const newSlots = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < 21; d += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    if (!cfg.diasLaborales.includes(date.getDay())) continue;

    let cur = new Date(date);
    cur.setHours(iniH, iniM, 0, 0);

    const limit = new Date(date);
    limit.setHours(finH, finM, 0, 0);

    while (cur < limit) {
      const next = new Date(cur.getTime() + cfg.duracion * 60000);
      if (next > limit) break;

      newSlots.push({
        id: `slot_auto_${date.toISOString().slice(0, 10)}_${cur.getHours()}${cur.getMinutes()}`,
        tipo: "disponible",
        start: cur.toISOString(),
        end: next.toISOString()
      });

      cur = new Date(next.getTime() + cfg.descanso * 60000);
    }
  }

  agenda.duracion = cfg.duracion;
  agenda.diasLaborales = cfg.diasLaborales;
  agenda.horaInicio = cfg.horaInicio;
  agenda.horaFin = cfg.horaFin;
  agenda.descanso = cfg.descanso;
  agenda.slots = [...keep, ...newSlots];
  saveAgenda(medicoId, agenda);
}

function renderMiAgenda(container, { medicoId, toast, onHistoria }) {
  const agenda = getAgenda(medicoId);

  container.innerHTML = `
    <section class="grid" style="grid-template-columns: 1fr 320px; gap: 1rem; align-items:start;">
      <article class="card">
        <h2 class="section-title">${ta("title")}</h2>
        <p>${ta("subtitle")}</p>
        <div id="mi-agenda-calendar" style="min-height:520px;"></div>
      </article>

      <aside class="card">
        <h3>${ta("configTitle")}</h3>
        <label>${ta("duration")}</label>
        <select id="cfg-duracion">
          ${[20, 30, 45, 60].map((v) => `<option value="${v}" ${agenda.duracion === v ? "selected" : ""}>${v} min</option>`).join("")}
        </select>

        <label style="margin-top:0.6rem; display:block;">${ta("weekdays")}</label>
        <div id="cfg-dias" class="grid" style="grid-template-columns: repeat(2,1fr); gap:0.3rem;">
          ${[[1, "Lun"], [2, "Mar"], [3, "Mié"], [4, "Jue"], [5, "Vie"], [6, "Sáb"], [0, "Dom"]]
            .map(([v, l]) => `<label><input type="checkbox" value="${v}" ${agenda.diasLaborales.includes(v) ? "checked" : ""}/> ${l}</label>`)
            .join("")}
        </div>

        <label style="margin-top:0.6rem;">${ta("startTime")}</label>
        <input id="cfg-inicio" type="time" value="${agenda.horaInicio}" />
        <label style="margin-top:0.6rem;">${ta("endTime")}</label>
        <input id="cfg-fin" type="time" value="${agenda.horaFin}" />

        <label style="margin-top:0.6rem;">${ta("breakTime")}</label>
        <select id="cfg-descanso">
          ${[0, 5, 10, 15].map((v) => `<option value="${v}" ${agenda.descanso === v ? "selected" : ""}>${v} min</option>`).join("")}
        </select>

        <button class="btn-primary" id="guardar-config" style="margin-top:0.8rem;">${ta("saveConfig")}</button>
      </aside>
    </section>
  `;

  const calendar = new FullCalendar.Calendar(container.querySelector("#mi-agenda-calendar"), {
    initialView: "timeGridWeek",
    locale: currentLang(),
    allDaySlot: false,
    selectable: true,
    slotMinTime: "06:00:00",
    slotMaxTime: "21:00:00",
    events: buildAgendaEvents(medicoId),
    select: (info) => {
      const tipo = prompt(ta("promptSlotType"), "disponible");
      if (!tipo || !["disponible", "bloqueado", "vacaciones"].includes(tipo)) return;

      const currentAgenda = getAgenda(medicoId);
      currentAgenda.slots.push(createSlotFromSelection(info, tipo));
      saveAgenda(medicoId, currentAgenda);
      toast(ta("slotSaved"));
      calendar.refetchEvents();
    },
    eventClick: (click) => {
      const type = click.event.extendedProps.tipo;
      if (type !== "cita") {
        const shouldDelete = confirm(ta("confirmDeleteSlot"));
        if (!shouldDelete) return;

        const currentAgenda = getAgenda(medicoId);
        currentAgenda.slots = (currentAgenda.slots || []).filter((s) => s.id !== click.event.id);
        saveAgenda(medicoId, currentAgenda);
        calendar.refetchEvents();
        return;
      }

      const citas = getCitas();
      const cita = citas.find((c) => c.id === click.event.extendedProps.citaId);
      if (!cita) return;

      const action = prompt(ta("promptAction", { patient: cita.pacienteNombre }), "1");

      if (action === "1") {
        cita.estado = "confirmada";
        saveCitas(citas);
        toast(ta("confirmed"));
      }

      if (action === "2") {
        const newDate = prompt(ta("promptNewDate"), cita.fechaInicio.slice(0, 16));
        if (newDate) {
          const start = new Date(newDate);
          const end = new Date(start.getTime() + 30 * 60000);
          cita.fechaInicio = start.toISOString();
          cita.fechaFin = end.toISOString();
          cita.estado = "reprogramada";
          saveCitas(citas);
          toast(ta("rescheduled"));
        }
      }

      if (action === "3") {
        cita.estado = "cancelada";
        saveCitas(citas);
        toast(ta("canceled"));
      }

      if (action === "4") {
        onHistoria(cita.pacienteId);
      }

      calendar.refetchEvents();
    },
    eventSources: [
      {
        events(fetchInfo, success) {
          success(buildAgendaEvents(medicoId));
        }
      }
    ]
  });

  calendar.render();

  container.querySelector("#guardar-config").addEventListener("click", () => {
    const cfg = {
      duracion: Number(container.querySelector("#cfg-duracion").value),
      diasLaborales: Array.from(container.querySelectorAll("#cfg-dias input:checked")).map((x) => Number(x.value)),
      horaInicio: container.querySelector("#cfg-inicio").value,
      horaFin: container.querySelector("#cfg-fin").value,
      descanso: Number(container.querySelector("#cfg-descanso").value)
    };

    regenerateAvailableSlots(medicoId, cfg);
    toast(ta("configSaved"));
    calendar.refetchEvents();
  });
}

function renderAgendaReadOnly(containerEl, medicoId, onSelectDisponible) {
  const events = buildAgendaEvents(medicoId);

  const calendar = new FullCalendar.Calendar(containerEl, {
    initialView: "timeGridWeek",
    locale: currentLang(),
    allDaySlot: false,
    events,
    eventClick: (info) => {
      if (info.event.extendedProps.tipo === "disponible") {
        onSelectDisponible(info.event.startStr, info.event.endStr);
      }
    }
  });

  calendar.render();
  return calendar;
}

const api = {
  getAgenda,
  saveAgenda,
  getCitas,
  saveCitas,
  renderMiAgenda,
  renderAgendaReadOnly,
  buildAgendaEvents
};

window.MCAgenda = api;

export default api;
