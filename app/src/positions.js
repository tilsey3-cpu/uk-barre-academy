// Dancer positions for the practice library: Maggie Paterson in each position, as a reference while
// practising along to the videos. Titles follow Taylor's photo names (with the French accents restored);
// descriptions are short working notes for Maggie to check. Photos: public/media/barre-position-*.jpg.
export const POSITIONS = [
  { id: 'first-position', title: '1st position', sub: 'Arms and feet',
    text: 'Heels together, toes turned out to the sides. The arms are softly rounded in front of the body, fingertips close but not touching.' },
  { id: 'second-position', title: '2nd position', sub: 'Arms and feet',
    text: 'Feet apart, slightly wider than the hips, both turned out with the weight even. The arms open to the sides, long and gently curved, just below shoulder height.' },
  { id: 'third-position', title: '3rd position', sub: 'Arms and feet',
    text: 'The heel of the front foot sits against the middle of the back foot, both turned out. One arm is rounded in front of the body, the other open to the side.' },
  { id: 'fourth-position', title: '4th position', sub: 'Arms and feet',
    text: 'One foot in front of the other, a short step apart, both turned out. One arm is raised overhead in a soft curve, the other open to the side.' },
  { id: 'fifth-position', title: '5th position', sub: 'Arms and feet',
    text: 'The feet crossed and turned out, the front heel in line with the toes of the back foot. Both arms are raised overhead in a rounded oval that frames the face.' },
  { id: 'arabesque', title: 'Arabesque', sub: 'Arms and leg',
    text: 'Balanced on one leg, the other extends straight behind with the foot pointed. The arms reach long, one forward and one to the side, for one line from fingertips to toes.' },
  { id: 'demi-plie', title: 'Demi-plié', sub: 'Half bend',
    text: 'A half bend of the knees with the heels staying on the floor. The knees travel over the toes, the spine stays long and the pelvis neutral.' },
  { id: 'grand-plie', title: 'Grand plié', sub: 'Full bend',
    text: 'A full, deep bend of the knees. In 1st position the heels lift as the knees bend past the demi-plié, then lower first on the way up; in 2nd the heels stay down.' },
  { id: 'releve', title: 'Relevé', sub: 'Rise',
    text: 'A rise onto the balls of the feet with the legs straight and the ankles strong, lifting through the centre of the body. The barre is there for balance, not to lean on.' },
  { id: 'retire-passe', title: 'Retiré passé', sub: 'Foot to knee',
    text: 'The working foot is drawn up the standing leg until the toe meets the knee, the knee opening to the side. Retiré is the shape held; passé is the foot passing through it.' },
  { id: 'fondu', title: 'Fondu', sub: 'Melt',
    text: 'The standing leg bends softly while the working foot rests at the ankle of the standing leg, then both legs extend together. Smooth and controlled, never dropped.' },
  { id: 'grand-battement', title: 'Grand battement', sub: 'Big kick',
    text: 'A big, controlled throw of the straight leg from the hip, to the front, side or back, and a controlled return. The standing leg and the hips stay square and still.' },
  { id: 'high-curtsy', title: 'High curtsy', sub: 'Curtsy lunge',
    text: 'One leg steps diagonally behind the other and both knees bend, with the torso upright and the weight centred over the front foot. One arm reaches overhead.' },
  { id: 'low-curtsy', title: 'Low curtsy', sub: 'Deep curtsy',
    text: 'The curtsy taken deeper, the torso hinging forward from the hips over the front leg, the arms reaching in one long diagonal from the floor to the ceiling.' },
];

export const positionPhoto = (p) => `barre-position-${p.id}-maggie-paterson`;
