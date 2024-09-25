export class Carta {
    image!:string;
    value!:string;
    suit!:string;

    constructor(img:string, value:string, suit: string){
        this.image = img;
        this.value = value;
        this.suit = suit;
    }

}
