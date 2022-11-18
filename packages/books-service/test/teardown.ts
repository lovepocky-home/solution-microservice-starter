import { ChildProcessWithoutNullStreams } from "child_process"

export default function () {
  console.log('teardown...')

  const pg = globalThis.pg as ChildProcessWithoutNullStreams
  // https://azimi.me/2014/12/31/kill-child_process-node-js.html
  process.kill(-pg.pid)
}