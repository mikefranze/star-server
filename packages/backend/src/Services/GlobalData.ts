export default class GlobalData {

  mainUrl:string;

  constructor() {
    this.mainUrl = process.env.MAIN_URL || "https://bettervoting.com";
  }
}