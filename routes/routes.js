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
        menu_item_category: req.body.category,
        menu_item_price: req.body.price,
        menu_item_hpp: req.body.hpp,
        menu_item_available: req.body.available,
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
        menu_item_category: req.body.category,
        menu_item_price: req.body.price,
        menu_item_hpp: req.body.hpp,
        menu_item_available: req.body.available,
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

//GET Inventory
const getInventory = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '/.././inventory.json'));
    const inventory_item = JSON.parse(data);

    if (!inventory_item) {
      const err = new Error('Menu Items not found');
      err.status = 404;
      throw err;
    } else {
        res.json(inventory_item);
    }

  } catch (e) {
    next(e);
  }
};

router.route('/api/v1/inventory_item').get(getInventory);

//POST METHOD untuk membuat Inventory
const createInventoryItem = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '/.././inventory.json'));
    const inventory_item = JSON.parse(data);
    
    const newInventoryItem = {
      inventory_item_id: req.body.id,
      inventory_item_name: req.body.name,
      inventory_item_amount: req.body.amount,
      inventory_item_update: req.body.update,
      inventory_item_alert: (req.body.amount < 5) ,
    };

    inventory_item.push(newInventoryItem);
    fs.writeFileSync(__dirname + '/.././inventory.json', JSON.stringify(inventory_item));
    res.status(201).json(newInventoryItem);
  } catch (e) {
    next(e);
  }
};

router.route('/api/v1/inventory_item/create').post(createInventoryItem);


//UPDATE Method untuk memodifikasi Inventory item yang sudah ada 
const updateInventoryItem = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '/.././inventory.json'));
    const inventory_item = JSON.parse(data);
    const findInventoryItem = inventory_item.find(item => item.inventory_item_id === Number(req.params.id));
    
    //tentukan apakah item ada atau tidak
    if (!findInventoryItem) {
      const err = new Error('Inventory item not found');
      err.status = 404;
      throw err;
    }

    const updatedInventoryItem = {
      inventory_item_id: req.body.id,
      inventory_item_name: req.body.name,
      inventory_item_amount: req.body.amount,
      inventory_item_update: req.body.update,
      inventory_item_alert: (req.body.amount < 5) ,
    };

    const newStats = inventory_item.map(item => {
      if (item.inventory_item_id === Number(req.params.id)) {
        return updatedInventoryItem;
      } else {
        return item;
      }
    });

    fs.writeFileSync(__dirname + '/.././inventory.json', JSON.stringify(newStats));
    res.status(200).json(updatedInventoryItem);

  } catch (e) {
    next(e);
  }

};

router.route('/api/v1/inventory_item/:id').put(updateInventoryItem);


//DELETE METHOD untuk menghapus item
const deleteInventoryItem = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '/.././inventory.json'));
    const inventory_item = JSON.parse(data);
    const findInventoryItem = inventory_item.find(item => item.inventory_item_id === Number(req.params.id));

    if (!findInventoryItem) {
      const err = new Error('Menu Item not found');
      err.status = 404;
      throw err;
    }
    
    const newStats = inventory_item.map(item => {
      if (item.inventory_item_id === Number(req.params.id)) {
        return null;
      } else {
        return item;
      }
    })
    .filter(item => item !== null);

    fs.writeFileSync(__dirname + '/.././inventory.json', JSON.stringify(newStats));
    res.status(200).end();

  } catch (e) {
    next(e);
  }
};

router.route('/api/v1/inventory_item/:id').delete(deleteInventoryItem);

module.exports = router;