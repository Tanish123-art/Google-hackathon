// Simple in-memory store for tests. Replace with Firestore / MongoDB in prod.
const tests = new Map();

/**
 * test object shape:
 * {
 *   id,
 *   topics: [],
 *   questions: [ { id, question, options, answer, explanation, difficulty, sources } ],
 *   createdAt,
 *   responses: { userId: [{questionId, answer, score}] }
 * }
 */

function saveTest(test) {
  tests.set(test.id, test);
  return test;
}
function getTest(id) {
  return tests.get(id);
}
function updateTest(id, data) {
  const t = tests.get(id);
  if (!t) return null;
  Object.assign(t, data);
  tests.set(id, t);
  return t;
}

export { saveTest, getTest, updateTest };
