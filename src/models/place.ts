import type { Place as PlaceType, State } from 'src/interfaces'

export class Place {
  private placeId: number
  private name: string
  private state: State

  constructor(place: PlaceType) {
    this.placeId = place.placeId
    this.name = place.name
    this.state = place.state
  }

  public get getPlaceId(): number {
    return this.placeId
  }

  public get getName(): string {
    return this.name
  }

  public get getState(): State {
    return this.state
  }

  public get formattedName(): string {
    return `${this.name}, ${this.state.shortname}`
  }
}
