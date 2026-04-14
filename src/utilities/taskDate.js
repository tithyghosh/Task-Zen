const DAY_IN_MS = 1000 * 60 * 60 * 24;

const startOfDay = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getTaskDateMeta = (dateStr) => {
  if (!dateStr) return null;

  const dueDate = new Date(dateStr);
  if (Number.isNaN(dueDate.getTime())) return null;

  const due = startOfDay(dueDate);
  const today = startOfDay(new Date());
  const diff = Math.round((due - today) / DAY_IN_MS);

  if (diff < 0) {
    return {
      text: `${Math.abs(diff)}d overdue`,
      overdue: true,
      sortValue: due.getTime(),
    };
  }

  if (diff === 0) {
    return {
      text: 'Due today',
      today: true,
      dueSoon: true,
      sortValue: due.getTime(),
    };
  }

  if (diff === 1) {
    return {
      text: 'Due tomorrow',
      dueSoon: true,
      sortValue: due.getTime(),
    };
  }

  if (diff <= 3) {
    return {
      text: `In ${diff} days`,
      dueSoon: true,
      sortValue: due.getTime(),
    };
  }

  return {
    text: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sortValue: due.getTime(),
  };
};

export const isTaskDueSoon = (dateStr) => {
  const meta = getTaskDateMeta(dateStr);
  return Boolean(meta?.dueSoon || meta?.today);
};

export const getDueDateSortValue = (dateStr) => {
  const meta = getTaskDateMeta(dateStr);
  return meta?.sortValue ?? Number.POSITIVE_INFINITY;
};
