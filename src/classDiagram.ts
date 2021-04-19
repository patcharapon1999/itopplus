class Animal {
  private age: int;
  private gender: string;

  constructor(age: int, gender: string) {
    this.age = age;
    this.gender = gender;
  }

  protected isMammal(): void {
    console.log("is mammal");
  }
  protected mate(): void {
    console.log("is mate");
  }

  protected get age() {
    return this.age;
  }

  protected set age(ageNum: number) {
    if (ageNum > 0) {
      this.age = ageNum;
    }
  }

  protected get gender() {
    return this.age;
  }

  protected set gender(gd: string) {
    this.gender = gd;
  }
}

class Duck extends Animal {
  protected beakColor: string;

  constructor(beakColor: string) {
    super();
    this.beakColor = beakColor;
  }

  protected swim(): void {
    console.log("swim");
  }

  protected quack(): void {
    console.log("quack");
  }

  protected get beakColor() {
    return this.beakColor;
  }

  protected set beakColor(bc: string) {
    this.beakColor = bc;
  }
}

class Fish extends Animal {
  protected sizeInFeet: int;

  constructor(sizeInFeet: int) {
    super();
    this.sizeInFeet = sizeInFeet;
  }

  protected canEat(): void {
    console.log("can eat");
  }

  protected get sizeInFeet() {
    return this.sizeInFeet;
  }

  protected set sizeInFeet(sif: int) {
    this.sizeInFeet = sif;
  }
}

class Zebra extends Animal {
  protected is_wild: boolean;

  constructor(is_wild: boolean) {
    super();
    this.is_wild = is_wild;
  }

  protected run(): void {
    console.log("run");
  }

  protected get is_wild() {
    return this.is_wild;
  }

  protected set is_wild(iw: boolean) {
    this.is_wild = iw;
  }
}
