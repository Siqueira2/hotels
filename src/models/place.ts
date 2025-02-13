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
    return `${this.name}, ${this.state.name}`
  }

  public get formattedNameWithShortName(): string {
    const words = this.name.split(' ')
    let initials = ''

    if (words.length === 1) {
      initials = words[0]?.slice(0, 3).toUpperCase() || ''
    }

    if (words.length > 2) {
      const firstInitial = words[0]?.charAt(0).toUpperCase() || ''
      const lastInitial = words[words.length - 1]?.charAt(0).toUpperCase() || ''
      initials = `${firstInitial}${lastInitial}`
    }

    initials ||= words.map((word) => word?.charAt(0).toUpperCase() || '').join('')

    return `${this.name}, ${initials}`
  }
}
