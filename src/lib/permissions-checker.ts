type Permission = string;

function normalize(p: string) {
  return p.trim().replace(/\s+/g, " ");
}

function wildcardToRegExp(pattern: string) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const regex = "^" + escaped.replace(/\*/g, ".*") + "$";
  return new RegExp(regex);
}

export function buildPermissionChecker(allowed: Permission[]) {
  const normalized = allowed.map(normalize);

  const wildcardRules = normalized
    .filter(p => p.includes("*"))
    .map(p => ({ raw: p, re: wildcardToRegExp(p) }));

  const exactSet = new Set(normalized.filter(p => !p.includes("*")));

  return function can(required: Permission | Permission[], opts?: { any?: boolean }) {
    const reqList = Array.isArray(required) ? required : [required];
    const any = opts?.any ?? true; // default: OR-Logik

    const checkOne = (r: string) => {
      const rr = normalize(r);
      if (exactSet.has(rr)) return true;
      return wildcardRules.some(w => w.re.test(rr));
    };

    if (any) return reqList.some(checkOne);
    return reqList.every(checkOne);
  };
}
