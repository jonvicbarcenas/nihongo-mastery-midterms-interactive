export function sampleStroke(stroke) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', stroke.path);
  const length = path.getTotalLength();
  return Array.from({ length: 40 }, (_, index) => {
    const point = path.getPointAtLength(length * index / 39);
    return { x: point.x * stroke.scale + stroke.x, y: point.y * stroke.scale + stroke.y };
  });
}

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const nearest = (point, path) => Math.min(...path.map(other => distance(point, other)));

export function matchesGuidedStroke(user, target, tolerance = 18) {
  if (user.length < 2 || target.length < 2) return false;
  if (distance(user[0], target[0]) > tolerance || distance(user.at(-1), target.at(-1)) > tolerance) return false;
  const userCoverage = user.filter(point => nearest(point, target) <= tolerance).length / user.length;
  const targetCoverage = target.filter(point => nearest(point, user) <= tolerance).length / target.length;
  const pathLength = points => points.slice(1).reduce((sum, point, i) => sum + distance(point, points[i]), 0);
  const lengthRatio = pathLength(user) / Math.max(1, pathLength(target));
  return userCoverage >= 0.85 && targetCoverage >= 0.85 && lengthRatio >= 0.5 && lengthRatio <= 2;
}
