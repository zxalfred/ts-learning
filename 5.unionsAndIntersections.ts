// Union Types
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
}

// Unions with Common Fields
// If we have a value that is a union type,, we can only access members that are common to all types in the union
interface Bird {
  fly(): void
  layEggs(): void
}
interface Fish {
  swim(): void
  layEggs()
}

declare function getSmallPet(): Fish | Bird
let pet = getSmallPet()
pet.layEggs()
// pet.swim() // Error


// Discriminating Unions
interface NetworkLoadingState {
  state: 'loading'
}
interface NetworkFailedState {
  state: 'failed'
  code: number
}
interface NetworkSuccessState {
  state: 'success'
  response: {
    title: string
    duration: number
    summary: string
  }
}

type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState

function logger(state: NetworkState): string {
  switch (state.state) {
    case 'loading':
      return 'Downloading...'
    case 'failed':
      return `Error ${state.code} downloading`
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`
  }
}

// Union Exhaustiveness checking
type NetworkFromCachedState = {
  state: "from_cache";
  id: string
  response: NetworkSuccessState["response"]
}

type NetworkState2 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState

function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`)
}

function logger2(s: NetworkState2): string {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response"
    // case 'from_cache':
    //   return ''
    default:
      return assertNever(s)
  }
}

// Intersection Types
interface ErrorHandling {
  success: boolean
  error?: { message: string }
}

interface ArtwroksData {
  artworks: { title: string }[]
}

interface ArtistsData {
  artists: { name: string }[]
}

type ArtworksResponse = ArtwroksData & ErrorHandling
type ArtistsResponse = ArtistsData & ErrorHandling

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message)
    return
  }
  console.log(response.artists)
}
