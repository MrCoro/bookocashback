const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

//GET METHOD untuk mengambil menu item
const getMenu = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '.././menu.json'));
    const menu_item = JSON.parse(data);

    if (!menu_item) {
      const err = new Error('Menu Items not found');
      err.status = 404;
      throw err;
    } else {
        res.json(menu_item);
    }

  } catch (e) {
    next(e);
  }
};

router.route('/api/v1/menu_item').get(getMenu);

//POST METHOD untuk membuat menu item
const createMenuItem = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, '/.././menu.json'));
      const menu_item = JSON.parse(data);
      
      const newMenuItem = {
        menu_item_id: req.body.id,
        menu_item_name: req.body.name,
        menu_item_price: req.body.price,
        menu_item_promo: req.body.promo,
      };

      menu_item.push(newMenuItem);
      fs.writeFileSync(__dirname + '/.././menu.json', JSON.stringify(menu_item));
      res.status(201).json(newMenuItem);
    } catch (e) {
      next(e);
    }
  };
  
router.route('/api/v1/menu_item/create').post(createMenuItem);


//UPDATE Method untuk memodifikasi menu item yang sudah ada 
const updateMenuItem = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, '/.././menu.json'));
      const menu_item = JSON.parse(data);
      const findMenuItem = menu_item.find(item => item.menu_item_id === Number(req.params.id));
      
      //tentukan apakah item ada atau tidak
      if (!findMenuItem) {
        const err = new Error('Menu item not found');
        err.status = 404;
        throw err;
      }

      const updatedItemData = {
        menu_item_id: req.body.id,
        menu_item_name: req.body.name,
        menu_item_price: req.body.price,
        menu_item_promo: req.body.promo,
      };

      const newStats = menu_item.map(item => {
        if (item.menu_item_id === Number(req.params.id)) {
          return updatedItemData;
        } else {
          return item;
        }
      });

      fs.writeFileSync(__dirname + '/.././menu.json', JSON.stringify(newStats));
      res.status(200).json(updatedItemData);

    } catch (e) {
      next(e);
    }

  };

router.route('/api/v1/menu_item/:id').put(updateMenuItem);


//DELETE METHOD untuk menghapus item
const deleteMenuItem = async (req, res, next) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, '/.././menu.json'));
      const menu_item = JSON.parse(data);
      const findMenuItem = menu_item.find(item => item.menu_item_id === Number(req.params.id));

      if (!findMenuItem) {
        const err = new Error('Menu Item not found');
        err.status = 404;
        throw err;
      }
      
      const newStats = menu_item.map(item => {
        if (item.menu_item_id === Number(req.params.id)) {
          return null;
        } else {
          return item;
        }
      })
      .filter(item => item !== null);

      fs.writeFileSync(__dirname + '/.././menu.json', JSON.stringify(newStats));
      res.status(200).end();

    } catch (e) {
      next(e);
    }
  };

router.route('/api/v1/menu_item/:id').delete(deleteMenuItem);


module.exports = router;