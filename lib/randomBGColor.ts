export const getRandomBGColor = () => {
  const randomColor = [
    'bg-blue-300',
    'bg-green-300',
    'bg-red-300',
    'bg-purple-300',
    'bg-emerald-300',
  ];
  const index = Math.floor(Math.random() * randomColor.length);

  return randomColor[index];
};
