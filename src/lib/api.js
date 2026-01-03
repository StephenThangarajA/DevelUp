const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const setToken = () => {};

const headers = () => ({ "Content-Type": "application/json" });

export const apiGet = async (path) => {
  const res = await fetch(`${API_URL}${path}`, { headers: headers(), credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const apiPost = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, { method: "POST", headers: headers(), credentials: 'include', body: JSON.stringify(body || {}) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const apiPatch = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, { method: "PATCH", headers: headers(), credentials: 'include', body: JSON.stringify(body || {}) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const authSignup = async (payload) => apiPost("/auth/signup", payload);
export const authLogin = async (payload) => apiPost("/auth/login", payload);
export const authGoogle = async (payload) => apiPost("/auth/google", payload);
export const authMe = async () => apiGet("/auth/me");
export const authLogout = async () => apiPost("/auth/logout");

export const listProducts = async () => apiGet("/products");
export const startTrial = async (key) => apiPost(`/products/${key}/trial/start`);
export const consumeTrial = async (key) => apiPost(`/products/${key}/trial/consume`);

export const helpdesk = {
  agents: {
    list: () => apiGet("/helpdesk/agents"),
    create: (data) => apiPost("/helpdesk/agents", data)
  },
  customers: {
    list: () => apiGet("/helpdesk/customers"),
    create: (data) => apiPost("/helpdesk/customers", data)
  },
  tickets: {
    list: () => apiGet("/helpdesk/tickets"),
    create: (data) => apiPost("/helpdesk/tickets", data),
    update: (id, data) => apiPatch(`/helpdesk/tickets/${id}`, data)
  }
};

export const audit = {
  audits: {
    list: () => apiGet("/audit/audits"),
    create: (data) => apiPost("/audit/audits", data),
    remove: (id) => fetch(`${API_URL}/audit/audits/${id}`, { method: "DELETE", headers: headers() }).then(r => r.json())
  },
  findings: {
    list: () => apiGet("/audit/findings"),
    create: (data) => apiPost("/audit/findings", data),
    update: (id, data) => apiPatch(`/audit/findings/${id}`, data),
    remove: (id) => fetch(`${API_URL}/audit/findings/${id}`, { method: "DELETE", headers: headers() }).then(r => r.json())
  },
  settings: {
    get: () => apiGet("/audit/settings"),
    update: (data) => apiPatch("/audit/settings", data)
  }
};

export const payroll = {
  employees: {
    list: () => apiGet("/payroll/employees"),
    create: (data) => apiPost("/payroll/employees", data),
    update: (id, data) => apiPatch(`/payroll/employees/${id}`, data),
    remove: (id) => fetch(`${API_URL}/payroll/employees/${id}`, { method: "DELETE", headers: headers() }).then(r => r.json())
  },
  payslips: {
    list: () => apiGet("/payroll/payslips"),
    generate: (employeeId, month) => apiPost("/payroll/payslips/generate", { employeeId, month })
  },
  settings: {
    get: () => apiGet("/payroll/settings"),
    update: (data) => apiPatch("/payroll/settings", data)
  }
};

export const students = {
  resume: {
    get: () => apiGet("/students/resume"),
    save: (data) => apiPost("/students/resume", data)
  }
};
