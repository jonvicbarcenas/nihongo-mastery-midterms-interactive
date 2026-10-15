#!/usr/bin/env bash
set -euo pipefail

image="${1:-nihongo-mastery:check}"
container_id="$(docker run -d --cap-drop=ALL --security-opt=no-new-privileges \
  -e PORT=10000 -p 127.0.0.1::10000 "$image")"
cleanup() {
  docker logs "$container_id"
  docker rm -f "$container_id" > /dev/null
}
trap cleanup EXIT

host_port="$(docker port "$container_id" 10000/tcp | cut -d: -f2)"
base_url="http://127.0.0.1:${host_port}"
curl --fail --silent --show-error --retry 15 --retry-delay 1 --retry-connrefused \
  "${base_url}/health" > /tmp/nihongo-health.txt
test "$(cat /tmp/nihongo-health.txt)" = 'ok'

curl --fail --silent --show-error "${base_url}/" > /tmp/nihongo-index.html
grep -q '<div id="root"></div>' /tmp/nihongo-index.html
curl --fail --silent --show-error "${base_url}/study/lesson-3" > /tmp/nihongo-route.html
cmp /tmp/nihongo-index.html /tmp/nihongo-route.html

asset_path="$(grep -oE '/assets/[^" ]+\.js' /tmp/nihongo-index.html | head -n 1)"
test -n "$asset_path"
curl --fail --silent --show-error "${base_url}${asset_path}" -o /dev/null
echo 'Restricted container checks passed: startup, PORT=10000, health, SPA fallback and JavaScript asset.'
