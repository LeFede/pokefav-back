import {Elysia, t} from 'elysia'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { FIREBASE_AUTH } from './config/firebase'

const schema = {
    body: t.Object({
      key: t.String(),
    }),
    query: t.Object({
      q: t.String()
    }),
    params: t.Object({
      id: t.String()
    })
  }

const loginIdHandler = ({query, params, body}) => {
          console.log(query, params, body)
          return ":D\n"
        }

const app = new Elysia()
  .get('/', () => JSON.stringify("Hello Elysia!"))
  .post('/auth', ({body}) => {
    console.log(body)
    return JSON.stringify(":D")
  })
  .post('/create', async ({body, set}: any) => {
    try {
      const {email, password} = body
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      // console.log(res._tokenResponse.localId)
      return JSON.stringify({message: "User created succesfully"})
    } catch(err: any) {
      set.status = 400
      
      if(err.message.includes('auth/email-already-in-use'))
        return JSON.stringify({message: "Email already in use", status: 400})
    }
  })
  // .group('/login', app => app
  //   .guard(schema, app => app
  //     .post('/:id', loginIdHandler)
  //   )
  // )
  .listen(3001)

console.log(`Elysia running on port ${app?.server?.port}`)

