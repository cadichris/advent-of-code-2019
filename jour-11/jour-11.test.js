import { toMemory } from "../jour-05/jour-05.test";
import { inputJ11 } from "./input";
import { executer } from "../jour-05/jour-05";
import { BLANC, NOIR, Terrain } from "./jour-11";

describe("Jour 11", () => {
  it("manipute la grille", () => {
    const grille = Terrain();
    grille.peindre({ x: 0, y: 0 }, BLANC);

    expect(grille.get({ x: 0, y: 0 })).toBe(BLANC);
    expect(grille.peinture()).toBe(1);
  });

  it("trouve la solution", () => {
    const Robot = terrain => {
      return {
        position: { x: 0, y: 0, orientation: 0 },
        camera() {
          const codes = { [BLANC]: 1, [NOIR]: 0 };
          const couleurSurvolee = codes[terrain.get(this.position)];
          return { couleurSurvolee };
        },
        peindre(couleur) {
          terrain.peindre(this.position, couleur);
        },
        deplacer(angle) {
          this.position.orientation = (this.position.orientation + angle) % 360;
          const { orientation } = this.position;
          if (orientation === 0) this.position.y += 1;
          else if (orientation === 90) this.position.x += 1;
          else if (orientation === 180) this.position.y -= 1;
          else if (orientation === 270) this.position.x -= 1;
        }
      };
    };

    const ship = new Terrain();
    const nono = new Robot(ship);

    const inputCamera = {
      nextValue: () => nono.camera().couleurSurvolee
    };

    let rotationOuCouleur = 0;

    const robot = o => {
      const peindre = rotationOuCouleur === 0;
      if (peindre) {
        const pinceaux = { [1]: BLANC, [0]: NOIR };
        const couleur = pinceaux[o];
        nono.peindre(couleur);
        rotationOuCouleur = 1;
      } else {
        const angle = o === 0 ? 270 : 90;
        nono.deplacer(angle);
        rotationOuCouleur = 0;
      }
    };

    const programme = toMemory(inputJ11);
    executer(programme, { inputs: inputCamera, outputFn: robot });

    expect(ship.peinture()).toBe(1747);

    ship.afficher();
  });
});
