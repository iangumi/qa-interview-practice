// Consolidate equivalent interview prompts. The first ID represents the group.
const equivalentPrompts = [[19, 24], [20, 42], [58, 73], [71, 132]];
const canonicalIds = new Map(equivalentPrompts.flatMap(group => group.map(id => [id, group[0]])));

export const reportGroup = id => canonicalIds.get(id) ?? id;
export const reportRoles = [
  ["junior", "Junior QA"],
  ["sdet", "Automation Engineer / SDET"],
  ["lead", "Senior / Lead QA"],
  ["other", "Other QA role"],
];
