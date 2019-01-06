export class Kot {
    constructor(huurprijs, waarborg, type, oppervlakte, verdieping, toilet, douche, keuken, meubels, straat, plaats, coordinates){
        this.huurprijs = huurprijs;
        this.waarborg = waarborg;
        this.type = type;
        this.oppervlakte = oppervlakte;
        this.verdieping = verdieping;
        this.toilet = toilet;
        this.douche = douche;
        this.keuken = keuken;
        this.meubels = meubels;
        this.straat = straat;
        this.plaats = plaats;
        this.adres = this.straat + ", " + this.plaats;
    }
}
class Gebruiker {
    constructor(firstName, lastName, address, email, phone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}
export class Kotbaas extends Gebruiker {

}
export class Student extends Gebruiker {
    constructor(firstName, lastName, address, email, phone, school){
        super(firstName, lastName, address, email, phone);
        this.school = school;
    }
}