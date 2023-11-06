import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/:url', (req, res) => {
    console.log(req.params.url)
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    const data = req.body;
  console.log(data);
    res.send('Data Received: ' + JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const prisma = new PrismaClient()

async function main() {
   await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })