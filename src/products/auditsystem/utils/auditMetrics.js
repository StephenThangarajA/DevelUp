const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const getFindingsForAudit = (findings, auditId) =>
  findings.filter((finding) => finding.auditId === auditId);

export const countAuditFindings = (findings, auditId) =>
  getFindingsForAudit(findings, auditId).length;

export const countResolvedFindings = (findings, auditId) =>
  getFindingsForAudit(findings, auditId).filter((finding) => finding.status === 'resolved').length;

export const calculateAuditProgress = (audit, findings) => {
  if (!audit) {
    return 0;
  }
  if (audit.status === 'completed') {
    return 100;
  }

  const auditFindings = getFindingsForAudit(findings, audit.id);
  if (!auditFindings.length) {
    return audit.status === 'active' ? 50 : 0;
  }

  const resolved = auditFindings.filter((finding) => finding.status === 'resolved').length;
  return Math.round((resolved / auditFindings.length) * 100);
};

export const getSeverityCounts = (findings) =>
  findings.reduce(
    (acc, finding) => ({
      ...acc,
      [finding.severity]: (acc[finding.severity] ?? 0) + 1,
    }),
    { critical: 0, high: 0, medium: 0, low: 0 },
  );

export const getStatusCounts = (audits) =>
  audits.reduce(
    (acc, audit) => ({
      ...acc,
      [audit.status]: (acc[audit.status] ?? 0) + 1,
    }),
    { active: 0, completed: 0, pending: 0, 'on-hold': 0 },
  );

const monthKey = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const getRecentMonths = (count = 6, referenceDate = new Date()) => {
  const months = [];
  const start = new Date(referenceDate);
  start.setDate(1);

  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(start);
    d.setMonth(start.getMonth() - i);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  return months;
};

export const getMonthsFromAudits = (audits, minMonths = 6) => {
  if (!audits || audits.length === 0) {
    // If no audits, return last 6 months from today
    return getRecentMonths(minMonths);
  }

  // Find the earliest date from audits (using createdAt or startDate)
  const dates = audits
    .map((audit) => {
      if (audit.startDate) {
        return new Date(audit.startDate);
      }
      if (audit.createdAt) {
        return new Date(audit.createdAt);
      }
      return null;
    })
    .filter((date) => date && !Number.isNaN(date.getTime()));

  if (dates.length === 0) {
    return getRecentMonths(minMonths);
  }

  const earliestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const now = new Date();
  
  // Calculate months from earliest date to current month
  const startMonth = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
  const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const months = [];
  const current = new Date(startMonth);
  
  while (current <= endMonth) {
    months.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
    current.setMonth(current.getMonth() + 1);
  }

  // Ensure we have at least minMonths months
  if (months.length < minMonths) {
    // If we have fewer months than minMonths, extend backwards
    const additionalMonths = minMonths - months.length;
    const extendedMonths = [];
    const firstMonth = new Date(startMonth);
    firstMonth.setMonth(firstMonth.getMonth() - additionalMonths);
    
    const extendedCurrent = new Date(firstMonth);
    while (extendedCurrent < startMonth) {
      extendedMonths.push(`${extendedCurrent.getFullYear()}-${String(extendedCurrent.getMonth() + 1).padStart(2, '0')}`);
      extendedCurrent.setMonth(extendedCurrent.getMonth() + 1);
    }
    
    return [...extendedMonths, ...months];
  }

  return months;
};

export const buildMonthlyDataset = ({
  months,
  audits,
  findings,
}) => {
  const auditsCompletedByMonth = audits.reduce((acc, audit) => {
    if (audit.status !== 'completed' || !audit.updatedAt) {
      return acc;
    }
    const key = monthKey(audit.updatedAt);
    if (!key) {
      return acc;
    }
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const findingsResolvedByMonth = findings.reduce((acc, finding) => {
    if (finding.status !== 'resolved' || !finding.updatedAt) {
      return acc;
    }
    const key = monthKey(finding.updatedAt);
    if (!key) {
      return acc;
    }
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const labels = months.map((key) => {
    const [year, month] = key.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString(undefined, { month: 'short' });
  });

  const completedData = months.map((key) => auditsCompletedByMonth[key] ?? 0);
  const resolvedData = months.map((key) => findingsResolvedByMonth[key] ?? 0);

  return {
    labels,
    completedData,
    resolvedData,
  };
};

export const countItemsUpdatedSince = (items, field, since) =>
  items.filter((item) => {
    const value = item[field];
    if (!value) {
      return false;
    }
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date.getTime() >= since.getTime();
  }).length;

export const countDueWithinDays = (audits, days) => {
  const now = new Date();
  const threshold = days * MS_IN_DAY;
  return audits.filter((audit) => {
    const due = audit.dueDate ? new Date(audit.dueDate) : null;
    if (!due) {
      return false;
    }
    const diff = due.getTime() - now.getTime();
    return diff >= 0 && diff <= threshold;
  }).length;
};


