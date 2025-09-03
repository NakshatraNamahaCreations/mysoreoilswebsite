// src/utils/addressStore.js
// One shared store for both pages.
// Keys:
const LS_FORM_KEY = "checkoutAddressDraft";   // last edited form draft (optional UX)
const LS_SAVED_LIST_KEY = "savedAddresses";   // the canonical address book
const LS_SELECTED_ID_KEY = "selectedAddressId";

// Shape we keep in localStorage (backend-like):
// {
//   _id: string (preferred) | id: string,
//   firstName, lastName, email,
//   mobileNumber: "+91XXXXXXXXXX",
//   address: "Line1 Line2",
//   city, state, pincode, country
// }

const cryptoId = () =>
  (globalThis.crypto?.randomUUID && crypto.randomUUID()) ||
  `loc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const getId = (a) => a?._id || a?.id;

const readList = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_SAVED_LIST_KEY) || "[]");
  } catch {
    return [];
  }
};
const writeList = (list) =>
  localStorage.setItem(LS_SAVED_LIST_KEY, JSON.stringify(list || []));

const dedupeMerge = (list, incoming) => {
  const byId = new Map();
  [...list, ...incoming].forEach((a) => {
    if (!a) return;
    byId.set(getId(a), a);
  });
  return [...byId.values()];
};

// ---------- Normalizers ----------
export const normalizeFormToStorage = (form) => {
  if (!form) return null;
  const phoneCode = form.phoneCode || "+91";
  const phoneNumber = `${form.phoneNumber || ""}`.trim();
  const mobileNumber = `${phoneCode}${phoneNumber}`; // "+91" + number
  const address = `${(form.address1 || "").trim()} ${(form.address2 || "").trim()}`.trim();

  return {
    _id: form._id || form.id || cryptoId(),
    firstName: form.firstName || "",
    lastName: form.lastName || "",
    email: form.email || "",
    mobileNumber,
    address,
    city: form.city || "",
    state: form.state || "",
    pincode: form.pincode || "",
    country: form.country || "",
  };
};

export const normalizeBackendToStorage = (addr) => {
  if (!addr) return null;
  return {
    _id: addr._id || addr.id || cryptoId(),
    firstName: addr.firstName || "",
    lastName: addr.lastName || "",
    email: addr.email || "",
    mobileNumber: addr.mobileNumber || "",
    address: addr.address || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.pincode || "",
    country: addr.country || "",
  };
};

// For showing in forms from storage shape
export const splitStorageToForm = (a) => {
  if (!a) return null;
  const m = `${a.mobileNumber || ""}`;
  const looksIntl = m.startsWith("+") && m.length > 3;
  const phoneCode = looksIntl ? m.slice(0, 3) : "+91";
  const phoneNumber = looksIntl ? m.slice(3) : m;

  const parts = `${a.address || ""}`.trim().split(" ");
  const address1 = parts[0] || "";
  const address2 = parts.slice(1).join(" ");

  return {
    _id: a._id,
    email: a.email || "",
    firstName: a.firstName || "",
    lastName: a.lastName || "",
    phoneCode,
    phoneNumber,
    address1,
    address2,
    city: a.city || "",
    state: a.state || "",
    pincode: a.pincode || "",
    country: a.country || "",
  };
};

// ---------- Public API ----------
export const addressStore = {
  // read/write the whole list
  getAll() {
    return readList();
  },
  setAll(list) {
    writeList(list || []);
  },

  // upsert one (from form or backend)
  upsertFromForm(form, { select = true } = {}) {
    const item = normalizeFormToStorage(form);
    const current = readList();
    const merged = dedupeMerge(current, [item]);
    writeList(merged);
    if (select) this.select(item);
    return item;
  },

  upsertFromBackend(addr, { select = true } = {}) {
    const item = normalizeBackendToStorage(addr);
    const current = readList();
    const merged = dedupeMerge(current, [item]);
    writeList(merged);
    if (select) this.select(item);
    return item;
  },

  // delete by id
  removeById(id) {
    const current = readList();
    const filtered = current.filter((a) => getId(a) !== id);
    writeList(filtered);
    const selected = this.getSelected();
    if (selected && getId(selected) === id) {
      if (filtered.length) {
        this.select(filtered[filtered.length - 1]); // fallback to last
      } else {
        localStorage.removeItem(LS_SELECTED_ID_KEY);
      }
    }
    return filtered;
  },

  // selection helpers
  select(addrOrId) {
    const id = typeof addrOrId === "string" ? addrOrId : getId(addrOrId);
    if (id) localStorage.setItem(LS_SELECTED_ID_KEY, id);
  },
  getSelected() {
    const id = localStorage.getItem(LS_SELECTED_ID_KEY);
    if (!id) return null;
    return readList().find((a) => getId(a) === id) || null;
  },

  // draft form
  saveDraft(form) {
    localStorage.setItem(LS_FORM_KEY, JSON.stringify(form || {}));
  },
  readDraft() {
    try {
      return JSON.parse(localStorage.getItem(LS_FORM_KEY) || "{}");
    } catch {
      return {};
    }
  },
  clearDraft() {
    localStorage.removeItem(LS_FORM_KEY);
  },
};
