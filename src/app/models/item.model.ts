export class Item {
  constructor(
    public category_id: string,
    public cover: string,
    public description: string,
    public id: string,
    public name: string,
    public price: number,
    public rating: number,
    public status: boolean,
    public uid: string,
    public variation: boolean,
    public veg: boolean,
    public quantity?: number
  ) {
  }

}
