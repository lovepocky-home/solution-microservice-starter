import { spawn } from "child_process"

export default async function () {
  console.log('setup...')

  await new Promise((res, rej) => {
    // setup services
    const pg = spawn("podman run -p 5433:5432 --rm -it" +
      " -e POSTGRESQL_DATABASE=books" +
      " -e POSTGRESQL_PASSWORD=password" +
      " bitnami/postgresql", {
      shell: true,
      detached: true,
    })
    globalThis.pg = pg
    pg.stderr.pipe(process.stderr)

    pg.stdout.setEncoding('utf8')
    pg.stdout.on('data', (chunk: string) => {
      process.stdout.write('[PG] ' + chunk)
      if (chunk.includes('database system is ready')) {
        res('')
      }
    })

    pg.on('spawn', () => {
      console.log('pg spawned', pg.pid);
    })
    pg.on('exit', () => {
      console.log('pg exited');
    })
  })

  // create e2e config

}