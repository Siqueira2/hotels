export interface State {
  name: string
  shortname: string
}

export interface Place {
  state: State
  name: string
  placeId: number
}
