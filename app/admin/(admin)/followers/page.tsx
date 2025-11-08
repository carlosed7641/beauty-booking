import { Followers } from './Followers'

export default function FollowersPage() {

  //TODO: Get from DB
  const followers: UserInfo[] = [
    {
      id: '123',
      name: 'Camilo Suárez'
    },
    {
      id: '124',
      name: 'Juan Castellanos'
    },
    {
      id: '125',
      name: 'Alan Britos'
    }
  ]

  const filteredFollowers = followers.filter(f => !f.blocked)

  return (
    <>
      <h1 className="text-lg text-green-700 mb-3 font-bold">Lista de seguidores {filteredFollowers.length > 0 && `(${filteredFollowers.length})`}</h1>
      <div className="flex flex-col gap-6">
        <div className="bg-white w-full rounded-md p-7">
          {
            filteredFollowers.length  > 0 ? <Followers users={filteredFollowers}  />
            : <p>Aún no tienes seguidores</p>
          }
        </div>
      </div>
    </>
  )
}