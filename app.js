const cards = window.POKER_BLITZ_CARDS || [];
const cardById = new Map(cards.map((card) => [card.id, card]));
const hyperIds = cards.filter((card) => card.type === "Hyper").map((card) => card.id);
const counterIds = new Set(cards.filter((card) => card.type === "Counter").map((card) => card.id));
const superIds = new Set(cards.filter((card) => card.type === "Super").map((card) => card.id));
const suits = ["♠", "♥", "♦", "♣"];
const redSuits = new Set(["♥", "♦"]);
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const avatars = ["👑", "🗡", "☽", "✦", "♜", "⚔"];

const state = {
  mode: "auto",
  activePlayer: 0,
  phase: "Main Phase",
  handSection: "power",
  goal: 30,
  pokerDeck: [],
  pokerDiscard: [],
  lastSuperCardId: null,
  log: [],
  players: [],
};

const els = {
  seatsLayer: document.getElementById("seatsLayer"),
  handCards: document.getElementById("handCards"),
  turnPill: document.getElementById("turnPill"),
  phasePill: document.getElementById("phasePill"),
  goalPill: document.getElementById("goalPill"),
  toolsButton: document.getElementById("toolsButton"),
  toolsPanel: document.getElementById("toolsPanel"),
  overlay: document.getElementById("overlay"),
  cardDialog: document.getElementById("cardDialog"),
  effectDialog: document.getElementById("effectDialog"),
  infoDialog: document.getElementById("infoDialog"),
  transitionCurtain: document.getElementById("transitionCurtain"),
  logList: document.getElementById("logList"),
};

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildPokerDeck() {
  const deck = [];
  suits.forEach((suit) => {
    values.forEach((label, index) => {
      deck.push({
        id: `poker_${suit}_${label}_${crypto.randomUUID()}`,
        value: index + 1,
        label,
        suit,
        joker: false,
        tags: [],
      });
    });
  });
  deck.push({ id: `joker_a_${crypto.randomUUID()}`, value: 1, label: "Joker", suit: "★", joker: true, tags: [] });
  deck.push({ id: `joker_b_${crypto.randomUUID()}`, value: 1, label: "Joker", suit: "★", joker: true, tags: [] });
  return shuffle(deck);
}

function newPlayer(index, name) {
  const powerDeck = shuffle(cards.map((card) => card.id));
  const activeHyper = powerDeck.filter((id) => cardById.get(id)?.type === "Hyper").slice(0, index === 0 ? 2 : 3);
  const rest = powerDeck.filter((id) => !activeHyper.includes(id));
  return {
    id: `player_${index}`,
    name,
    avatar: avatars[index],
    powerDeck: rest.slice(6),
    powerHand: rest.slice(0, 6),
    activeHyper,
    pokerHand: [],
    chips: [12, 9, 14, 10, 13, 8][index],
    pokerLimit: 7,
    powerLimit: 4,
    powerDraw: 3,
    flags: {},
  };
}

function initGame() {
  state.pokerDeck = buildPokerDeck();
  state.players = ["Tú", "Sombra", "Drako77", "LunaSolar", "Nébula", "Kaiser"].map((name, i) => newPlayer(i, name));
  state.players.forEach((_, index) => drawPoker(index, index === 0 ? 7 : 5));
  pushLog("Mesa lista: 6 asientos, HyperCards visibles y efectos por ventana.");
  render();
}

function activePlayer() {
  return state.players[state.activePlayer];
}

function pushLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 8);
}

function normalizeType(type) {
  if (type === "Hyper") return "HyperCard";
  if (type === "Counter") return "CounterCard";
  return "SuperCard";
}

function drawPoker(playerIndex, amount) {
  const player = state.players[playerIndex];
  let count = 0;
  while (count < amount) {
    if (!state.pokerDeck.length && state.pokerDiscard.length) {
      state.pokerDeck = shuffle(state.pokerDiscard);
      state.pokerDiscard = [];
    }
    const card = state.pokerDeck.shift();
    if (!card) break;
    player.pokerHand.push(card);
    count += 1;
  }
  return count;
}

function drawPower(playerIndex, amount) {
  const player = state.players[playerIndex];
  let count = 0;
  while (count < amount && player.powerHand.length < player.powerLimit) {
    if (!player.powerDeck.length) break;
    player.powerHand.push(player.powerDeck.shift());
    count += 1;
  }
  return count;
}

function removePoker(playerIndex, ids) {
  const player = state.players[playerIndex];
  const set = new Set(ids);
  const removed = player.pokerHand.filter((card) => set.has(card.id));
  player.pokerHand = player.pokerHand.filter((card) => !set.has(card.id));
  state.pokerDiscard.push(...removed);
  return removed;
}

function discardRandomPoker(playerIndex, amount) {
  const player = state.players[playerIndex];
  const cardsToRemove = shuffle(player.pokerHand).slice(0, amount).map((card) => card.id);
  return removePoker(playerIndex, cardsToRemove);
}

function removePowerFromHand(playerIndex, ids) {
  const player = state.players[playerIndex];
  const removeSet = new Set(ids);
  const removed = [];
  player.powerHand = player.powerHand.filter((id) => {
    if (removeSet.has(id)) {
      removed.push(id);
      return false;
    }
    return true;
  });
  player.powerDeck.push(...shuffle(removed));
  return removed;
}

function takePowerCard(playerIndex, id) {
  const player = state.players[playerIndex];
  const pos = player.powerHand.indexOf(id);
  if (pos >= 0) player.powerHand.splice(pos, 1);
}

function chipCount(chips) {
  return Math.min(10, Math.ceil(Math.max(0, chips) / 3));
}

function render() {
  const player = activePlayer();
  els.turnPill.textContent = `Turno: ${player.name}`;
  els.phasePill.textContent = state.phase;
  els.goalPill.textContent = `Meta ${state.goal}`;
  document.getElementById("manualModeBtn").classList.toggle("active", state.mode === "manual");
  document.getElementById("autoModeBtn").classList.toggle("active", state.mode === "auto");
  renderSeats();
  renderHand();
  renderLog();
}

function renderSeats() {
  els.seatsLayer.innerHTML = state.players.map((player, index) => {
    const minis = player.activeHyper.slice(0, 5).map((id) => {
      const card = cardById.get(id);
      return `<button class="mini-power" data-zoom-power="${id}" data-owner="${index}" title="${card?.name || ""}">
        <img src="${card?.asset || ""}" alt="${card?.name || ""}">
      </button>`;
    }).join("");
    const chips = Array.from({ length: chipCount(player.chips) }, (_, i) => `<span class="chip" style="transform:translateY(${-i}px)"></span>`).join("");
    return `<article class="seat ${index === state.activePlayer ? "active" : ""}" data-seat="${index}">
      <div class="seat-card">
        <div class="avatar">${player.avatar}</div>
        <div class="seat-title">${player.name}</div>
        <div class="seat-meta"><strong>${player.chips}</strong> fichas · ${player.pokerHand.length} Poker · ${player.powerHand.length} Power</div>
        <div class="mini-hyper-row">${minis || "<span class='small-note'>Sin Hyper activa</span>"}</div>
        <div class="chip-stack">${chips}</div>
      </div>
    </article>`;
  }).join("");
}

function renderHand() {
  document.querySelectorAll(".hand-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.section === state.handSection);
  });
  const player = activePlayer();
  let html = "";
  if (state.handSection === "hyper") {
    html = player.activeHyper.map((id) => renderPowerCard(id, { owner: state.activePlayer, active: true })).join("");
  } else if (state.handSection === "poker") {
    html = player.pokerHand.map((card) => renderPokerCard(card)).join("");
  } else {
    html = player.powerHand.map((id) => renderPowerCard(id, { owner: state.activePlayer, inHand: true })).join("");
  }
  els.handCards.innerHTML = html || `<div class="effect-section"><h3>Sin cartas en esta zona</h3><p class="small-note">Usa herramientas, fases o efectos para robar cartas.</p></div>`;
}

function renderLog() {
  els.logList.innerHTML = state.log.map((entry) => `<div>• ${entry}</div>`).join("");
}

function renderPowerCard(id, options = {}) {
  const card = cardById.get(id);
  if (!card) return "";
  return `<button class="power-card" data-zoom-power="${id}" data-owner="${options.owner ?? state.activePlayer}" ${options.inHand ? "data-in-hand='true'" : ""}>
    <img src="${card.asset}" alt="${card.name}">
    <span class="type-ribbon">${normalizeType(card.type)}</span>
  </button>`;
}

function renderPokerCard(card, selectable = false, selected = false, extra = "") {
  const red = redSuits.has(card.suit) || card.joker;
  return `<button class="poker-card ${red ? "red" : ""} ${selected ? "selected" : ""}" ${selectable ? `data-poker-id="${card.id}" ${extra}` : ""}>
    <span class="poker-corner">${card.label}<br>${card.suit}</span>
    <span class="poker-suit">${card.suit}</span>
    <span class="poker-corner poker-bottom">${card.label}<br>${card.suit}</span>
  </button>`;
}

function renderBack(kind, selected = false, extra = "") {
  return `<button class="card-back ${kind === "power" ? "power-back" : "poker-back"} ${selected ? "selected" : ""}" ${extra}></button>`;
}

function openOverlay() {
  els.overlay.classList.remove("hidden");
}

function closeOverlay() {
  els.overlay.classList.add("hidden");
}

function closeDialogs() {
  [els.cardDialog, els.effectDialog, els.infoDialog].forEach((dialog) => {
    if (dialog.open) dialog.close();
    dialog.innerHTML = "";
  });
  closeOverlay();
}

function openCardZoom(id, owner = state.activePlayer, inHand = false) {
  const card = cardById.get(id);
  if (!card) return;
  openOverlay();
  const canActivate = state.players[owner].powerHand.includes(id) && owner === state.activePlayer && state.phase === "Main Phase";
  els.cardDialog.innerHTML = `
    <div class="modal-header">
      <div>
        <h2 class="modal-title">${card.name}</h2>
        <div class="modal-subtitle">${normalizeType(card.type)} · Carta ${String(card.item).padStart(3, "0")}</div>
      </div>
      <button class="close-button" data-close>×</button>
    </div>
    <div class="modal-body card-zoom-layout">
      <img class="zoom-card" src="${card.asset}" alt="${card.name}">
      <div>
        <div class="effect-text">${card.effect}</div>
        ${card.appBehavior ? `<p class="small-note">${card.appBehavior}</p>` : ""}
        <div class="modal-actions">
          ${canActivate ? `<button class="modal-button primary" data-activate-card="${id}">Activar carta</button>` : ""}
          ${inHand ? `<button class="modal-button blue" data-open-effect="${id}">Ver ventana de efecto</button>` : ""}
          <button class="modal-button" data-close>Cerrar</button>
        </div>
      </div>
    </div>`;
  els.cardDialog.showModal();
}

function specFor(cardId) {
  const costMap = {
    catalog_v3_001: { power: 2 },
    catalog_v3_002: { poker: 3, power: 2 },
    catalog_v3_007: { poker: 2, power: 1 },
    catalog_v3_025: { poker: 2 },
    catalog_v3_027: { power: 2, chips: 1 },
    catalog_v3_028: { poker: 2 },
    catalog_v3_029: { power: 1 },
    catalog_v3_030: { power: 1 },
    catalog_v3_031: { chips: 1 },
    catalog_v3_032: { power: 1 },
    catalog_v3_035: { poker: 3 },
    catalog_v3_045: { poker: 1, power: 1 },
    catalog_v3_049: { poker: 3, power: 2 },
    catalog_v3_050: { poker: 1, power: 1 },
  };
  return {
    cost: costMap[cardId] || {},
    target: new Set(["catalog_v3_006", "catalog_v3_008", "catalog_v3_009", "catalog_v3_010", "catalog_v3_012", "catalog_v3_013", "catalog_v3_026", "catalog_v3_038", "catalog_v3_047", "catalog_v3_048", "catalog_v3_051", "catalog_v3_052", "catalog_v3_055", "catalog_v3_056"]).has(cardId),
    dice: new Set(["catalog_v3_008", "catalog_v3_018", "catalog_v3_019", "catalog_v3_036"]).has(cardId) ? 2 : (new Set(["catalog_v3_014", "catalog_v3_015", "catalog_v3_020"]).has(cardId) ? 1 : 0),
    declarationSuit: new Set(["catalog_v3_022", "catalog_v3_030"]).has(cardId),
    declarationValue: new Set(["catalog_v3_023", "catalog_v3_029"]).has(cardId),
    deckReview: new Set(["catalog_v3_007", "catalog_v3_016", "catalog_v3_040", "catalog_v3_054"]).has(cardId),
    ownPoker: new Set(["catalog_v3_005", "catalog_v3_012", "catalog_v3_013", "catalog_v3_023", "catalog_v3_026", "catalog_v3_029", "catalog_v3_030", "catalog_v3_041", "catalog_v3_042", "catalog_v3_043", "catalog_v3_044", "catalog_v3_047", "catalog_v3_055"]).has(cardId),
    targetPoker: new Set(["catalog_v3_006", "catalog_v3_012", "catalog_v3_013", "catalog_v3_047", "catalog_v3_056"]).has(cardId),
    targetHyper: new Set(["catalog_v3_008", "catalog_v3_051", "catalog_v3_052"]).has(cardId),
    randomTargetCards: new Set(["catalog_v3_009", "catalog_v3_010", "catalog_v3_038"]).has(cardId),
    actionChoices: {
      catalog_v3_009: [["chip", "Robar ficha"], ["poker", "Robar Poker al azar"], ["power", "Activar Power al azar"]],
      catalog_v3_010: [["exchange", "Intercambiar al azar"], ["steal", "Robar 1 al azar"]],
      catalog_v3_020: [["clockwise", "Rotar derecha"], ["counter", "Rotar izquierda"]],
      catalog_v3_026: [["exchange", "Intercambiar"], ["share", "Robar 2 y compartir"]],
    }[cardId] || [],
  };
}

function openCounterWindow(cardId) {
  const rivals = state.players
    .map((player, index) => ({ player, index }))
    .filter(({ index }) => index !== state.activePlayer)
    .flatMap(({ player, index }) => player.powerHand
      .filter((id) => counterIds.has(id))
      .map((id) => ({ id, player, index })));

  if (!rivals.length) {
    openEffectWindow(cardId);
    return;
  }

  openOverlay();
  els.effectDialog.innerHTML = `
    <div class="modal-header">
      <div>
        <h2 class="modal-title">CounterCards disponibles</h2>
        <div class="modal-subtitle">Antes de resolver ${cardById.get(cardId)?.name}, los rivales pueden responder.</div>
      </div>
      <button class="close-button" data-close>×</button>
    </div>
    <div class="modal-body effect-grid">
      <section class="effect-section">
        <h3>Respuestas en mesa</h3>
        <div class="card-choice-row">
          ${rivals.map(({ id, player, index }) => `<div>
            ${renderPowerCard(id, { owner: index })}
            <p class="small-note">${player.name}</p>
          </div>`).join("")}
        </div>
      </section>
      <div class="modal-actions">
        <button class="modal-button danger" data-counter-skip="${cardId}">No activar Counter</button>
        <button class="modal-button primary" data-counter-auto="${cardId}">Activar primera Counter</button>
      </div>
    </div>`;
  els.effectDialog.showModal();
}

function openEffectWindow(cardId) {
  const card = cardById.get(cardId);
  const spec = specFor(cardId);
  const selected = {
    target: state.players.findIndex((_, index) => index !== state.activePlayer),
    dice: [],
    suit: null,
    value: null,
    action: spec.actionChoices[0]?.[0] || null,
    costPoker: new Set(),
    costPower: new Set(),
    ownPoker: new Set(),
    targetPoker: new Set(),
    targetHyper: new Set(),
    deckPower: new Set(),
    deckPoker: new Set(),
  };

  function renderEffect() {
    const active = activePlayer();
    const target = selected.target >= 0 ? state.players[selected.target] : null;
    const cost = spec.cost;
    const needsCost = cost.poker || cost.power || cost.chips;
    const confirmDisabled = !canConfirm(spec, selected, active);
    els.effectDialog.innerHTML = `
      <div class="modal-header">
        <div>
          <h2 class="modal-title">${card.name}</h2>
          <div class="modal-subtitle">${state.mode === "manual" ? "Versión manual: guía sin alterar el estado" : "Versión semi automática: resuelve el efecto"} · ${normalizeType(card.type)}</div>
        </div>
        <button class="close-button" data-close>×</button>
      </div>
      <div class="modal-body effect-grid">
        <section class="effect-section">
          <h3>Texto de efecto</h3>
          <p class="small-note">${card.effect}</p>
        </section>
        ${needsCost ? costSection(active, cost, selected, cardId) : ""}
        ${spec.target ? targetSection(selected) : ""}
        ${spec.actionChoices.length ? choiceSection("Elige efecto", spec.actionChoices, selected.action, "action") : ""}
        ${spec.dice ? diceSection(spec.dice, selected.dice) : ""}
        ${spec.declarationSuit ? suitSection(selected.suit) : ""}
        ${spec.declarationValue ? valueSection(selected.value) : ""}
        ${spec.ownPoker ? ownPokerSection(active, selected) : ""}
        ${spec.targetPoker || spec.randomTargetCards ? targetPokerSection(target, selected, spec) : ""}
        ${spec.targetHyper ? targetHyperSection(target, selected) : ""}
        ${spec.deckReview ? deckReviewSection(cardId, active, selected) : ""}
        <div class="modal-actions">
          <button class="modal-button" data-close>Cancelar</button>
          <button class="modal-button primary" data-confirm-effect="${cardId}" ${confirmDisabled ? "disabled" : ""}>Confirmar efecto</button>
        </div>
      </div>`;
    els.effectDialog.showModal();
    bindEffectControls(selected, renderEffect);
  }

  openOverlay();
  renderEffect();
}

function canConfirm(spec, selected, player) {
  const cost = spec.cost;
  if ((cost.chips || 0) > player.chips) return false;
  if ((cost.poker || 0) > 0 && selected.costPoker.size < cost.poker) return false;
  if ((cost.power || 0) > 0 && selected.costPower.size < cost.power) return false;
  if (spec.target && selected.target < 0) return false;
  if (spec.dice && selected.dice.length < spec.dice) return false;
  if (spec.declarationSuit && !selected.suit) return false;
  if (spec.declarationValue && !selected.value) return false;
  return true;
}

function costSection(player, cost, selected, activeCardId) {
  return `<section class="effect-section">
    <h3>Coste</h3>
    ${cost.chips ? `<p>Fichas: ${cost.chips}</p>` : ""}
    ${cost.poker ? `<p class="small-note">Selecciona ${cost.poker} Poker Card(s) para descartar.</p><div class="card-choice-row">${player.pokerHand.map((card) => renderPokerCard(card, true, selected.costPoker.has(card.id), `data-select-cost-poker="${card.id}"`)).join("")}</div>` : ""}
    ${cost.power ? `<p class="small-note">Selecciona ${cost.power} Power Card(s) para descartar. La carta activada no cuenta como coste.</p><div class="card-choice-row">${player.powerHand.filter((id) => id !== activeCardId).map((id) => `<button class="power-card ${selected.costPower.has(id) ? "selected" : ""}" data-select-cost-power="${id}"><img src="${cardById.get(id)?.asset}" alt=""><span class="type-ribbon">${cardById.get(id)?.type}</span></button>`).join("")}</div>` : ""}
  </section>`;
}

function targetSection(selected) {
  return `<section class="effect-section">
    <h3>Jugador objetivo</h3>
    <div class="target-grid">
      ${state.players.map((player, index) => index === state.activePlayer ? "" : `<button class="player-choice ${selected.target === index ? "selected" : ""}" data-target="${index}">${player.avatar} ${player.name} · ${player.chips} fichas</button>`).join("")}
    </div>
  </section>`;
}

function choiceSection(title, choices, current, key) {
  return `<section class="effect-section">
    <h3>${title}</h3>
    <div class="choice-row">${choices.map(([value, label]) => `<button class="pill-choice ${current === value ? "selected" : ""}" data-choice-${key}="${value}">${label}</button>`).join("")}</div>
  </section>`;
}

function diceSection(count, dice) {
  const diceHtml = Array.from({ length: count }, (_, i) => `<div class="die">${dice[i] || "?"}</div>`).join("");
  return `<section class="effect-section">
    <h3>Dados</h3>
    <div class="dice-box">${diceHtml}<button class="modal-button blue" data-roll-dice="${count}">Lanzar</button></div>
  </section>`;
}

function suitSection(current) {
  return `<section class="effect-section">
    <h3>Declarar palo/color</h3>
    <div class="choice-row">${suits.map((suit) => `<button class="pill-choice ${current === suit ? "selected" : ""}" data-suit="${suit}">${suit}</button>`).join("")}</div>
  </section>`;
}

function valueSection(current) {
  return `<section class="effect-section">
    <h3>Declarar valor</h3>
    <div class="choice-row">${values.map((value, i) => `<button class="pill-choice ${current === i + 1 ? "selected" : ""}" data-value="${i + 1}">${value}</button>`).join("")}</div>
  </section>`;
}

function ownPokerSection(player, selected) {
  return `<section class="effect-section">
    <h3>Tus Poker Cards</h3>
    <div class="card-choice-row">${player.pokerHand.map((card) => renderPokerCard(card, true, selected.ownPoker.has(card.id), `data-select-own-poker="${card.id}"`)).join("")}</div>
  </section>`;
}

function targetPokerSection(target, selected, spec) {
  if (!target) return "";
  const random = spec.randomTargetCards;
  return `<section class="effect-section">
    <h3>${random ? "Cartas al azar del objetivo" : "Poker Cards del objetivo"}</h3>
    <p class="small-note">${random ? "Este efecto indica al azar: se muestran reversos rojos." : "El efecto permite ver/seleccionar estas cartas."}</p>
    <div class="card-choice-row">
      ${target.pokerHand.map((card) => random
        ? renderBack("poker", selected.targetPoker.has(card.id), `data-select-target-poker="${card.id}"`)
        : renderPokerCard(card, true, selected.targetPoker.has(card.id), `data-select-target-poker="${card.id}"`)).join("")}
    </div>
  </section>`;
}

function targetHyperSection(target, selected) {
  if (!target) return "";
  return `<section class="effect-section">
    <h3>HyperCards activas del objetivo</h3>
    <div class="card-choice-row">
      ${target.activeHyper.map((id) => `<button class="power-card ${selected.targetHyper.has(id) ? "selected" : ""}" data-select-target-hyper="${id}"><img src="${cardById.get(id)?.asset}" alt=""><span class="type-ribbon">Hyper</span></button>`).join("") || "<p class='small-note'>El objetivo no tiene HyperCards activas.</p>"}
    </div>
  </section>`;
}

function deckReviewSection(cardId, player, selected) {
  if (cardId === "catalog_v3_007") {
    const options = player.powerDeck.filter((id) => cardById.get(id)?.type === "Hyper").slice(0, 12);
    return `<section class="effect-section"><h3>Buscar HyperCard en tu Deck</h3><div class="card-choice-row">${options.map((id) => `<button class="power-card ${selected.deckPower.has(id) ? "selected" : ""}" data-select-deck-power="${id}"><img src="${cardById.get(id)?.asset}" alt=""><span class="type-ribbon">Hyper</span></button>`).join("")}</div></section>`;
  }
  if (cardId === "catalog_v3_016") {
    const top = state.pokerDeck.slice(0, 5);
    return `<section class="effect-section"><h3>Primeras 5 Poker Cards</h3><div class="card-choice-row">${top.map((card) => renderPokerCard(card, true, selected.deckPoker.has(card.id), `data-select-deck-poker="${card.id}"`)).join("")}</div></section>`;
  }
  if (cardId === "catalog_v3_040") {
    const aces = state.pokerDeck.filter((card) => card.value === 1 || card.joker).slice(0, 12);
    return `<section class="effect-section"><h3>Ases disponibles en el mazo</h3><div class="card-choice-row">${aces.map((card) => renderPokerCard(card, true, selected.deckPoker.has(card.id), `data-select-deck-poker="${card.id}"`)).join("") || "<p class='small-note'>No quedan Ases visibles.</p>"}</div></section>`;
  }
  return `<section class="effect-section"><h3>Deck</h3><p>Ciclo Rápido descartará esta carta y robará una nueva Power Card.</p></section>`;
}

function bindEffectControls(selected, rerender) {
  els.effectDialog.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => { selected.target = Number(button.dataset.target); rerender(); });
  });
  els.effectDialog.querySelectorAll("[data-choice-action]").forEach((button) => {
    button.addEventListener("click", () => { selected.action = button.dataset.choiceAction; rerender(); });
  });
  els.effectDialog.querySelectorAll("[data-suit]").forEach((button) => {
    button.addEventListener("click", () => { selected.suit = button.dataset.suit; rerender(); });
  });
  els.effectDialog.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => { selected.value = Number(button.dataset.value); rerender(); });
  });
  els.effectDialog.querySelectorAll("[data-roll-dice]").forEach((button) => {
    button.addEventListener("click", () => {
      const count = Number(button.dataset.rollDice);
      selected.dice = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 6));
      els.effectDialog.classList.add("spark");
      setTimeout(() => els.effectDialog.classList.remove("spark"), 700);
      rerender();
    });
  });
  bindSetToggle("data-select-cost-poker", selected.costPoker, rerender);
  bindSetToggle("data-select-cost-power", selected.costPower, rerender);
  bindSetToggle("data-select-own-poker", selected.ownPoker, rerender);
  bindSetToggle("data-select-target-poker", selected.targetPoker, rerender);
  bindSetToggle("data-select-target-hyper", selected.targetHyper, rerender);
  bindSetToggle("data-select-deck-power", selected.deckPower, rerender, true);
  bindSetToggle("data-select-deck-poker", selected.deckPoker, rerender, true);
}

function bindSetToggle(attribute, set, rerender, single = false) {
  els.effectDialog.querySelectorAll(`[${attribute}]`).forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute(attribute);
      if (single) set.clear();
      if (set.has(value)) set.delete(value);
      else set.add(value);
      rerender();
    });
  });
}

function confirmEffect(cardId, selected) {
  const card = cardById.get(cardId);
  closeDialogs();
  if (state.mode === "manual") {
    pushLog(`Manual: ${card.name}. Se mostraron opciones; resuelve fisicamente segun la ventana.`);
    render();
    return;
  }
  const player = activePlayer();
  const spec = specFor(cardId);
  removePoker(state.activePlayer, [...selected.costPoker]);
  removePowerFromHand(state.activePlayer, [...selected.costPower]);
  if (spec.cost.chips) player.chips = Math.max(0, player.chips - spec.cost.chips);
  takePowerCard(state.activePlayer, cardId);
  const result = resolveEffect(cardId, selected);
  if (card.type === "Hyper" && !["catalog_v3_035"].includes(cardId)) {
    player.activeHyper.push(cardId);
  } else {
    player.powerDeck.push(cardId);
  }
  if (superIds.has(cardId)) state.lastSuperCardId = cardId;
  pushLog(`${card.name}: ${result}`);
  render();
}

function resolveEffect(cardId, selected) {
  const player = activePlayer();
  const target = state.players[selected.target];
  const diceTotal = selected.dice.reduce((sum, value) => sum + value, 0);
  const chosenOwn = player.pokerHand.filter((card) => selected.ownPoker.has(card.id));
  const chosenTarget = target?.pokerHand.filter((card) => selected.targetPoker.has(card.id)) || [];
  const draw = (n) => drawPoker(state.activePlayer, n);
  const randomTargetPoker = (n) => target ? discardRandomPoker(selected.target, n).length : 0;

  switch (cardId) {
    case "catalog_v3_001": return "Hyper activa; herramientas habilitan intercambio de Poker una vez por turno.";
    case "catalog_v3_002": player.powerDraw += 1; player.powerLimit += 1; return "limitador y robo de Power aumentados en +1.";
    case "catalog_v3_003": player.flags.diceModifier = true; return "puedes sumar o restar 1 a la proxima tirada.";
    case "catalog_v3_004": return state.lastSuperCardId ? `copia ${cardById.get(state.lastSuperCardId)?.name}.` : "queda lista para copiar la ultima SuperCard valida.";
    case "catalog_v3_005": return chosenOwn.some((card) => ["ARTILUGIO AMARILLO", "ARTILUGIO AZUL", "ARTILUGIO VERDE"].every((tag) => card.tags.includes(tag))) ? (player.chips += 5, "+5 fichas por artilugio legendario.") : "requiere una Poker Card con los tres artilugios vinculados.";
    case "catalog_v3_006": return `${target?.name || "Objetivo"} descarta ${removePoker(selected.target, chosenTarget.slice(0, 1).map((c) => c.id)).length || randomTargetPoker(1)} Poker Card.`;
    case "catalog_v3_007": return takeHyperFromDeck(selected);
    case "catalog_v3_008": return diceTotal % 2 === 0 ? returnOwnHyper() : returnTargetHyper(selected, 2);
    case "catalog_v3_009": return maestroFichas(selected);
    case "catalog_v3_010": return operacionTactica(selected);
    case "catalog_v3_011": state.players.forEach((_, i) => { drawPower(i, 1); drawPoker(i, 1); }); return "todos roban 1 Power y 1 Poker.";
    case "catalog_v3_012": return `espionaje: ${target?.name} descarta ${removePoker(selected.target, chosenTarget.slice(0, 1).map((c) => c.id)).length}; tu descartas ${removePoker(state.activePlayer, chosenOwn.slice(0, 1).map((c) => c.id)).length}.`;
    case "catalog_v3_013": return exchangePoker(selected, 2);
    case "catalog_v3_014": return expertoDados(selected.dice[0]);
    case "catalog_v3_015": return `intercambia ${exchangeWithDeck(selected.dice[0])} Poker Card(s) con el mazo.`;
    case "catalog_v3_016": return takePokerFromDeck(selected, 5);
    case "catalog_v3_017": return state.lastSuperCardId ? `copia ${cardById.get(state.lastSuperCardId)?.name}.` : "no hay SuperCard previa para copiar.";
    case "catalog_v3_018": return diceTotal % 2 === 0 ? `robas ${draw(2)} Poker Cards.` : (state.players.forEach((_, i) => i !== state.activePlayer && drawPoker(i, 1)), "todos excepto tu roban 1 Poker Card.");
    case "catalog_v3_019": return diceTotal % 2 === 0 ? `descartas ${discardRandomPoker(state.activePlayer, 2).length} Poker Cards.` : (state.players.forEach((_, i) => i !== state.activePlayer && discardRandomPoker(i, 1)), "todos excepto tu descartan 1 Poker Card.");
    case "catalog_v3_020": return diceTotal % 2 === 0 ? (state.players.forEach((_, i) => drawPoker(i, 1)), "todos roban 1 Poker Card.") : rotatePoker(selected.action);
    case "catalog_v3_021": return rotatePoker("clockwise");
    case "catalog_v3_022": return favoriteSuit(selected.suit);
    case "catalog_v3_023": removePoker(state.activePlayer, chosenOwn.slice(0, 1).map((c) => c.id)); return `valor declarado ${labelForValue(selected.value)}; si nadie acierta, robas ${draw(2)}.`;
    case "catalog_v3_024": return `reaccion rapida: revelas ${drawAndReveal()}.`;
    case "catalog_v3_025": player.flags.cardShield = true; return "Escudo activo: al ser seleccionado, robaras 1 Poker Card.";
    case "catalog_v3_026": return selected.action === "share" ? sharePoker(selected) : exchangePoker(selected, 1);
    case "catalog_v3_027": player.powerLimit += 1; return "limitador de Power Cards +1.";
    case "catalog_v3_028": player.pokerLimit += 1; return "limitador de Poker Cards +1.";
    case "catalog_v3_029": chosenOwn.slice(0, 1).forEach((card) => { card.value = selected.value || card.value; card.label = labelForValue(card.value); card.tags.push("VALOR LIBRE"); }); return "la Poker Card elegida adopta el valor declarado.";
    case "catalog_v3_030": chosenOwn.slice(0, 1).forEach((card) => { card.suit = selected.suit || card.suit; card.tags.push("COLOR LIBRE"); }); return "la Poker Card elegida adopta el palo declarado.";
    case "catalog_v3_031": drawPower(state.activePlayer, 1); return `robas ${draw(1)} Poker y 1 Power.`;
    case "catalog_v3_032": return `robas ${draw(2)} Poker Cards.`;
    case "catalog_v3_033": return "niega la activacion inmediata anterior.";
    case "catalog_v3_034": return `robas ${draw(1)} Poker Card por carta poderosa.`;
    case "catalog_v3_035": player.pokerHand.push({ id: `joker_${crypto.randomUUID()}`, value: 1, label: "Joker", suit: "★", joker: true, tags: ["JOKER"] }); return "añade un Joker a tu Poker Hand.";
    case "catalog_v3_036": return diceTotal === 7 || selected.dice[0] === selected.dice[1] ? `dados ${diceTotal}: robas ${draw(2)}.` : `dados ${diceTotal}: sin robo.`;
    case "catalog_v3_037": state.players.forEach((_, i) => i !== state.activePlayer && drawPoker(i, 1)); return "rivales roban 1 y quedan marcados para descartar en la siguiente ronda.";
    case "catalog_v3_038": return `${target?.name || "Objetivo"} muestra ${Math.min(2, target?.pokerHand.length || 0)} Poker Card(s) al azar.`;
    case "catalog_v3_039": player.pokerLimit = 10; draw(3); return "limite temporal de Poker sube a 10 y robas 3.";
    case "catalog_v3_040": return takeAceFromDeck(selected);
    case "catalog_v3_041": return blackjackCharge(selected);
    case "catalog_v3_042": return tagPoker(chosenOwn, "ARTILUGIO AMARILLO");
    case "catalog_v3_043": return tagPoker(chosenOwn, "ARTILUGIO AZUL");
    case "catalog_v3_044": return tagPoker(chosenOwn, "ARTILUGIO VERDE");
    case "catalog_v3_045": return artimanaAs();
    case "catalog_v3_046": player.pokerLimit = 10; return "limite de Poker sube a 10; cobros exigen As.";
    case "catalog_v3_047": draw(5); return `${exchangePoker(selected, 2)} Luego, si entregaste As, el objetivo descarta hasta 2.`;
    case "catalog_v3_048": return stealChip(selected);
    case "catalog_v3_049": player.flags.investor = true; return "Gran Inversor activo: gana 1 ficha al final de cada ronda.";
    case "catalog_v3_050": player.flags.helmet = true; return "Casco activo: niega la primera seleccion que recibas.";
    case "catalog_v3_051": return returnTargetHyper(selected, 1);
    case "catalog_v3_052": return returnTargetHyper(selected, 1);
    case "catalog_v3_053": return `robas ${draw(1)} Poker Card.`;
    case "catalog_v3_054": return `robas ${drawPower(state.activePlayer, 1)} Power Card.`;
    case "catalog_v3_055": return `${stealChip(selected)} Pagas ${movePoker(state.activePlayer, selected.target, [...selected.ownPoker].slice(0, 2)).length} Poker Cards.`;
    case "catalog_v3_056": target.pokerLimit = 5; return `${target.name} queda limitado a 5 y descarta ${removePoker(selected.target, chosenTarget.map((c) => c.id)).length || Math.max(0, target.pokerHand.length - 5)} excedentes.`;
    default: return "efecto registrado.";
  }
}

function takeHyperFromDeck(selected) {
  const player = activePlayer();
  const id = [...selected.deckPower][0] || player.powerDeck.find((powerId) => cardById.get(powerId)?.type === "Hyper");
  if (!id) return "no hay HyperCards disponibles en el deck.";
  player.powerDeck = player.powerDeck.filter((powerId) => powerId !== id);
  player.powerHand.push(id);
  return `buscas ${cardById.get(id)?.name} y la agregas a tu mano.`;
}

function returnOwnHyper() {
  const player = activePlayer();
  const id = player.activeHyper.shift();
  if (!id) return "no tienes HyperCards activas para devolver.";
  player.powerDeck.push(id);
  return `dados pares: devuelves ${cardById.get(id)?.name} a tu deck.`;
}

function returnTargetHyper(selected, amount) {
  const target = state.players[selected.target];
  if (!target) return "sin objetivo valido.";
  const ids = [...selected.targetHyper].slice(0, amount);
  const fallback = target.activeHyper.slice(0, amount - ids.length);
  const chosen = [...ids, ...fallback].filter(Boolean);
  target.activeHyper = target.activeHyper.filter((id) => !chosen.includes(id));
  target.powerDeck.push(...chosen);
  return `${target.name} devuelve ${chosen.length} HyperCard(s) al deck.`;
}

function maestroFichas(selected) {
  const target = state.players[selected.target];
  if (!target || target.chips < 5) return "el objetivo necesita 5+ fichas.";
  if (selected.action === "poker") return `robas ${movePoker(selected.target, state.activePlayer, target.pokerHand.slice(0, 2).map((c) => c.id)).length} Poker Cards al azar.`;
  if (selected.action === "power") {
    const id = target.powerHand.shift();
    if (!id) return "objetivo sin Power Cards.";
    activePlayer().powerHand.push(id);
    return `tomas una Power Card al azar de ${target.name}.`;
  }
  target.chips -= 1;
  activePlayer().chips += 1;
  return `robas 1 ficha a ${target.name}.`;
}

function operacionTactica(selected) {
  const target = state.players[selected.target];
  if (!target || target.pokerHand.length < 6) return "el objetivo necesita 6+ Poker Cards.";
  if (selected.action === "steal") return `robas ${movePoker(selected.target, state.activePlayer, [target.pokerHand[0].id]).length} Poker Card.`;
  return exchangePoker(selected, 3, true);
}

function exchangePoker(selected, max, random = false) {
  const target = state.players[selected.target];
  if (!target) return "sin objetivo valido.";
  const ownIds = random ? activePlayer().pokerHand.slice(0, max).map((c) => c.id) : [...selected.ownPoker].slice(0, max);
  const targetIds = random ? target.pokerHand.slice(0, max).map((c) => c.id) : [...selected.targetPoker].slice(0, max);
  const ownMoved = movePoker(state.activePlayer, selected.target, ownIds);
  const targetMoved = movePoker(selected.target, state.activePlayer, targetIds);
  return `intercambias ${ownMoved.length}/${targetMoved.length} Poker Card(s) con ${target.name}.`;
}

function movePoker(from, to, ids) {
  const source = state.players[from];
  const moved = source.pokerHand.filter((card) => ids.includes(card.id));
  source.pokerHand = source.pokerHand.filter((card) => !ids.includes(card.id));
  state.players[to].pokerHand.push(...moved);
  return moved;
}

function exchangeWithDeck(amount) {
  const player = activePlayer();
  const ids = player.pokerHand.slice(0, amount).map((card) => card.id);
  const removed = removePoker(state.activePlayer, ids);
  drawPoker(state.activePlayer, removed.length);
  return removed.length;
}

function expertoDados(roll) {
  if (roll === 1) return `descartas ${discardRandomPoker(state.activePlayer, 2).length}.`;
  if (roll === 2) return `descartas ${discardRandomPoker(state.activePlayer, 1).length}.`;
  if (roll === 3) return `intercambias ${exchangeWithDeck(1)} con el mazo.`;
  if (roll === 4) return `robas ${drawPoker(state.activePlayer, 1)}.`;
  if (roll === 5) return `robas ${drawPoker(state.activePlayer, 2)}.`;
  return `robas ${drawPoker(state.activePlayer, 3)}.`;
}

function takePokerFromDeck(selected, topAmount) {
  const id = [...selected.deckPoker][0];
  const top = state.pokerDeck.slice(0, topAmount);
  const picked = top.find((card) => card.id === id) || top[0];
  if (!picked) return "no hay Poker Cards en el mazo.";
  state.pokerDeck = state.pokerDeck.filter((card) => card.id !== picked.id);
  activePlayer().pokerHand.push(picked);
  return `robas ${shortPoker(picked)} de las primeras ${topAmount}.`;
}

function takeAceFromDeck(selected) {
  const id = [...selected.deckPoker][0];
  const ace = state.pokerDeck.find((card) => card.id === id) || state.pokerDeck.find((card) => card.value === 1 || card.joker);
  if (!ace) return "no quedan Ases en el mazo.";
  state.pokerDeck = state.pokerDeck.filter((card) => card.id !== ace.id);
  activePlayer().pokerHand.push(ace);
  return `buscas y robas ${shortPoker(ace)}.`;
}

function favoriteSuit(suit) {
  const before = activePlayer().pokerHand.length;
  drawPoker(state.activePlayer, 1);
  const drawn = activePlayer().pokerHand[activePlayer().pokerHand.length - 1];
  if (!drawn || activePlayer().pokerHand.length === before) return "no pudo robar.";
  if (drawn.suit === suit) {
    drawPoker(state.activePlayer, 1);
    return `declaraste ${suit}, acertaste ${shortPoker(drawn)} y robas 1 extra.`;
  }
  removePoker(state.activePlayer, [drawn.id]);
  discardRandomPoker(state.activePlayer, 1);
  return `declaraste ${suit}, salio ${shortPoker(drawn)} y descartas otra carta.`;
}

function drawAndReveal() {
  const before = activePlayer().pokerHand.length;
  drawPoker(state.activePlayer, 1);
  const card = activePlayer().pokerHand[activePlayer().pokerHand.length - 1];
  return activePlayer().pokerHand.length > before ? shortPoker(card) : "nada";
}

function sharePoker(selected) {
  const before = activePlayer().pokerHand.length;
  drawPoker(state.activePlayer, 2);
  const drawn = activePlayer().pokerHand.slice(before);
  const shared = drawn[1] ? movePoker(state.activePlayer, selected.target, [drawn[1].id]).length : 0;
  return `robas 2 y compartes ${shared} con ${state.players[selected.target]?.name}.`;
}

function rotatePoker(direction) {
  const hands = state.players.map((player) => player.pokerHand.shift()).filter(Boolean);
  if (hands.length < 2) return "no hay cartas suficientes para rotar.";
  const rotated = direction === "counter" ? [...hands.slice(1), hands[0]] : [hands[hands.length - 1], ...hands.slice(0, -1)];
  rotated.forEach((card, index) => state.players[index].pokerHand.push(card));
  return "todos rotan 1 Poker Card.";
}

function blackjackCharge(selected) {
  const chosen = activePlayer().pokerHand.filter((card) => selected.ownPoker.has(card.id)).slice(0, 2);
  const valid = chosen.length === 2 && chosen[0].value !== chosen[1].value && chosen.reduce((sum, card) => sum + blackjackValue(card), 0) === 21;
  if (!valid) return "selecciona 2 cartas de distinto valor que sumen 21.";
  removePoker(state.activePlayer, chosen.map((card) => card.id));
  activePlayer().chips += 1;
  drawPoker(state.activePlayer, 2);
  return "Blackjack cobra como pareja: +1 ficha y reposicion.";
}

function tagPoker(chosen, tag) {
  chosen.slice(0, 1).forEach((card) => {
    if (!card.tags.includes(tag)) card.tags.push(tag);
  });
  return chosen.length ? `${shortPoker(chosen[0])} queda vinculada a ${tag}.` : "selecciona una Poker Card para vincular.";
}

function artimanaAs() {
  const aces = activePlayer().pokerHand.filter((card) => card.value === 1 || card.joker).length;
  activePlayer().chips += aces;
  return `cobras ${aces} ficha(s) por As/Joker.`;
}

function stealChip(selected) {
  const target = state.players[selected.target];
  if (!target || target.chips < 1) return "objetivo sin fichas.";
  target.chips -= 1;
  activePlayer().chips += 1;
  return `robas 1 ficha a ${target.name}.`;
}

function blackjackValue(card) {
  if (card.joker) return 11;
  if (card.value > 10) return 10;
  if (card.value === 1) return 11;
  return card.value;
}

function labelForValue(value) {
  return values[value - 1] || String(value || "?");
}

function shortPoker(card) {
  return card ? `${card.label}${card.suit}` : "?";
}

function openInfo(title, content) {
  openOverlay();
  els.infoDialog.innerHTML = `
    <div class="modal-header">
      <div><h2 class="modal-title">${title}</h2></div>
      <button class="close-button" data-close>×</button>
    </div>
    <div class="modal-body">${content}<div class="modal-actions"><button class="modal-button primary" data-close>Cerrar</button></div></div>`;
  els.infoDialog.showModal();
}

function scoreBestHand() {
  const player = activePlayer();
  const groups = player.pokerHand.reduce((acc, card) => {
    const key = String(card.value);
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key).push(card);
    return acc;
  }, new Map());
  let chips = 0;
  const used = [];
  groups.forEach((group) => {
    if (group.length >= 4) { chips += 5; used.push(...group.slice(0, 4)); }
    else if (group.length >= 3) { chips += 3; used.push(...group.slice(0, 3)); }
    else if (group.length >= 2) { chips += 1; used.push(...group.slice(0, 2)); }
  });
  const flushSuit = suits.find((suit) => player.pokerHand.filter((card) => card.suit === suit).length >= 5);
  if (flushSuit) chips += 4;
  if (!chips) return "sin combinaciones automáticas para cobrar.";
  player.chips += chips;
  removePoker(state.activePlayer, used.map((card) => card.id));
  drawPoker(state.activePlayer, used.length);
  return `cobro semi automatico: +${chips} fichas.`;
}

function nextTurn() {
  state.players.forEach((player) => {
    if (player.flags.investor) player.chips += 1;
  });
  state.activePlayer = (state.activePlayer + 1) % state.players.length;
  state.phase = "Main Phase";
  drawPower(state.activePlayer, activePlayer().powerDraw);
  pushLog(`Nuevo turno: ${activePlayer().name}.`);
  render();
}

document.addEventListener("click", (event) => {
  const zoom = event.target.closest("[data-zoom-power]");
  if (zoom) {
    openCardZoom(zoom.dataset.zoomPower, Number(zoom.dataset.owner || state.activePlayer), zoom.dataset.inHand === "true");
    return;
  }
  const close = event.target.closest("[data-close]");
  if (close) {
    closeDialogs();
    return;
  }
  const activate = event.target.closest("[data-activate-card], [data-open-effect]");
  if (activate) {
    const id = activate.dataset.activateCard || activate.dataset.openEffect;
    closeDialogs();
    openCounterWindow(id);
    return;
  }
  const confirm = event.target.closest("[data-confirm-effect]");
  if (confirm) {
    confirmEffect(confirm.dataset.confirmEffect, window.__lastSelection || {});
  }
});

els.effectDialog.addEventListener("click", (event) => {
  const skip = event.target.closest("[data-counter-skip]");
  if (skip) {
    const id = skip.dataset.counterSkip;
    closeDialogs();
    openEffectWindow(id);
    return;
  }
  const auto = event.target.closest("[data-counter-auto]");
  if (auto) {
    pushLog("CounterCard activada antes de resolver la cadena.");
    const id = auto.dataset.counterAuto;
    closeDialogs();
    openEffectWindow(id);
  }
});

document.querySelectorAll(".hand-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.handSection = tab.dataset.section;
    renderHand();
  });
});

document.getElementById("handPrev").addEventListener("click", () => els.handCards.scrollBy({ left: -320, behavior: "smooth" }));
document.getElementById("handNext").addEventListener("click", () => els.handCards.scrollBy({ left: 320, behavior: "smooth" }));

document.getElementById("manualModeBtn").addEventListener("click", () => switchMode("manual"));
document.getElementById("autoModeBtn").addEventListener("click", () => switchMode("auto"));

function switchMode(mode) {
  if (state.mode === mode) return;
  els.transitionCurtain.classList.remove("hidden");
  setTimeout(() => {
    state.mode = mode;
    pushLog(mode === "manual" ? "Versión manual activa: la app guía ventanas sin resolver estado." : "Versión semi automática activa: la app aplica efectos.");
    render();
  }, 420);
  setTimeout(() => els.transitionCurtain.classList.add("hidden"), 940);
}

els.toolsButton.addEventListener("click", () => els.toolsPanel.classList.toggle("hidden"));
els.toolsPanel.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tool]");
  if (!button) return;
  const tool = button.dataset.tool;
  if (tool === "die1") openInfo("1 dado", `<div class="dice-box"><div class="die">${1 + Math.floor(Math.random() * 6)}</div></div>`);
  if (tool === "die2") openInfo("2 dados", `<div class="dice-box"><div class="die">${1 + Math.floor(Math.random() * 6)}</div><div class="die">${1 + Math.floor(Math.random() * 6)}</div></div>`);
  if (tool === "coin1") openInfo("1 moneda", `<p class="effect-text">${Math.random() > 0.5 ? "Cara" : "Cruz"}</p>`);
  if (tool === "coin2") openInfo("2 monedas", `<p class="effect-text">${Math.random() > 0.5 ? "Cara" : "Cruz"} · ${Math.random() > 0.5 ? "Cara" : "Cruz"}</p>`);
  if (tool === "payouts") openInfo("Tabla de cobros", `<div class="effect-text">Pareja: 1 ficha<br>Trio: 3 fichas<br>Color: 4 fichas<br>Poker: 5 fichas<br>Blackjack: cobra como pareja.</div>`);
  if (tool === "myDeck") openInfo("Mi Power Deck", deckList(activePlayer()));
  if (tool === "targetDeck") openInfo("Decks de jugadores", state.players.map((player, i) => `<button class="player-choice" onclick="window.showDeck(${i})">${player.name}: ${player.powerDeck.length} cartas</button>`).join(""));
});

window.showDeck = (index) => openInfo(`Deck de ${state.players[index].name}`, deckList(state.players[index]));

function deckList(player) {
  return `<div class="card-choice-row">${player.powerDeck.slice(0, 18).map((id) => renderPowerCard(id, { owner: state.players.indexOf(player) })).join("")}</div><p class="small-note">${player.powerDeck.length} cartas en deck.</p>`;
}

document.getElementById("endMainBtn").addEventListener("click", () => {
  state.phase = "Charge Phase";
  pushLog(`${activePlayer().name} termina Main Phase.`);
  render();
});

document.getElementById("endChargeBtn").addEventListener("click", () => {
  if (state.phase === "Charge Phase") pushLog(scoreBestHand());
  const over = activePlayer().pokerHand.length - activePlayer().pokerLimit;
  if (over > 0) discardRandomPoker(state.activePlayer, over);
  nextTurn();
});

document.getElementById("pokerDeckButton").addEventListener("click", () => openInfo("Poker Deck", `<p class="effect-text">${state.pokerDeck.length} cartas restantes.</p>`));
document.getElementById("powerDeckButton").addEventListener("click", () => openInfo("Power Deck", deckList(activePlayer())));
document.getElementById("discardButton").addEventListener("click", () => openInfo("Descartes Poker", `<p class="effect-text">${state.pokerDiscard.length} cartas descartadas o cobradas.</p>`));

const originalOpenEffectWindow = openEffectWindow;
openEffectWindow = function patchedOpenEffectWindow(cardId) {
  originalOpenEffectWindow(cardId);
  const observer = new MutationObserver(() => {
    const confirm = els.effectDialog.querySelector("[data-confirm-effect]");
    if (!confirm) return;
    observer.disconnect();
  });
  observer.observe(els.effectDialog, { childList: true, subtree: true });
};

const originalBindEffectControls = bindEffectControls;
bindEffectControls = function patchedBindEffectControls(selected, rerender) {
  window.__lastSelection = selected;
  originalBindEffectControls(selected, () => {
    window.__lastSelection = selected;
    rerender();
  });
};

initGame();
