import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const arrayObj = JSON.parse(info);
        return limit ? arrayObj.slice(0, limit) : arrayObj;
      } else {
        await fs.writeFile(this.path, "[]");
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts({});
      const codeRepeat = products.find((p) => p.code === product.code);

      if (codeRepeat) {
        console.log("El código ya existe");
        return;
      }
      let id;

      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      products.push({ id, ...product });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw error;
    }
  }

  async getProductById(idProd) {
    try {
      const prods = await this.getProducts({});
      console.log("prods", prods);
      const prod = prods.find((p) => p.id === idProd);
      return prod;
    } catch (error) {
      return error;
    }
  }
  async updateProduct(idProd, obj) {
    try {
      const prods = await this.getProducts({});
      const modifProd = prods.findIndex((p) => p.id === idProd);
      if (modifProd === -1) {
        return -1;
      }
      const prod = prods[modifProd];
      prods[modifProd] = { ...prod, ...obj };
      await fs.promises.writeFile(this.path, JSON.stringify(prods));
      return 1;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProd) {
    try {
      const prods = await this.getProducts({});
      const deletedProd = prods.find((p) => p.id === idProd);
      console.log(deletedProd);
      if (!deletedProd) {
        return -1;
      }
      const product = prods.filter((p) => p.id !== idProd);

      await fs.promises.writeFile(this.path, JSON.stringify(product));
      return 1;
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  title: "Titanic",
  description: "Starfield es el primer universo nuevo en más de 25 años de Bethesda Game Studios, los galardonados creadores de The Elder Scrolls V: Skyrim y Fallout 4. En este juego de rol de próxima generación ambientado entre las estrellas, podrás hacerte el personaje que desees y explorar con una libertad sin precedentes mientras te embarcas en un viaje épico para desentrañar el mayor misterio de la humanidad",
  price: 11000,
  category: "rpg",
  code: "ndj287",
  stock: "100",
};
const product2 = {
  title: "Atomic Heart",
  description: "Un mundo utópico, tan delirante como sublime",
  price: 9990,
  category:"fps",
  code: "ncue87",
  stock: "250",
};
const product3 = {
  title: "Ghostwire: Tokyo",
  description: "Una Tokio embrujada pero hermosa",
  price: 9999,
  code: "ghst23",
  category: "fps",
  stock: "70",
};
const product4 = {
  title: "Lies of P",
  description: "Lies of P es un soulslike trepidante que toma la conocida historia de Pinocho, le da la vuelta y la ubica en una belle époque elegante y oscura.",
  price: 2000,
  category: "rpg-soulslike",
   code: "nfdn73",
  stock: "15",
};

const product5 = {
  title: "Lords of the Fallen Deluxe Edition",
  description: "Un mundo inmenso te aguarda en este nuevo RPG de acción, ambientado en un universo de fantasía con tintes oscuros.",
  category: "rpg",
  price: 2000,
  code: "lvnif83",
  stock: "15",
};

// async function test() {
//   const manager = new ProductManager("products.json");

//   await manager.addProduct(product1);
//   await manager.addProduct(product2);
//   await manager.addProduct(product3);
//   await manager.addProduct(product4);
//   await manager.addProduct(product5);

//    const getid = await manager.getProductById(3);
//   console.log(getid);
//     const prods = await manager.getProducts();
//     console.log(prods);
// }
// test();

export default new ProductManager("products.json");
