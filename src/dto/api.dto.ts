export class APIDto<D> {
  data;

  constructor(data: D) {
    this.data = data;
  }
}
