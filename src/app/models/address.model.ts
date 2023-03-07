export class Address {
  constructor(
    public id: string,
    public user_id: string,
    public title: string,
    public address: string,
    public city: string,
    public zip: string,
    public canton: string,
    public lat: number,
    public lng: number,
  ) {}
}
