const  products = [
  {
    title:"Asus",
    price:3000
  },
  {
    title:"Acer",
    price:5000
  }
]
export const allList = (req, res) => {
  res.send(products);
};

export const productCat = (req, res) => {
  if (req.params.category === 'asus') {
    res.send(products[0]);
  } else if (req.params.category === 'acer') {
    res.send(products[1]);
  } else {
    res.send(products);
  }
  console.log(products);
  res.status(200).send('Products');
};
